import * as FirebaseFirestore from "firebase/firestore";
import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const AdminRevenues = () => {
  const [filter, setFilter] = React.useState("");
  const { data: trades } = Hooks.Firebase.useFireSnapshot<p2pTrade>(
    "collection",
    "p2p_trade_book"
  ).collectionSnapshot([FirebaseFirestore.where("status", "==", "completed")]);
  const filteredTrades = trades
    ? trades.filter((trade) =>
        `${trade.orderType} ${trade.orderType} ${trade.coin}-${trade.currency}`
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
    : [];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const data = filteredTrades.map((coin) => ({
    Id: coin.tradeId,
    Date: Components.Global.timeFn(coin.orderPlacedTime as unknown as string),
    Coin: coin.coin,
    Currency: coin.currency,
    Pricecrypto: coin.noOfCoins * coin.pricePerCoin,
    FeeFait: 0,
  }));

  return trades ? (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">Admin Revenues</Mui.Typography>
      <Components.Global.Container spacing={2} direction="column">
        <Mui.Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="flex-end"
          spacing={2}
        >
          <Mui.Box flexGrow={1} />
          <Mui.TextField
            variant="outlined"
            size="small"
            placeholder="Filter records..."
            onChange={handleFilterChange}
            value={filter}
          />
        </Mui.Stack>
        <Components.Global.ResponsiveTable
          id="P2P Admin Revenues"
          titles={[
            "ID",
            "Date",
            "Coin",
            "Currency",
            "Price (asset)",
            "Fee (Fait)",
          ]}
          data={data}
        />
      </Components.Global.Container>
      <Router.Outlet />
    </Mui.Stack>
  ) : (
    <Components.Global.GlobalLoader />
  );
};
