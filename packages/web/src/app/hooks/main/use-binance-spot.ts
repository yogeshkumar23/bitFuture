// import * as FirebaseFirestore from "firebase/firestore";
// import React from "react";
// import * as Router from "react-router-dom";
// import useWebSocket, { ReadyState } from "react-use-websocket";
// import * as Api from "src/api";
// import * as Constants from "src/constants";
// import * as Hooks from "src/app/hooks";

// export const useBinanceSpot = (
//   coinList: Hooks.Main.UseCoin.coin[],
//   prices: {
//     currency_pair: string;
//     last: number;
//   }[]
// ) => {
//   const { coinId } = Router.useParams();
//   const [socketURL, setSocketURL] = React.useState("");
//   const [coinInfo, setCoinInfo] = React.useState<Record<string, any>>();
//   const filteredCoins = coinList
//     ? coinList.filter(({ active }) => Boolean(active))
//     : [];
//   const coin = coinList.find(
//     (coinDetail) => coinId === coinDetail.coinId.replace("/", "_")
//   );

//   const [recentTrade, setRecentTrade] = React.useState<BinanceResponse.trade[]>(
//     []
//   );
//   const [orderBook, setOrderBook] = React.useState<BinanceResponse.orderBook>();
//   const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
//     socketURL
//   ) as any;

//   // Binance bot
//   const getRecentTrade = React.useCallback(() => {
//     Api.Server.Client.get(
//       `${Constants.API_CONFIG.binanceAPI}/trades?symbol=${coinId?.replace(
//         "_",
//         ""
//       )}&limit=14`
//     ).then((res) => setRecentTrade(res.data));
//   }, [lastJsonMessage?.data?.c?.toString()]);

//   const getOrderBook = React.useCallback(() => {
//     Api.Server.Client.get(
//       `${Constants.API_CONFIG.binanceAPI}/depth?symbol=${coinId?.replace(
//         "_",
//         ""
//       )}&limit=7`
//     ).then((res) => setOrderBook(res.data));
//   }, [lastJsonMessage?.data?.c?.toString()]);

//   // Kucoin bot
//   const getRecentTradeKucoin = React.useCallback(() => {
//     Api.Server.Request("getJamesBond", {
//       type: "GET",
//       url: `${
//         Constants.API_CONFIG.kucoinAPI
//       }/market/histories?symbol=${coinId?.replace("_", "-")}&limit=14`,
//     }).then((res) => setRecentTrade(res.data));
//   }, [lastJsonMessage?.data?.data?.lastTradedPrice?.toString()]);

//   const getOrderBookKucoin = React.useCallback(() => {
//     Api.Server.Request("getJamesBond", {
//       type: "GET",
//       url: `${
//         Constants.API_CONFIG.kucoinAPI
//       }/market/orderbook/level2_20?symbol=${coinId?.replace("_", "-")}&limit=7`,
//     }).then((res) => setOrderBook(res.data));
//   }, [lastJsonMessage?.data?.data?.lastTradedPrice?.toString()]);

