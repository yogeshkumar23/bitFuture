import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import * as Api from "src/api";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";

export const useSpotCoinTrades = (coinId: string, uid: string) => {
  const pageLimit = 100;
  const [count, setCount] = React.useState(0);
  const [openOrderCount, setOpenOrderCount] = React.useState(0);
  const [trades, setTrades] =
    React.useState<FirebaseFirestore.DocumentData[]>();
  const [loading, setLoading] = React.useState(false);
  const { getCount, paginatedQuery } = Hooks.Firebase.useFirestore();
  const { trigger } = React.useContext(Contexts.UserContext);

  const { data: binanceTrades, isFetching: binanceLoading } =
    Api.Server.useRequest(["getTrades", coinId, trigger], "getAllTrades", {
      coin: coinId?.split("_")?.[0],
      currency: coinId?.split("_")?.[1],
    });

  React.useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      getCount("collection", `coins/${coinId}/trade_book`, [
        FirebaseFirestore.where("uid", "==", uid),
        FirebaseFirestore.orderBy("orderPlacedTime", "desc"),
      ]).then((response) => {
        setCount(response.count);
      });
      getCount("collection", `coins/${coinId}/trade_book`, [
        FirebaseFirestore.where("uid", "==", uid),
        FirebaseFirestore.orderBy("orderPlacedTime", "desc"),
        FirebaseFirestore.where("status", "in", [
          "pending",
          "partiallyCompleted",
          "NEW",
          "open",
        ]),
      ]).then((response) => {
        setOpenOrderCount(response.count);
      });
      paginatedQuery(
        "collection",
        `coins/${coinId}/trade_book`,
        pageLimit,
        undefined,
        [
          FirebaseFirestore.where("uid", "==", uid),
          FirebaseFirestore.orderBy("orderPlacedTime", "desc"),
          FirebaseFirestore.limit(100),
        ]
      ).then((response) => {
        setTrades(response.data);
        setLoading(false);
      });
    };

    getAllData();

    return () => {
      setTrades(undefined);
    };
  }, [coinId, trigger]);

  return {
    trades: [
      ...(trades?.map((doc) => ({ id: doc.id, ...doc.data() })) || []),
      ...(binanceTrades?.recentTradeList || []),
    ],
    count: count + (binanceTrades?.recentTradeList?.length || 0),
    openOrderCount:
      openOrderCount +
      (binanceTrades?.recentTradeList?.map((trade: any) =>
        ["pending", "partiallyCompleted", "NEW", "open"].includes(trade.status)
      )?.length || 0),
    loading: binanceLoading || loading,
  };
};

export const useSpotAllTrades = (uid: string): GetTrade.Return => {
  const { trigger } = React.useContext(Contexts.UserContext);
  const { data: mainTrades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
    "collectionGroup",
    `trade_book`
  ).collectionSnapshot([
    FirebaseFirestore.where("uid", "==", uid),
    FirebaseFirestore.orderBy("orderPlacedTime", "desc"),
  ]);
  const { data: binanceTrades, isFetching: loading } = Api.Server.useRequest(
    ["getTrades", trigger],
    "getAllTrades",
    { coin: "all", currency: "all" }
  );

  return {
    trades: [...(mainTrades || []), ...(binanceTrades?.recentTradeList || [])],
    loading: loading || mainTrades === undefined,
  };
};

export declare namespace GetTrade {
  export interface Return {
    trades: (allOrder & tradeBook)[];
    loading: boolean;
  }
}
