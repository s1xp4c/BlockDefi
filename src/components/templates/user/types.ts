type TUserData = {
  address: string;
  profileId: string;
  bio?: string;
  username?: string;
};

export interface IUserData {
  userData: TUserData;
}
