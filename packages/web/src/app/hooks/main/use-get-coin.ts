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
    price24hChange: number;
    price24hChangePercentage: string;
    price24hHigh?: number;
    price24hLow?: number;
    volumeCoin?: number;
    volumeAmount?: number;
    minimum_price: number;
    maximum_price: number;
    fund_limit: number;
    coin_value: number;
    seller_fees: number;
    bot_status: "binance" | "kucoin" | "off"| "bybit";
    // bot_status: "binance" | "kucoin" | "off";
    market_up: number;
    buyer_fees: number;
    minimum_quantity: number;
    currency_value: number;
    maximum_quantity: number;
  }
}