//   // Coin Socket data
//   React.useEffect(() => {
//     if (coin?.bot_status === "binance") {
//       setSocketURL(Constants.API_CONFIG.binanceSocketURL);
//     } else if (!socketURL.includes(Constants.API_CONFIG.kucoinSocketURL)) {
//       Api.Server.Request("getJamesBond", {
//         type: "POST",
//         url: `${Constants.API_CONFIG.kucoinAPI}/bullet-public`,
//       }).then((res) =>
//         setSocketURL(Constants.API_CONFIG.kucoinSocketURL + res.data.token)
//       );
//     }
//     if (
//       coin?.bot_status === "binance" &&
//       socketURL === Constants.API_CONFIG.binanceSocketURL
//     ) {
//       sendJsonMessage({
//         method: "SUBSCRIBE",
//         params: [`${coinId?.replace("_", "")?.toLowerCase()}@ticker`],
//         id: 1,
//       });
//       return () => {
//         sendJsonMessage({
//           method: "UNSUBSCRIBE",
//           params: [`${coinId?.replace("_", "")?.toLowerCase()}@ticker`],
//           id: 1,
//         });
//         setRecentTrade([]);
//         setOrderBook(undefined);
//       };
//     } else if (
//       coin?.bot_status === "kucoin" &&
//       socketURL.includes(Constants.API_CONFIG.kucoinSocketURL)
//     ) {
//       sendJsonMessage({
//         id: new Date().getTime(),
//         type: "subscribe",
//         topic: `/market/snapshot:${coinId?.replace("_", "-")}`,
//         privateChannel: false,
//         response: true,
//       });
//       return () => {
//         sendJsonMessage({
//           id: new Date().getTime(),
//           type: "unsubscribe",
//           topic: `/market/snapshot:${coinId?.replace("_", "-")}`,
//           privateChannel: false,
//           response: true,
//         });
//       };
//     }
//   }, [coinId, coin?.bot_status, socketURL]);

//   React.useEffect(() => {
//     if (coin?.bot_status === "binance") {
//       getRecentTrade();
//       getOrderBook();
//     } else if (coin?.bot_status === "kucoin") {
//       getRecentTradeKucoin();
//       getOrderBookKucoin();
//     }
//     setCoinInfo(
//       prices?.find(
//         ({ currency_pair }: any) => currency_pair === coinId?.toUpperCase()
//       ) || { notFound: true }
//     );
//   }, [
//     lastJsonMessage?.data?.c?.toString(),
//     lastJsonMessage?.data?.data?.lastTradedPrice?.toString(),
//   ]);

//   React.useEffect(() => {
//     if (readyState === ReadyState.CLOSED) setSocketURL("");
//   }, [readyState]);

//   React.useEffect(() => {
//     return () => {
//       setRecentTrade([]);
//       setOrderBook(undefined);
//       setCoinInfo(undefined);
//     };
//   }, [coinId]);

//   // offline bot
//   const { CoinDetail } = Hooks.Main.useCoinValues(coinId as string);

//   const { data: recent_trades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
//     "collection",
//     `coins/${coinId}/trade_book`
//   ).collectionSnapshot(
//     [
//       FirebaseFirestore.where("status", "in", [
//         "pending",
//         "partiallyCompleted",
//         "completed",
//       ]),
//       FirebaseFirestore.orderBy("orderPlacedTime", "desc"),
//       FirebaseFirestore.limit(15),
//     ],
//     coin?.bot_status !== "off"
//   );

//   const { data: buyTrades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
//     "collection",
//     `coins/${coinId}/trade_book`
//   ).collectionSnapshot(
//     [
//       FirebaseFirestore.where("status", "in", ["completed"]),
//       FirebaseFirestore.orderBy("orderType", "desc"),
//       FirebaseFirestore.where("orderType", "<=", 3),
//       FirebaseFirestore.limit(7),
//     ],
//     coin?.bot_status !== "off"
//   );
//   const { data: sellTrades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
//     "collection",
//     `coins/${coinId}/trade_book`
//   ).collectionSnapshot(
//     [
//       FirebaseFirestore.where("status", "in", ["completed"]),
//       FirebaseFirestore.orderBy("orderType", "desc"),
//       FirebaseFirestore.where("orderType", ">=", 4),
//       FirebaseFirestore.limit(7),
//     ],
//     coin?.bot_status !== "off"
//   );

