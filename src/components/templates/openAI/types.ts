type TUserData = {
  address: string | string;
  otherProp?: string | unknown;
};

export interface IUser {
  useraddress: TUserData[];
}
