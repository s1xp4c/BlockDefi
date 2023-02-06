type TVotingData = {
  address: string | string;
  otherProp?: string | unknown;
};

export interface IVoting {
  voting: TVotingData[];
}
