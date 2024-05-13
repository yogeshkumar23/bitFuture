import React from "react";
import * as Api from "src/api";
import * as Contexts from "src/app/contexts";

export const useCoinValues = (coinId: string): UseCoinValues.Return => {
  const { trigger } = React.useContext(Contexts.UserContext);
  const { data: CoinDetail, isFetching: loading } = Api.Server.useRequest(
    ["trade24hValues", coinId, trigger],
    "trade24hValues",
    {
      coinId,
      time: new Date().getTime(),
    }
  );
  return { CoinDetail, loading };
};

export declare namespace UseCoinValues {
  export interface Return {
    CoinDetail: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    coinChart: coinChart;
  }
  export interface coinChart {
    "24HourChange": string;
    "24HourHigh": number;
    "24HourLow": number;
    "24HourCoinVolume": number;
    "24HourCurrencyVolume": number;
  }
}
