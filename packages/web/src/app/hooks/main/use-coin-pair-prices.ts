import React from "react";
import * as Api from "src/api";
import * as Constants from "src/constants";

export const useCoinPairPrices = (): UseCoinBalance.Return => {
  const nativeCurrency = "USD";
  const mainCurrency = "USDT";
  const [nativePrice, setNativePrice] = React.useState(1);
  const { data: prices, isFetching: loading } = Api.Server.useRequest(
    ["getJamesBond"],
    "getJamesBond",
    {
      type: "GET",
      url: `${Constants.API_CONFIG.gateAPI}/spot/tickers`,
    }
  );

  React.useEffect(() => {
    if (prices)
      setNativePrice(
        prices?.find(
          ({ currency_pair }: any) =>
            currency_pair === `USDT_${nativeCurrency}`.toUpperCase()
        )?.last || 1
      );
  }, [loading]);

  return {
    prices: prices || [],
    nativeCurrency,
    mainCurrency,
    nativePrice,
    loading: loading || !prices.length,
  };
};

export declare namespace UseCoinBalance {
  export interface Return {
    prices: { currency_pair: string; last: number }[];
    nativeCurrency: string;
    mainCurrency: string;
    nativePrice: number;
    loading: boolean;
  }
}
