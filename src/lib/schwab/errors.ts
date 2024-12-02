export class SchwabError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'SchwabError';
  }
}

export class SchwabAuthError extends SchwabError {
  constructor(message: string) {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'SchwabAuthError';
  }
}

export class SchwabRateLimitError extends SchwabError {
  constructor(message: string) {
    super(message, 'RATE_LIMIT', 429);
    this.name = 'SchwabRateLimitError';
  }
}

export class SchwabApiError extends SchwabError {
  constructor(message: string, status: number) {
    super(message, 'API_ERROR', status);
    this.name = 'SchwabApiError';
  }
}

export function handleSchwabError(error: unknown): never {
  if (error instanceof SchwabError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new SchwabApiError(error.message, 500);
  }

  throw new SchwabApiError('Unknown error occurred', 500);
}