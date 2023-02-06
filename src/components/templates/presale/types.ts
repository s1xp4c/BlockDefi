type TPresaleData = {
  address: string | string;
  otherProp?: string | unknown;
};

export interface IPresale {
  presale: TPresaleData[];
}
