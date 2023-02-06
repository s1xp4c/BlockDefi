type TUserData = {
  address: string;
  signature: string;
  profileId: string;
  expirationTime: string;
  bio: string;
  username: string;
};

export interface IUserData {
  user: TUserData[];
}
