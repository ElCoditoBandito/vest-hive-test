import { SchwabConfig, SchwabToken, SchwabAccount, SchwabPosition, SchwabOrder } from './types';

export class SchwabClient {
  private config: SchwabConfig;
  private baseUrl: string;
  private token: SchwabToken | null;

  constructor(config: SchwabConfig) {
    this.config = config;
    this.baseUrl = process.env.SCHWAB_API_URL || 'https://api.schwab.com/v1';
    this.token = null;
  }

  private async refreshTokenIfNeeded(): Promise<void> {
    // Implement token refresh logic
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    await this.refreshTokenIfNeeded();

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token?.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Schwab API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getAccounts(): Promise<SchwabAccount[]> {
    return this.request<SchwabAccount[]>('/accounts');
  }

  async getPositions(accountId: string): Promise<SchwabPosition[]> {
    return this.request<SchwabPosition[]>(`/accounts/${accountId}/positions`);
  }

  async placeOrder(accountId: string, order: Partial<SchwabOrder>): Promise<SchwabOrder> {
    return this.request<SchwabOrder>(`/accounts/${accountId}/orders`, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async getOrders(accountId: string): Promise<SchwabOrder[]> {
    return this.request<SchwabOrder[]>(`/accounts/${accountId}/orders`);
  }

  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scope.join(' '),
    });

    return `${this.baseUrl}/oauth/authorize?${params.toString()}`;
  }

  async handleCallback(code: string): Promise<SchwabToken> {
    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const token = await response.json();
    this.token = token;
    return token;
  }
}