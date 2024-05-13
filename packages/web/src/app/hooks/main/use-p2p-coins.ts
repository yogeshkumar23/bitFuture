import * as Api from "src/api";

export const useP2PCoinList = (): UseP2PCoinList.Return => {
  const { data: p2pcoinpair, isFetching: loading } = Api.Server.useRequest(
    ["p2pcoinList"],
    "getP2Pcoins"
  );
  return { p2pcoinpair, loading };
};

export declare namespace UseP2PCoinList {
  export interface Return {
    p2pcoinpair: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    coinPairList: coinsList[];
  }
  export interface coinsList {
    coinId: string;
    coinName: string;
    coin: string;
    coinLogo: string;
    current_price: number;
    last_price: number;
    commission: number;
    fund_limit: number;
    currency_id: string;
    active: 0 | 1;
    created_At: string;
    updated_At: string;
    coin_value: number;
    bot_status: string;
    buyer_fees: number;
    seller_fees: number;
    minimum_price: number;
    maximum_price: number;
    minimum_quantity: number;
    maximum_quantity: number;
    market_up: number;
    currency_value: number;
    p2p_transactionFee: number;
    p2p_markPrice: number;
    p2p_active: number;
    is_p2pTrade: number;
  }
}
