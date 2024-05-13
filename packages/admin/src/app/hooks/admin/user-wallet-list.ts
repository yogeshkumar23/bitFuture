import * as Api from "src/api";

export const useUserWalletList = (): UseWalletList.Return => {
  const { data: listWallet, isFetching: loading } = Api.Server.useRequest(
    ["walletList"],
    "getUserWallet",
    { uid: "all" }
  );
  return { listWallet, loading };
};

export declare namespace UseWalletList {
  export interface Return {
    listWallet: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    walletList?: userWalletList[];
    coinBaseWallets?: coinBaseWallets[];
    binanceWallets?: binanceWallets[];
    kucoinWallets?: kucoinWallets[];
  }
  export interface userWalletList {
    walletId: string;
    uid: string;
    type: "COIN" | "AMOUNT";
    typeId: string;
    balance: number;
    active: number;
    freeze: number;
  }
  export interface coinBaseWallets {
    id: string;
    name: string;
    balance: number;
    coin: string;
    nativeBalance: number;
    nativeCurrency: string;
  }
  export interface binanceWallets {
    coin: string;
    available: number;
    onOrder: number;
  }

  export interface kucoinWallets {
    currency: string;
    type: string;
    balance: number;
    available: number;
    holds: number;
  }
}
