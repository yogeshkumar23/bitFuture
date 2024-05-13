import React from "react";
import * as Api from "src/api";
import * as Constants from "src/constants";

export const useCoinPrice = (coinName: string, currency: string) => {
  const [coinPriceDetail, setCoinPriceDetail] =
    React.useState<Pick<UseCoinPrice.Response, "coin">>();
  React.useEffect(() => {
    Api.Server.Client.get(
      `${
        Constants.API_CONFIG.publicCoin
      }/coins/${coinName.toLowerCase()}?currency=${currency}`
    ).then((res) => {
      setCoinPriceDetail(res.data);
    });
  }, [coinName, currency]);
  return { coinPriceDetail: coinPriceDetail?.coin };
};

export declare namespace UseCoinPrice {
  export interface Response {
    coin: coin;
  }
  export interface coin {
    id: string;
    icon: string;
    name: string;
    symbol: string;
    rank: number;
    price: number;
    priceBtc: number;
    volume: number;
    marketCap: number;
    availableSupply: number;
    totalSupply: number;
    priceChange1h: number;
    priceChange1d: number;
    priceChange1w: number;
  }
}