//   return {
//     binance: {
//       coin,
//       filteredCoins,
//       coinInfo: {
//         current_price: lastJsonMessage?.data?.c as number,
//         price24hChange: lastJsonMessage?.data?.P,
//         price24hHigh: lastJsonMessage?.data?.h,
//         price24hLow: lastJsonMessage?.data?.l,
//         volumeCoin: lastJsonMessage?.data?.v,
//         volumeAmount: lastJsonMessage?.data?.v * lastJsonMessage?.data?.c,
//       },
//       recentTrade,
//       orderBook,
//       coinId,
//     },
//     off: {
//       coin,
//       filteredCoins,
//       coinInfo: {
//         notFound: coinInfo?.["notFound"],
//         current_price: coin?.current_price as number,
//         price24hChange: +CoinDetail?.coinChart?.["24HourChange"]?.replace(
//           "%",
//           ""
//         ),
//         price24hHigh: CoinDetail?.coinChart?.["24HourHigh"],
//         price24hLow: CoinDetail?.coinChart?.["24HourLow"],
//         volumeCoin: CoinDetail?.coinChart?.["24HourCoinVolume"],
//         volumeAmount: CoinDetail?.coinChart?.["24HourCurrencyVolume"],
//       },
//       recentTrade: recent_trades?.map((trade) => ({
//         id: trade.tradeId,
//         price: trade.orderAmount,
//         qty: trade.noOfCoins,
//         quoteQty: trade.noOfCoins,
//         time: trade.orderPlacedTime,
//         isBuyerMaker: Constants.ORDERTYPE[trade.orderType - 1].includes("Buy"),
//         isBestMatch: false,
//       })),
//       orderBook:
//         buyTrades && sellTrades
//           ? {
//               asks: [...buyTrades]
//                 ?.sort((a, b) => a.orderPlacedTime - b.orderPlacedTime)
//                 ?.map((trade) => [
//                   trade.orderAmount / trade.noOfCoins,
//                   trade.noOfCoins,
//                   trade.orderAmount,
//                 ]),
//               bids: [...sellTrades]
//                 ?.sort((a, b) => b.orderPlacedTime - a.orderPlacedTime)
//                 ?.map((trade) => [
//                   trade.orderAmount / trade.noOfCoins,
//                   trade.noOfCoins,
//                   trade.orderAmount,
//                 ]),
//             }
//           : undefined,
//       coinId,
//     },
//     kucoin: {
//       coin,
//       filteredCoins,
//       coinInfo: {
//         notFound: coinInfo?.["notFound"],
//         current_price:
//           (lastJsonMessage?.data?.data?.lastTradedPrice as number) ||
//           (coinInfo?.["last"] as number),
//         price24hChange:
//           lastJsonMessage?.data?.data?.changeRate ||
//           +coinInfo?.["change_percentage"],
//         price24hHigh:
//           lastJsonMessage?.data?.data?.high || coinInfo?.["high_24h"],
//         price24hLow: lastJsonMessage?.data?.data?.low || coinInfo?.["low_24h"],
//         volumeCoin:
//           lastJsonMessage?.data?.data?.vol || coinInfo?.["base_volume"],
//         volumeAmount:
//           lastJsonMessage?.data?.data?.volValue || coinInfo?.["quote_volume"],
//       },
//       recentTrade: recentTrade?.slice(0, 14)?.map((trade: any) => ({
//         id: trade.sequence,
//         price: trade.price,
//         qty: trade.size,
//         quoteQty: trade.size,
//         time: trade.time / 1000,
//         isBuyerMaker: trade?.side === "buy",
//         isBestMatch: false,
//       })),
//       orderBook,
//       coinId,
//     },
//   }[coin?.bot_status || "off"];
// };

// export const useBinanceTradeChart = (
//   coinId: string,
//   range: number,
//   botStatus: "binance" | "kucoin" | "off"
// ) => {
//   const [data, setData] = React.useState<number[][]>();

//   React.useEffect(() => {
//     range && setData(undefined);
//   }, [coinId, range]);

