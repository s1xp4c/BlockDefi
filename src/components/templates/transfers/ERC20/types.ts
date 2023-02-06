type TTokenTransfer = {
  chain: string | number;
  address: string;
  blockNumber: string;
  toAddress: string;
  fromAddress: string;
  value: number;
  transactionHash: string;
  blockTimestamp: Date;
  blockHash: string;
};

export interface IERC20Transfers {
  transfers?: TTokenTransfer[];
}
