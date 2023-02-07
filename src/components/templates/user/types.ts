type TUserData = {
  address: string;
  profileId: string;
  bio?: string;
  username?: string;
  email?: string;
  phone?: string;
};

export interface IUserData {
  userData: TUserData;
}
