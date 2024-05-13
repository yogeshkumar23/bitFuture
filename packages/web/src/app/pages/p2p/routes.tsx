import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export default () => {
  const {
    user,
    coinWalletDetails,
    amountWalletDetails,
    mainCurrency,
    nativeCurrency,
    nativePrice,
    loading,
  } = React.useContext(Contexts.UserContext);

  const { p2pcoinpair, loading: coinLoading } = Hooks.Main.useP2PCoinList();
  const p2pCoins = p2pcoinpair?.coinPairList
    ? [
        ...new Set(
          p2pcoinpair.coinPairList
            .filter(({ p2p_active }) => Boolean(p2p_active))
            .map(({ coin }) => coin)
        ),
      ]
    : [];
  const p2pCurrency = p2pcoinpair?.coinPairList
    ? [
        ...new Set(
          p2pcoinpair.coinPairList
            .filter(({ p2p_active }) => Boolean(p2p_active))
            .map(({ currency_id }) => currency_id)
        ),
      ]
    : [];
  return loading || coinLoading ? (
    <Components.Global.GlobalLoader />
  ) : (
    Router.useRoutes([
      {
        path: "/",
        element: <Router.Navigate to={`${p2pCoins?.[0]}/buy`} />,
      },
      {
        path: ":coin/:type/:tradeId",
        element: <Pages.P2P.Trade.Main />,
      },
      {
        path: "my-orders/:coin/:type/:tradeId",
        element: <Pages.P2P.Trade.Main />,
      },
      {
        path: ":userId/info/*",
        element: <Pages.P2P.Views.UserInfo p2pCoins={p2pCoins} />,
        children: [
          {
            path: ":coin/:type/*",
            element: (
              <Pages.P2P.Views.Table
                coinWalletDetails={coinWalletDetails}
                p2pCurrency={p2pCurrency}
              />
            ),
            children: [
              {
                path: "review",
                element: <Pages.P2P.Dialogs.Review.Main />,
              },
            ],
          },
        ],
      },
      {
        path: "/*",
        element: (
          <Pages.P2P.Main
            coinWalletDetails={coinWalletDetails}
            amountWalletDetails={amountWalletDetails}
            mainCurrency={mainCurrency}
            nativeCurrency={nativeCurrency}
            nativePrice={nativePrice}
            p2pCoins={p2pCoins}
          />
        ),
        children: [
          {
            path: ":coin/:type/*",
            element: (
              <Pages.P2P.Views.Table
                coinWalletDetails={coinWalletDetails}
                p2pCurrency={p2pCurrency}
              />
            ),
            children: [
              {
                path: "new-order",
                element: (
                  <Pages.P2P.Dialogs.NewOrder.Main
                    user={user}
                    coinWalletDetails={coinWalletDetails}
                    p2pCoins={p2pCoins}
                    p2pCurrency={p2pCurrency}
                    pairs={p2pcoinpair.coinPairList.filter(({ p2p_active }) =>
                      Boolean(p2p_active)
                    )}
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        path: "my-orders/*",
        element: <Pages.P2P.MyOrders.Main />,
        children: [
          {
            path: "delete",
            element: <Pages.P2P.Dialogs.CancelOrder />,
          },
          {
            path: "edit",
            element: <Pages.P2P.Dialogs.Edit />,
          },
        ],
      },
      {
        path: "my-order-requests",
        element: <Pages.P2P.MyOrders.Main />,
      },
      {
        path: "my-requests",
        element: <Pages.P2P.MyOrders.Main />,
      },
    ])
  );
};