//   React.useLayoutEffect(() => {
//     const interval =
//       botStatus === "kucoin"
//         ? {
//             86400000: "30min",
//             2592000000: "12hour",
//             7776000000: "1day",
//             15552000000: "1day",
//             31104000000: "1week",
//             93312000000: "1week",
//           }[range]
//         : {
//             86400000: "30m",
//             2592000000: "12h",
//             7776000000: "1d",
//             15552000000: "3d",
//             31104000000: "1w",
//             93312000000: "1M",
//           }[range];
//     if (botStatus === "binance") {
//       Api.Server.Client.get(
//         `${Constants.API_CONFIG.binanceAPI}/klines?symbol=${coinId.replace(
//           "/",
//           ""
//         )}&interval=${interval}&startTime=${
//           new Date().getTime() - range
//         }&endTime=${new Date().getTime()}`
//       ).then((res) => {
//         setData(res?.data?.map((candle: number[]) => candle.slice(0, 5)));
//       });
//     } else if (botStatus === "kucoin") {
//       Api.Server.Request("getJamesBond", {
//         type: "GET",
//         url: `${
//           Constants.API_CONFIG.kucoinAPI
//         }/market/candles?type=${interval}&symbol=${coinId.replace(
//           "/",
//           "-"
//         )}&startAt=${Math.floor(
//           (new Date().getTime() - range) / 1000
//         )}&endAt=${Math.floor(new Date().getTime() / 1000)}`,
//       }).then((res) => {
//         setData(
//           res?.data?.map((candle: number[]) => {
//             const _arr = candle.slice(0, 5);
//             return [_arr[0] * 1000, _arr[1], _arr[3], _arr[4], _arr[2]];
//           })
//         );
//       });
//     } else {
//       Api.Server.Request("tradeChart", {
//         coinId,
//         pageNo: 1,
//         limit: range / (60 * 1000),
//         type: 2592000000 >= range ? "hh" : "d",
//         typeLimit: range / (60 * 1000),
//         typeLimitFrom: new Date().getTime() - range,
//         sort: "ASEC",
//       }).then((res) => {
//         setData([
//           ...(res.coinChart as ownCoinChart[])
//             ?.map((candle) => Object.values(candle).slice(1, -1))
//             ?.filter((_, index) =>
//               2592000000 <= range
//                 ? !Boolean(
//                     index %
//                       ({
//                         2592000000: 24,
//                         7776000000: 2,
//                         15552000000: 5,
//                         31104000000: 7,
//                         62208000000: 10,
//                       }[range] || 0)
//                   )
//                 : true
//             ),
//         ]);
//       });
//     }
//   }, [coinId, range]);

//   const yMin = +(data && data.length > 1
//     ? data.map((a) => a[4]).reduce((a, b) => (a < b ? a : b))
//     : 0);
//   const yMax = +(data && data.length > 1
//     ? data.map((a) => a[3]).reduce((a, b) => (a > b ? a : b))
//     : 0);

//   return { data, loading: data === undefined, yMax, yMin };
// };

// export declare namespace BinanceResponse {
//   export interface trade {
//     id: string;
//     price: number;
//     qty: number;
//     quoteQty: number;
//     time: number;
//     isBuyerMaker: boolean;
//     isBestMatch: boolean;
//   }

//   export interface orderBook {
//     asks: number[][];
//     bids: number[][];
//   }
// }

// export interface ownCoinChart {
//   coinId: string;
//   createdTime: number;
//   open: number;
//   close: number;
//   high: number;
//   low: number;
// }

// export declare namespace GetTrade {
//   export interface Return {
//     tradesData: Response;
//     loading: boolean;
//   }
//   export interface Response {
//     error: boolean;
//     message: string;
//     errorCode: string;
//     recentTradeList: allOrder[];
//   }

//   export interface allOrder {
//     tradeId: string;
//     orderId: string;
//     uid: string;
//     coin: string;
//     status: string;
//     filledPrice: number;
//     amount: number;
//     noOfCoins: number;
//     walletAddress: string;
//     orderTypeId: number;
//     commission: number;
//     commissionAsset: string;
//     feePercent: number;
//     fee: number;
//     orderFilled: string;
//     coveringTrade: 0 | 1;
//     limitPrice: number;
//     stopPrice: number;
//     transactionTime: number;
//     clientOrderId: string;
//     cummulativeQuoteQty: number;
//     additionalTradeInfo: string;
//     placedAt: string;
//     updatedAt: string;
//   }

