import * as Api from "src/api";

export const useCoin = (): UseCoin.Return => {
  const { data: coins, isFetching: loading } = Api.Server.useRequest(
    ["coins"],
    "getCoinsPosition"
  );
  return { coins, loading };
};

export declare namespace UseCoin {
  export interface Return {
    coins: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    coinList: coin[];
  }
  export interface coin {
    id: string;
    coinId: string;
    coinName: string;
    coin: string;
    coinLogo: string;
    current_price: number;
    last_price: number;
    commission: number;
    currency_id: number;
    active: 0 | 1;
    created_At: string;
    updated_At: string;
    currencyId: number;
    currency_symbol: string;
    currency: string;
    currency_name: string;
    price24hChange: string;
    fund_limit: number;
    coin_value: number;
    bot_status: "binance" | "kucoin" | "off";
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
    p2p_active: 0 | 1;
    is_p2pTrade: 0 | 1;
  }
}
