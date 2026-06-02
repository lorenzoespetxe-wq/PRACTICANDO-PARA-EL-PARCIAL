export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface JwtPayload {
  sub: string;
  rol: string;
  exp: number;
}