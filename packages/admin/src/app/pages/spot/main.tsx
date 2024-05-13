import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Main = () => {
  const navigate = Router.useNavigate();
  const {
    prices,
    nativeCurrency,
    nativePrice,
    loading: priceLoading,
  } = Hooks.Main.useCoinPairPrices();
  const [filter, setFilter] = React.useState("");
  const { coins, loading } = Hooks.Main.useCoin();
  const filteredCoins = coins?.coinList
    ? coins.coinList.filter((coin) =>
        `${coin.coinName} ${coin.coin}`
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const data = filteredCoins?.map((coin, index) => ({
    coin: (
      <Mui.Stack key={index} direction="row" alignItems="center" spacing={1}>
        <Mui.CardMedia
          component="img"
          src={`${import.meta.env.VITE_API_ENCRYPTION}://${
            import.meta.env.VITE_API_IP
          }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
          sx={{ width: 40, borderRadius: 20 }}
        />
        <Mui.Stack>
          <Mui.Typography variant="body2" noWrap fontWeight="bolder">
            {coin.coinName}
          </Mui.Typography>
          <Mui.Typography variant="body2" color="text.secondary">
            {coin.coin}
          </Mui.Typography>
        </Mui.Stack>
      </Mui.Stack>
    ),
    quoteCurrency: coin.currency,
    price: (
      <Mui.Stack spacing={1}>
        <Components.Global.Format
          number={
            coin.bot_status === "off"
              ? coin.current_price
              : prices.find(
                  (coinPrice) =>
                    coinPrice.currency_pair ===
                    `${coin.coin}_${coin.currency}`.toUpperCase()
                )?.last || 1
          }
          type="number"
        />
        <Mui.Typography variant="caption">
          <Components.Global.Format
            number={
              (coin.bot_status === "off"
                ? coin.current_price
                : prices.find(
                    (coinPrice) =>
                      coinPrice.currency_pair ===
                      `${coin.coin}_${coin.currency}`.toUpperCase()
                  )?.last || 1) * nativePrice
            }
            type={nativeCurrency}
          />
        </Mui.Typography>
      </Mui.Stack>
    ),
    buyerFee: (
      <Components.Global.Format number={coin.buyer_fees} type="percentage" />
    ),
    sellerFee: (
      <Components.Global.Format number={coin.seller_fees} type="percentage" />
    ),
    botStatus: (
      <Mui.Typography variant="inherit" sx={{ textTransform: "capitalize" }}>
        {coin.bot_status}
      </Mui.Typography>
    ),
    status:
      coin.active === 1 ? (
        <Mui.Typography variant="inherit" color="success.dark">
          active
        </Mui.Typography>
      ) : (
        <Mui.Typography variant="inherit" color="error.dark">
          deactive
        </Mui.Typography>
      ),
    actions: (
      <Mui.Stack direction="row" spacing={2}>
        <Mui.Button
          size="small"
          onClick={() => navigate("edit", { state: coin })}
          variant="contained"
          startIcon={<MuiIcons.Paid />}
        >
          Edit Pair
        </Mui.Button>
      </Mui.Stack>
    ),
  }));

  return loading || priceLoading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={2} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Stack
        spacing={1}
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Mui.Typography variant="h5">Spot Coin Pairs</Mui.Typography>
        <Mui.Button
          startIcon={<MuiIcons.Add />}
          variant="contained"
          component={Router.Link}
          to="add"
        >
          Add Coin pairs
        </Mui.Button>
      </Mui.Stack>
      <Components.Global.Container spacing={2} direction="column">
        <Mui.Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="flex-end"
          spacing={2}
        >
          <Mui.TextField
            variant="outlined"
            size="small"
            placeholder="Filter records..."
            onChange={handleChange}
            value={filter}
          />
        </Mui.Stack>
        <Components.Global.ResponsiveTable
          id="Spot Pair"
          titles={[
            "Base Currency",
            "Quote Currency",
            "Current Price",
            "Buyer Fee",
            "Seller Fee",
            "Bot status",
            "Status",
            "Action",
          ]}
          data={data}
        />
      </Components.Global.Container>
      <Router.Outlet />
    </Mui.Stack>
  );
};
