import React from "react";
import * as Router from "react-router-dom";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export default () => {
  const {
    coinList,
    user,
    coinWalletDetails,
    balanceLoading,
    nativePrice,
    nativeCurrency,
    prices,
  } = React.useContext(Contexts.UserContext);

  return coinList === undefined ? (
    <Components.Global.GlobalLoader />
  ) : (
    Router.useRoutes([
      {
        path: "/",
        element: (
          <Router.Navigate
            to={coinList
              ?.filter(({ active }) => Boolean(active))?.[0]
              ?.coinId?.replace("/", "_")}
          />
        ),
      },
      {
        path: ":coinId",
        element: (
          <Pages.Spot.Main
            coinList={coinList}
            user={user}
            CoinBalance={coinWalletDetails}
            balanceLoading={balanceLoading}
            nativePrice={nativePrice}
            nativeCurrency={nativeCurrency}
            prices={prices}
          />
        ),
      },
    ])
  );
};
