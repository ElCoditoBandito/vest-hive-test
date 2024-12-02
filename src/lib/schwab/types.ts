export interface SchwabConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
}

export interface SchwabToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface SchwabAccount {
  accountId: string;
  accountType: string;
  name: string;
  balance: number;
  currency: string;
}

export interface SchwabPosition {
  symbol: string;
  quantity: number;
  costBasis: number;
  marketValue: number;
  unrealizedGainLoss: number;
}

export interface SchwabOrder {
  orderId: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  orderType: 'market' | 'limit';
  limitPrice?: number;
  status: 'open' | 'filled' | 'cancelled';
  filledQuantity: number;
  filledPrice?: number;
  timestamp: string;
}