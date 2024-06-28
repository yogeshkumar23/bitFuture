import * as Api from "src/api";

export const useSpotTradesErrors = (): GetTradeError.Return => {
  const { data: trades, isFetching: loading } = Api.Server.useRequest(
    ["getAllTradeErrors"],
    "getAllTradeErrors"
  );
  return { trades, loading };
};

export declare namespace GetTradeError {
  export interface Return {
    trades: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    tradeErrors: allOrder[];
  }

  export interface allOrder {
    teoId: number;
    uid: string;
    orderType: number;
    amount: number;
    coin: string;
    coinPair: string;
    status: string;
    errorInfo: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    mainAsset: string;
    quoteAsset: string;
    baseAsset: string;
  }
}
