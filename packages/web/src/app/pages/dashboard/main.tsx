import * as FirebaseFirestore from "firebase/firestore";
import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import React from "react";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export default () => {
  const {
    user,
    coinWalletDetails,
    amountWalletDetails,
    nativeCurrency,
    mainCurrency,
    nativePrice,
    loading,
    account,
    logs,
  } = React.useContext(Contexts.UserContext);
  const { contentCopy } = Hooks.User.useUtils();
  const { transactions, loading: transactionLoading } =
    Hooks.User.useTransactions();
  const { trades: spotTrades, loading: tradeLoading } =
    Hooks.User.useSpotAllTrades(user?.uid as string);
  const { data: trades } = Hooks.Firebase.useFireSnapshot<p2pTrade>(
    "collection",
    `p2p_trade_book`
  ).collectionSnapshot();
  const { data: requestedTrades } =
    Hooks.Firebase.useFireSnapshot<p2pTradeRequest>(
      "collectionGroup",
      `p2p_request_trades`
    ).collectionSnapshot([
      FirebaseFirestore.orderBy("requestPlacedTime", "asc"),
    ]);
  const tradeRequests = requestedTrades
    ? (requestedTrades
        .map(({ uid, ...request }) => {
          const tradeDetail = trades?.find(
            ({ tradeId }) => tradeId === request.requestTradeId
          );
          return {
            ...tradeDetail,
            ...request,
            orderType:
              uid === user?.uid
                ? tradeDetail?.orderType === "buy"
                  ? "sell"
                  : "buy"
                : tradeDetail?.orderType,
          };
        })
        .filter(({ coin }) => Boolean(coin)) as (p2pTrade & p2pTradeRequest)[])
    : [];

  return loading ||
    transactionLoading ||
    tradeLoading ||
    tradeRequests === undefined ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Container maxWidth="lg" sx={{ px: { xs: 0, sm: 1 } }}>
      <Pages.Views.IntroJSConfig name="dashboard" />
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={12} md={8}>
          <Pages.Dashboard.Views.CoinDetails
            coinWalletDetails={coinWalletDetails}
            nativeCurrency={nativeCurrency}
            mainCurrency={mainCurrency}
            nativePrice={nativePrice}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={4}>
          <Pages.Views.AmountBox
            coinWalletDetails={coinWalletDetails}
            amountWalletDetails={amountWalletDetails}
            nativeCurrency={nativeCurrency}
            mainCurrency={mainCurrency}
            nativePrice={nativePrice}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Pages.Dashboard.Views.RecentTransaction
            transactions={transactions.transactions}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Pages.Dashboard.Views.TradeHistory
            contentCopy={contentCopy}
            account={account}
            trades={spotTrades}
            p2p_trades={tradeRequests
              .filter(({ requestuid, uid }) =>
                [requestuid, uid].includes(user?.uid as string)
              )
              .sort((a, b) => b.requestPlacedTime - a.requestPlacedTime)}
            logs={logs}
          />
        </Mui.Grid>
      </Mui.Grid>
      <Router.Outlet />
    </Mui.Container>
  );
};
