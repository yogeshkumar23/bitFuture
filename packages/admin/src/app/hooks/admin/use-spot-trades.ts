import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import * as Api from "src/api";
import * as Hooks from "src/app/hooks";

export const useSpotTrades = (): GetTrade.Return => {
  const { data: tradesData, isFetching: loading } = Api.Server.useRequest(
    ["getTrades"],
    "getAllTrades"
  );
  return { tradesData, loading };
};

export const useSpotAllTrades = (): GetAllTrade.Return => {
  const { data: mainTrades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
    "collectionGroup",
    "trade_book"
  ).collectionSnapshot([FirebaseFirestore.orderBy("orderPlacedTime", "desc")]);
  const { data: binanceTrades, isFetching: loading } = Api.Server.useRequest(
    ["getTrades"],
    "getAllTrades"
  );

  return {
    trades: [...(mainTrades || []), ...(binanceTrades?.recentTradeList || [])],
    loading: loading || mainTrades === undefined,
  };
};

export const useDashboardTradeData = () => {
  const [spotTradeCount, setSpotTradeCount] = React.useState(0);
  const [spotTradeSuccessCount, setSpotTradeSuccessCount] = React.useState(0);
  const [p2pTradeCount, setP2pTradeCount] = React.useState(0);
  const [p2pTradeSuccessCount, setP2pTradeSuccessCount] = React.useState(0);
  const [disputeTradeCount, setDisputeTradeCount] = React.useState(0);
  const [disputeTradeSuccessCount, setDisputeTradeSuccessCount] =
    React.useState(0);
  const { getCount } = Hooks.Firebase.useFirestore();

  React.useEffect(() => {
    getCount("collectionGroup", "trade_book", []).then(({ count }) => {
      setSpotTradeCount(count);
    });

    getCount("collectionGroup", "trade_book", [
      FirebaseFirestore.where("status", "in", ["completed", "FILLED", "done"]),
    ]).then(({ count }) => {
      setSpotTradeSuccessCount(count);
    });

    getCount("collection", "p2p_trade_book", []).then(({ count }) => {
      setP2pTradeCount(count);
    });

    getCount("collection", "p2p_trade_book", [
      FirebaseFirestore.where("status", "in", ["completed"]),
    ]).then(({ count }) => {
      setP2pTradeSuccessCount(count);
    });

    getCount("collectionGroup", "p2p_request_trades", [
      FirebaseFirestore.where("dispute", "==", true),
    ]).then(({ count }) => {
      setDisputeTradeCount(count);
    });

    getCount("collectionGroup", "p2p_request_trades", [
      FirebaseFirestore.where("dispute", "==", true),
      FirebaseFirestore.where("status", "!=", "dispute"),
    ]).then(({ count }) => {
      setDisputeTradeSuccessCount(count);
    });
  }, []);

  return {
    spotTradeCount,
    spotTradeSuccessCount,
    p2pTradeCount,
    p2pTradeSuccessCount,
    disputeTradeCount,
    disputeTradeSuccessCount,
  };
};

export declare namespace GetAllTrade {
  export interface Return {
    trades: (allOrder & tradeBook)[];
    loading: boolean;
  }
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
    noOfCoinsAsset: string;
    tradeCommissionAsset: string;
    enteredQuantityAsset: string;
    firstName: string;
    lastName: string;
    email: string;
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