//   export interface order {
//     symbol: string;
//     orderId: string;
//     orderListId: number;
//     clientOrderId: string;
//     price: number;
//     origQty: number;
//     executedQty: number;
//     cummulativeQuoteQty: number;
//     status: string;
//     timeInForce: string;
//     type: string;
//     side: string;
//     stopPrice: number;
//     icebergQty: number;
//     time: number;
//     updateTime: number;
//     isWorking: boolean;
//     origQuoteOrderQty: number;
//   }
// }


import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import * as Router from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import * as Api from "src/api";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";

export const useBinanceSpot = (
  coinList: Hooks.Main.UseCoin.coin[],
  prices: {
    currency_pair: string;
    last: number;
  }[]
) => {
  const { coinId } = Router.useParams();
  const [socketURL, setSocketURL] = React.useState("");
  const [coinInfo, setCoinInfo] = React.useState<Record<string, any>>();
  const filteredCoins = coinList
    ? coinList.filter(({ active }) => Boolean(active))
    : [];
  const coin = coinList.find(
    (coinDetail) => coinId === coinDetail.coinId.replace("/", "_")
  );

  const [recentTrade, setRecentTrade] = React.useState<bybitRecentTrade[]>([]);
  const [sellorderBook, setSellOrderBook] = React.useState<number[][]>();
  const [buyorderBook, setBuyOrderBook] = React.useState<number[][]>();
  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketURL);

    // console.log(lastJsonMessage?.data, 'lastJsonMessage file')

  // Binance bot
  const getRecentTrade = React.useCallback(() => {
    Api.Server.Client.get(
      `${Constants.API_CONFIG.bybiyAPI}/market/recent-trade?category=spot&symbol=BTCUSDT&limit=15`
    ).then((res) => {
      setRecentTrade(res.data.result.list);
    });
  }, [lastJsonMessage?.data?.c?.toString()]);

  const getOrderBook = React.useCallback(() => {
    Api.Server.Client.get(
      `${Constants.API_CONFIG.bybiyAPI}/market/orderbook?category=spot&symbol=BTCUSDT&limit=7`
    ).then((res) => {
      setSellOrderBook(res.data.result.a);
      setBuyOrderBook(res.data.result.b);
    });
  }, [lastJsonMessage?.data?.c?.toString()]);

  // Kucoin bot
  const getRecentTradeKucoin = React.useCallback(() => {
    Api.Server.Request("getJamesBond", {
      type: "GET",
      url: `${
        Constants.API_CONFIG.kucoinAPI
      }/market/histories?symbol=${coinId?.replace("_", "-")}&limit=14`,
    }).then((res) => {
      setRecentTrade(res.data);
    });
  }, [lastJsonMessage?.data?.data?.lastTradedPrice?.toString()]);

  const getOrderBookKucoin = React.useCallback(() => {
    Api.Server.Request("getJamesBond", {
      type: "GET",
      url: `${
        Constants.API_CONFIG.kucoinAPI
      }/market/orderbook/level2_20?symbol=${coinId?.replace("_", "-")}&limit=7`,
    }).then((res) => {
      setSellOrderBook(res.data.result.a);
      setBuyOrderBook(res.data.result.b);
    });
  }, [lastJsonMessage?.data?.data?.lastTradedPrice?.toString()]);

  // Coin Socket data
  React.useEffect(() => {
    if (coin?.bot_status === "bybit") {
      setSocketURL(Constants.API_CONFIG.bybitSocketURL);
    } else if (!socketURL.includes(Constants.API_CONFIG.kucoinSocketURL)) {
      Api.Server.Request("getJamesBond", {
        type: "POST",
        url: `${Constants.API_CONFIG.kucoinAPI}/bullet-public`,
      }).then((res) =>
        setSocketURL(Constants.API_CONFIG.kucoinSocketURL + res.data.token)
      );
    }
    if (
      coin?.bot_status === "bybit" &&
      socketURL === Constants.API_CONFIG.bybitSocketURL
    ) {
      sendJsonMessage({
        op: "subscribe",
        args: [`tickers.${coinId?.replaceAll("_", "")?.toUpperCase()}`],
      });
      return () => {
        sendJsonMessage({
          op: "unsubscribe",
          args: [`tickers.${coinId?.replaceAll("_", "")?.toUpperCase()}`],
        });
        setRecentTrade([]);
        setBuyOrderBook(undefined);
        setSellOrderBook(undefined);
      };
    } else if (
      coin?.bot_status === "kucoin" &&
      socketURL.includes(Constants.API_CONFIG.kucoinSocketURL)
    ) {
      sendJsonMessage({
        id: new Date().getTime(),
        type: "subscribe",
        topic: `/market/snapshot:${coinId?.replace("_", "-")}`,
        privateChannel: false,
        response: true,
      });
      return () => {
        sendJsonMessage({
          id: new Date().getTime(),
          type: "unsubscribe",
          topic: `/market/snapshot:${coinId?.replace("_", "-")}`,
          privateChannel: false,
          response: true,
        });
      };
    }
  }, [coinId, coin?.bot_status, socketURL]);

  React.useEffect(() => {
    if (coin?.bot_status === "bybit") {
      getRecentTrade();
      getOrderBook();
    } else if (coin?.bot_status === "kucoin") {
      getRecentTradeKucoin();
      getOrderBookKucoin();
    }

    setCoinInfo(
      prices?.find(
        ({ currency_pair }: any) =>
          currency_pair === coinId?.replaceAll("_", "")?.toUpperCase()
      ) || { notFound: true }
    );
  }, [
    coinId,
    lastJsonMessage?.data?.c?.toString(),
    lastJsonMessage?.data?.data?.lastTradedPrice?.toString(),
  ]);

  React.useEffect(() => {
    if (readyState === ReadyState.CLOSED) setSocketURL("");
  }, [readyState]);

  React.useEffect(() => {
    return () => {
      setRecentTrade([]);
      // setOrderBook(undefined);
      setSellOrderBook(undefined);
      setBuyOrderBook(undefined);
      setCoinInfo(undefined);
    };
  }, [coinId]);

  // offline bot
  const { CoinDetail } = Hooks.Main.useCoinValues(coinId as string);

  const { data: recent_trades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
    "collection",
    `coins/${coinId}/trade_book`
  ).collectionSnapshot(
    [
      FirebaseFirestore.where("status", "in", [
        "pending",
        "partiallyCompleted",
        "completed",
      ]),
      FirebaseFirestore.orderBy("orderPlacedTime", "desc"),
      FirebaseFirestore.limit(15),
    ],
    coin?.bot_status !== "off"
  );

  const { data: buyTrades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
    "collection",
    `coins/${coinId}/trade_book`
  ).collectionSnapshot(
    [
      FirebaseFirestore.where("status", "in", ["completed"]),
      FirebaseFirestore.orderBy("orderType", "desc"),
      FirebaseFirestore.where("orderType", "<=", 3),
      FirebaseFirestore.limit(7),
    ],
    coin?.bot_status !== "off"
  );
  const { data: sellTrades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
    "collection",
    `coins/${coinId}/trade_book`
  ).collectionSnapshot(
    [
      FirebaseFirestore.where("status", "in", ["completed"]),
      FirebaseFirestore.orderBy("orderType", "desc"),
      FirebaseFirestore.where("orderType", ">=", 4),
      FirebaseFirestore.limit(7),
    ],
    coin?.bot_status !== "off"
  );

  return {
    binance: {
      coin,
      filteredCoins,
      coinInfo: {
        current_price: lastJsonMessage?.data?.c as number,
        price24hChange: lastJsonMessage?.data?.P,
        price24hHigh: lastJsonMessage?.data?.h,
        price24hLow: lastJsonMessage?.data?.l,
        volumeCoin: lastJsonMessage?.data?.v,
        volumeAmount: lastJsonMessage?.data?.v * lastJsonMessage?.data?.c,
      },
      recentTrade,
      sellorderBook,
      buyorderBook,
      // orderBook,
      coinId,
    },
    bybit: {
      coin,
      filteredCoins,
      coinInfo: {
        current_price: (lastJsonMessage?.data?.lastPrice ||
          coinInfo?.["last"]) as number,
        price24hChange:
          lastJsonMessage?.data?.price24hPcnt ||
          +coinInfo?.["changePercentage"],
        price24hHigh:
          lastJsonMessage?.data?.highPrice24h || coinInfo?.["high_24h"],
        price24hLow:
          lastJsonMessage?.data?.lowPrice24h || coinInfo?.["low_24h"],
        volumeCoin:
          lastJsonMessage?.data?.turnover24h || coinInfo?.["base_volume"],
        volumeAmount:
          lastJsonMessage?.data?.v * lastJsonMessage?.data?.volume24h ||
          coinInfo?.["quote_volume"],
      },
      recentTrade: recentTrade?.map((trade) => ({
        id: trade.execId,
        price: trade.price,
        qty: trade.size,
        quoteQty: trade.size,
        time: trade.time / 1000,
        isBuyerMaker: trade.side.toLowerCase() === "buy",
        isBestMatch: false,
      })),
      orderBook:
        buyorderBook && sellorderBook
          ? {
              asks: [...buyorderBook]?.map((trade) => [
                trade[0],
                trade[1],
                trade[0] * trade[1],
              ]),
              bids: [...sellorderBook]?.map((trade) => [
                trade[0],
                trade[1],
                trade[0] * trade[1],
              ]),
            }
          : undefined,
      coinId,
    },
    off: {
      coin,
      filteredCoins,
      coinInfo: {
        notFound: coinInfo?.["notFound"],
        current_price: coin?.current_price as number,
        price24hChange: +CoinDetail?.coinChart?.["24HourChange"]?.replace(
          "%",
          ""
        ),
        price24hHigh: CoinDetail?.coinChart?.["24HourHigh"],
        price24hLow: CoinDetail?.coinChart?.["24HourLow"],
        volumeCoin: CoinDetail?.coinChart?.["24HourCoinVolume"],
        volumeAmount: CoinDetail?.coinChart?.["24HourCurrencyVolume"],
      },
      recentTrade: recent_trades?.map((trade) => ({
        id: trade.tradeId,
        price: trade.orderAmount,
        qty: trade.noOfCoins,
        quoteQty: trade.noOfCoins,
        time: trade.orderPlacedTime,
        isBuyerMaker: Constants.ORDERTYPE[trade.orderType - 1].includes("Buy"),
        isBestMatch: false,
      })),
      orderBook:
        buyTrades && sellTrades
          ? {
              asks: [...buyTrades]?.map((trade) => [
                trade.orderAmount / trade.noOfCoins,
                trade.noOfCoins,
                trade.orderAmount,
              ]),
              bids: [...sellTrades]?.map((trade) => [
                trade.orderAmount / trade.noOfCoins,
                trade.noOfCoins,
                trade.orderAmount,
              ]),
            }
          : undefined,
      coinId,
    },
    kucoin: {
      coin,
      filteredCoins,
      coinInfo: {
        notFound: coinInfo?.["notFound"],
        current_price:
          (lastJsonMessage?.data?.data?.lastTradedPrice as number) ||
          (coinInfo?.["last"] as number),
        price24hChange:
          lastJsonMessage?.data?.data?.changeRate ||
          +coinInfo?.["change_percentage"],
        price24hHigh:
          lastJsonMessage?.data?.data?.high || coinInfo?.["high_24h"],
        price24hLow: lastJsonMessage?.data?.data?.low || coinInfo?.["low_24h"],
        volumeCoin:
          lastJsonMessage?.data?.data?.vol || coinInfo?.["base_volume"],
        volumeAmount:
          lastJsonMessage?.data?.data?.volValue || coinInfo?.["quote_volume"],
      },
      recentTrade: recentTrade?.slice(0, 14)?.map((trade: any) => ({
        id: trade.execId,
        price: trade.price,
        symbol: trade.symbol,
        size: trade.size,
        side: trade.side,
        // qty: trade.size,
        // quoteQty: trade.size,
        time: trade.time / 1000,
        // isBuyerMaker: trade?.side === "buy",
        // isBestMatch: false,
        isBlockTrade: false,
      })),
      //orderBook,
      sellorderBook,
      buyorderBook,
      coinId,
    },
  }[coin?.bot_status || "off"];
};

