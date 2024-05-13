import * as Router from "react-router-dom";
import * as Api from "src/api";

export const useCoinBalance = (
  _coinId: string,
  trigger: string
): UseCoinBalance.Return => {
  const { coinId } = Router.useParams();
  const { data: CoinBalance, isFetching: loading } = Api.Server.useRequest(
    [
      "userCoinWallet",
      localStorage.getItem("accessToken") || "",
      _coinId,
      coinId || "",
      trigger,
    ],
    "getWallet",
    { coinId: _coinId }
  );

  return {
    CoinBalance,
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
