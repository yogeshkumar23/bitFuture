import * as Api from "src/api";
import * as Hooks from "src/app/hooks";

export const useCoinBalance = (coinId: string): UseCoinBalance.Return => {
  const { trigger } = Hooks.Main.useDataTrigger(coinId);
  const { data: CoinBalance, isFetching: loading } = Api.Server.useRequest(
    ["userCoinWallet", coinId, trigger],
    "getWallet",
    { coinId: coinId }
  );

  return {
    CoinBalance: {
      ...CoinBalance,
      userWallet: [
        ...new Map(
          CoinBalance?.userWallet?.map((item: UseCoinBalance.userWallet) => [
            item["typeId"],
            item,
          ])
        ).values(),
      ],
    },
    loading,
  };
};

export declare namespace UseCoinBalance {
  export interface Return {
    CoinBalance: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    coinData: coinData;
    userWallet: userWallet[];
  }
  export interface coinData {
    coinId: string;
    coinName: string;
    coin: string;
    coinLogo: string;
    current_price: number;
    last_price: number;
    commission: number;
    currency_id: string;
    active: number;
    created_At: string;
    updated_At: string;
  }
  export interface userWallet {
    walletId: number;
    uid: string;
    type: "COIN" | "AMOUNT";
    typeId: string;
    balance: number;
    active: number;
    freeze: number;
    walletAddress: string;
    network: string;
    additionalAddressInfo: string;
  }
}