export const useBinanceTradeChart = (
  coinId: string,
  range: number,
  botStatus: "binance" | "kucoin" | "off" | "bybit"
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
            86400000: "30",
            2592000000: "720",
            7776000000: "D",
            15552000000: "D",
            31104000000: "W",
            93312000000: "M",
          }[range];
    if (botStatus === "bybit") {
      Api.Server.Client.get(
        `${
          Constants.API_CONFIG.bybiyAPI
        }/market/kline?category=spot&symbol=${coinId.replace(
          "/",
          ""
        )}&interval=${interval}&start=${
          new Date().getTime() - range
        }&end=${new Date().getTime()}`
      ).then((res) => {
        setData(
          res?.data?.result?.list?.map((candle: number[]) =>
            candle.slice(0, 5).map((c) => +c)
          )
        );
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
    id: string;
    //price: number;
    qty: number;
    quoteQty: number;

    isBlockTrade: boolean;
    // isBestMatch: boolean;

    price: string;
    symbol: string;
    size: string;
    side: string;
    // qty: trade.size,
    // quoteQty: trade.size,
    time: string;
    // isBuyerMaker: trade?.side === "buy",
    // isBestMatch: false,
  }

  export interface orderBook {
    asks: number[][];
    bids: number[][];
    a: string[][];
    b: string[][];
  }
}

export interface bybitRecentTrade {
  execId: string;
  symbol: string;
  price: number;
  size: number;
  side: "Buy" | "Sell";
  time: number;
  isBlockTrade: boolean;
}

export interface ownCoinChart {
  coinId: string;
  createdTime: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

export declare namespace GetTrade {
  export interface Return {
    tradesData: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    recentTradeList: allOrder[];
  }

  export interface allOrder {
    tradeId: string;
    orderId: string;
    uid: string;
    coin: string;
    status: string;
    filledPrice: number;
    amount: number;
    noOfCoins: number;
    walletAddress: string;
    orderTypeId: number;
    commission: number;
    commissionAsset: string;
    feePercent: number;
    fee: number;
    orderFilled: string;
    coveringTrade: 0 | 1;
    limitPrice: number;
    stopPrice: number;
    transactionTime: number;
    clientOrderId: string;
    cummulativeQuoteQty: number;
    additionalTradeInfo: string;
    placedAt: string;
    updatedAt: string;
  }

  export interface order {
    symbol: string;
    orderId: string;
    orderListId: number;
    clientOrderId: string;
    price: number;
    origQty: number;
    executedQty: number;
    cummulativeQuoteQty: number;
    status: string;
    timeInForce: string;
    type: string;
    side: string;
    stopPrice: number;
    icebergQty: number;
    time: number;
    updateTime: number;
    isWorking: boolean;
    origQuoteOrderQty: number;
  }
}

// {
//   "symbol": "DMAILUSDT",
//   "bid1Price": "0.4868",
//   "bid1Size": "172.02",
//   "ask1Price": "0.4886",
//   "ask1Size": "237.41",
//   "lastPrice": "0.488",
//   "prevPrice24h": "0.4861",
//   "price24hPcnt": "0.0039",
//   "highPrice24h": "0.53",
//   "lowPrice24h": "0.4787",
//   "turnover24h": "330039.626232",
//   "volume24h": "656227.77"
// }
