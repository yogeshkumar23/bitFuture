import * as Hooks from "src/app/hooks";

export const useDataTrigger = (coinId: string) => {
  if (coinId === "all") return { trigger: "0" };
  const { data: trades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
    "collection",
    `coins/${coinId.replace("/", "_")}/trade_book`
  ).collectionSnapshot();

  const { data: p2ptrades } = Hooks.Firebase.useFireSnapshot<tradeBook>(
    "collection",
    `p2p_trade_book`
  ).collectionSnapshot();
  return {
    trigger:
      trades && p2ptrades
        ? `${trades.map(({ status }) => status).toString()}${p2ptrades
            .map(({ status }) => status)
            .toString()}`
        : "0",
  };
};
