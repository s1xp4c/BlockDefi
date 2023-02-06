type TSwapperData = {
  address: string | string;
  provider: string | string;
  otherProp?: string | unknown;
};

export interface ISwapper {
  swapper: TSwapperData[];
}
