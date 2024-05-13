import React from "react";
import * as Api from "src/api";
import * as Contexts from "src/app/contexts";

export const useTradeChart = (coinId: string, range: number) => {
  const [data, setData] = React.useState<number[][]>([]);
  const { trigger } = React.useContext(Contexts.UserContext);

  React.useEffect(() => {
    range && setData([]);
  }, [coinId, range]);

  // Collect data by pagination
  React.useLayoutEffect(() => {
    range &&
      Api.Server.Request("tradeChart", {
        coinId,
        pageNo: 1,
        limit: range / (60 * 1000),
        type: 2592000000 >= range ? "hh" : "d",
        typeLimit: range / (60 * 1000),
        typeLimitFrom: new Date().getTime() - range,
        sort: "ASEC",
      }).then((res) => {
        setData([
          ...(res.coinChart as UseTradeChart.coinChart[])
            ?.map((candle) => Object.values(candle).slice(1, -1))
            ?.filter((_, index) =>
              2592000000 <= range
                ? !Boolean(
                    index %
                      ({
                        2592000000: 24,
                        7776000000: 2,
                        15552000000: 5,
                        31104000000: 7,
                        62208000000: 10,
                      }[range] || 0)
                  )
                : true
            ),
        ]);
      });
  }, [coinId, range, trigger]);

  const yMin =
    data.length > 1
      ? data.map((a) => a[4]).reduce((a, b) => (a < b ? a : b))
      : 0;
  const yMax =
    data.length > 1
      ? data.map((a) => a[3]).reduce((a, b) => (a > b ? a : b))
      : 0;

  return { data, loading: !Boolean(data.length), yMax, yMin };
};

export declare namespace UseTradeChart {
  export interface coinChart {
    coinId: string;
    createdTime: number;
    open: number;
    close: number;
    high: number;
    low: number;
  }
}
