export interface ICredentials {
  token: string
  user: User
}

export interface User {
  id: string
  email: string
  type: 'user'
}

export interface GetTokenBalanceRes {
  tokens: TokenBalance[]
  totalBalanceUsd: string
}

interface Token {
  name: string
  decimals: number
  thumbnail: string
  price: string
  symbol: string
  type: string
}

export interface TokenBalance {
  contractAddress: string
  balance: string
  balanceUsd: string
  balanceRawInteger: string
  token: Token
}

export interface CurrencyDetail {
  blockchain: string;
  address?: string;
  name: string;
  decimals: number;
  symbol: string;
  thumbnail: string;
}

export interface DisplayTokenData {
  thumbnail?: string
  value: string
  symbol: string
}
