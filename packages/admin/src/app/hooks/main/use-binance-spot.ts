import React from "react";
import * as Router from "react-router-dom";
import useWebSocket from "react-use-websocket";
import * as Api from "src/api";
import * as Constants from "src/constants";

export const useBinanceSpot = () => {
  const [recentTrade, setRecentTrade] = React.useState<BinanceResponse.trade[]>(
    []
  );
  const [orderBook, setOrderBook] = React.useState<BinanceResponse.orderBook>();
  const { coinId } = Router.useParams();
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    Constants.API_CONFIG.binanceSocketURL
  ) as any;

  const getRecentTrade = () => {
    Api.Server.Client.get(
      `${Constants.API_CONFIG.binanceAPI}/trades?symbol=${coinId?.replace(
        "_",
        ""
      )}&limit=14`
    ).then((res) => setRecentTrade(res.data));
  };

  const getOrderBook = () => {
    Api.Server.Client.get(
      `${Constants.API_CONFIG.binanceAPI}/depth?symbol=${coinId?.replace(
        "_",
        ""
      )}&limit=7`
    ).then((res) => setOrderBook(res.data));
  };

  // Coin Socket data
  React.useEffect(() => {
    sendJsonMessage({
      method: "SUBSCRIBE",
      params: [`${coinId?.replace("_", "")?.toLowerCase()}@ticker`] as any,
      id: 1,
    });
    return () => {
      sendJsonMessage({
        method: "UNSUBSCRIBE",
        params: [`${coinId?.replace("_", "")?.toLowerCase()}@ticker`] as any,
        id: 1,
      });
    };
  }, [coinId]);

  React.useEffect(() => {
    getRecentTrade();
    getOrderBook();
  }, [lastJsonMessage?.data?.c?.toString()]);

  return {
    coinInfo: {
      current_price: lastJsonMessage?.data?.c,
      price24hChange: lastJsonMessage?.data?.P,
      price24hHigh: lastJsonMessage?.data?.h,
      price24hLow: lastJsonMessage?.data?.l,
      volumeCoin: lastJsonMessage?.data?.v,
      volumeAmount: lastJsonMessage?.data?.v * lastJsonMessage?.data?.c,
    },
    recentTrade,
    orderBook,
  };
};

export const useBinanceTradeChart = (
  coinId: string,
  range: number,
  botStatus: "binance" | "kucoin" | "off"
) => {
  const [data, setData] = React.useState<number[][]>();

  React.useEffect(() => {
    range && setData(undefined);
  }, [coinId, range]);

  React.useLayoutEffect(() => {
    const interval =
      botStatus === "kucoin"
        ? {
            86400000: "30min",
            2592000000: "12hour",
            7776000000: "1day",
            15552000000: "1day",
            31104000000: "1week",
            93312000000: "1week",
          }[range]
        : {
            86400000: "30m",
            2592000000: "12h",
            7776000000: "1d",
            15552000000: "3d",
            31104000000: "1w",
            93312000000: "1M",
          }[range];
    if (botStatus === "binance") {
      Api.Server.Client.get(
        `${Constants.API_CONFIG.binanceAPI}/klines?symbol=${coinId.replace(
          "/",
          ""
        )}&interval=${interval}&startTime=${
          new Date().getTime() - range
        }&endTime=${new Date().getTime()}`
      ).then((res) => {
        setData(res?.data?.map((candle: number[]) => candle.slice(0, 5)));
      });
    } else if (botStatus === "kucoin") {
      Api.Server.Request("getJamesBond", {
        type: "GET",
        url: `${
          Constants.API_CONFIG.kucoinAPI
        }/market/candles?type=${interval}&symbol=${coinId.replace(
          "/",
          "-"
        )}&startAt=${Math.floor(
          (new Date().getTime() - range) / 1000
        )}&endAt=${Math.floor(new Date().getTime() / 1000)}`,
      }).then((res) => {
        setData(
          res?.data?.map((candle: number[]) => {
            const _arr = candle.slice(0, 5);
            return [_arr[0] * 1000, _arr[1], _arr[3], _arr[4], _arr[2]];
          })
        );
      });
    } else {
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
          ...(res.coinChart as ownCoinChart[])
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
    }
  }, [coinId, range]);

  const yMin = +(data && data.length > 1
    ? data.map((a) => a[4]).reduce((a, b) => (a < b ? a : b))
    : 0);
  const yMax = +(data && data.length > 1
    ? data.map((a) => a[3]).reduce((a, b) => (a > b ? a : b))
    : 0);

  return { data, loading: data === undefined, yMax, yMin };
};

export declare namespace BinanceResponse {
  export interface trade {
    id: number;
    price: number;
    qty: number;
    quoteQty: number;
    time: number;
    isBuyerMaker: boolean;
    isBestMatch: boolean;
  }

  export interface orderBook {
    asks: number[][];
    bids: number[][];
  }
}

export interface ownCoinChart {
  coinId: string;
  createdTime: number;
  open: number;
  close: number;
  high: number;
  low: number;
}
