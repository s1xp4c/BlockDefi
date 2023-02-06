type Erc20Value =
  | {
      value: number | number;
      balance: number | number;
      decimals: number | number;
      token_address: string | null | undefined;
      token: {
        address: string;
        chain: string | number;
        name: string;
        symbol: string;
        logo?: string | null | undefined;
        logoHash?: string | null | undefined;
        thumbnail?: string | null | undefined;
      };
    }
  | {
      value: number | number;
      token?: undefined;
      balance: number | number;
      decimals: number | number;
      token_address: string | null | undefined;
    };
export interface IERC20Balances {
  balances?: Erc20Value[];
  error?: string;
}
