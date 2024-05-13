import * as Api from "src/api";

export const useP2PCoinList = (): UseCoinList.Return => {
  const { data: p2pcoinpair, isFetching: loading } = Api.Server.useRequest(
    ["p2pcoinList"],
    "getP2Pcoins"
  );
  return { p2pcoinpair, loading };
};

export declare namespace UseCoinList {
  export interface Return {
    p2pcoinpair: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    coinList: coinsList[];
  }
  export interface coinsList {
    coin: string;
    coinLogo: string;
    coinName: string;
    currency_id: string;
    p2p_transactionFee: number;
    p2p_markPrice: number;
    p2p_active: number;
  }
}
