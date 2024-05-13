import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Contexts from "src/app/contexts";
import * as Pages from "src/app/pages";

export default () => {
  const {
    user,
    prices,
    nativeCurrency,
    mainCurrency,
    nativePrice,
    account,
    marketNfts,
    gasFee,
    syncedAccount,
    coinList,
  } = React.useContext(Contexts.UserContext);
  return (
    <Mui.Fade in>
      <Mui.Grid container>
        <Mui.Grid
          item
          sx={{ height: "92vh", position: "relative", overflow: "hidden" }}
          xs={12}
        >
          <Pages.Home.Views.Header user={user} />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Pages.Home.Views.MarketTrends
            user={user}
            prices={prices}
            nativeCurrency={nativeCurrency}
            mainCurrency={mainCurrency}
            nativePrice={nativePrice}
            account={account}
            marketNfts={marketNfts}
            gasFee={gasFee}
            syncedAccount={syncedAccount}
            coinList={coinList}
          />
          <Pages.Home.Views.Invest />
          <Pages.Home.Views.Trade user={user} />
          <Pages.Home.Views.Explore />
        </Mui.Grid>
        <Router.Outlet />
      </Mui.Grid>
    </Mui.Fade>
  );
};
