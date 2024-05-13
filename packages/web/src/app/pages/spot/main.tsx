import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Main = ({
  coinList,
  user,
  CoinBalance,
  balanceLoading,
  nativePrice,
  nativeCurrency,
  prices,
}: {
  coinList: Hooks.Main.UseCoin.coin[];
  user: Hooks.User.UseUser.User;
  CoinBalance: Contexts.userContext.coinsWallet[];
  balanceLoading: boolean;
  nativePrice: number;
  nativeCurrency: string;
  prices: {
    currency_pair: string;
    last: number;
  }[];
}) => {
  const { coin, filteredCoins, coinInfo, recentTrade, orderBook, coinId } =
    Hooks.Main.useBinanceSpot(coinList, prices);
  const { trades, openOrderCount } = Hooks.User.useSpotCoinTrades(
    coinId as string,
    user?.uid as string
  );

  return !coin ||
    !user ||
    ((!coinInfo?.current_price ||
      orderBook === undefined ||
      recentTrade === undefined) &&
      !coinInfo.notFound) ? (
    <Components.Global.GlobalLoader />
  ) : Boolean(coin?.active) ? (
    <>
      <Mui.Grid
        container
        spacing={2}
        sx={{
          px: { xs: 0, sm: 1 },
          pb: 2,
        }}
      >
        <Mui.Grid
          item
          container
          xs={12}
          lg={9}
          spacing={2}
          sx={{ height: "max-content" }}
        >
          <Mui.Grid item xs={12}>
            <Pages.Spot.Views.CoinInfo
              coin={{ ...coin, ...coinInfo }}
              filteredCoins={filteredCoins}
              nativeCurrency={nativeCurrency}
              nativePrice={nativePrice}
            />
          </Mui.Grid>
          <Mui.Grid
            item
            xs
            sx={{
              maxWidth: { xs: "100%", md: "fit-content" },
            }}
          >
            <Pages.Spot.Views.OrderBook
              coin={{ ...coin, ...coinInfo }}
              orderBook={orderBook}
              nativeCurrency={nativeCurrency}
              nativePrice={nativePrice}
            />
          </Mui.Grid>
          <Mui.Grid item xs sx={{ width: "100%", minHeight: "100%" }}>
            <Pages.Spot.Views.ChartView {...{ ...coin, ...coinInfo }} />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={3}>
          <Pages.Spot.Views.Orders.Main
            coin={{ ...coin, ...coinInfo }}
            CoinBalance={CoinBalance}
            loading={balanceLoading}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} lg={9}>
          <Pages.Spot.Views.TradeHistory.Main
            user={user}
            trades={trades}
            openOrderCount={openOrderCount}
            coin={{ ...coin, ...coinInfo }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={3}>
          <Pages.Spot.Views.RecentTrade
            coin={{ ...coin, ...coinInfo }}
            recentTrade={recentTrade}
          />
        </Mui.Grid>
      </Mui.Grid>
      {coinInfo["notFound"] && (
        <Mui.Typography
          variant="body1"
          fontWeight="bold"
          color="error.main"
          sx={{
            position: "fixed",
            bottom: 10,
            right: 10,
            zIndex: 999999,
            bgcolor: Mui.colors.grey[100],
            px: 5,
            py: 2,
            borderRadius: 2,
          }}
        >
          Unsupported coin pair
        </Mui.Typography>
      )}
    </>
  ) : (
    <Router.Navigate to=".." />
  );
};
