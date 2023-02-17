type TUserData = {
  address: string;
  profileId: string;
  username?: string;
};

export interface IUserData {
  userData: TUserData;
}

type TUniData = {
  UNI_SEC_TOKEN: string;
  UNI_TOKEN_LIST: string;
  UNI_NATIVE: string;
  UNI_FEE_ADDRESS: string;
  UNI_FEE: number;
};

export interface ISwapData {
  uniData: TUniData;
  userData: TUserData;
}
