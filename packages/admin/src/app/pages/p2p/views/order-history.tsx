import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const OrderHistory = () => {
  const [coinId, setCoinId] = React.useState("all");
  const [filter, setFilter] = React.useState("");
  const { data: users } =
    Hooks.Firebase.useFireSnapshot<Hooks.User.UseUser.User>(
      "collection",
      "users"
    ).collectionSnapshot();
  const { data: coinList } =
    Hooks.Firebase.useFireSnapshot<Hooks.Main.UseCoin.coin>(
      "collection",
      "coins"
    ).collectionSnapshot();
  const { data: trades } = Hooks.Firebase.useFireSnapshot<p2pTrade>(
    "collection",
    "p2p_trade_book"
  ).collectionSnapshot();
  const filteredTrades = trades
    ? trades
        .filter((trade) =>
          coinId === "all" ? true : `${trade.coin}/${trade.currency}` === coinId
        )
        .filter((trade) =>
          `${trade.orderType} ${trade.orderType} ${trade.coin}-${trade.currency}`
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase())
        )
        .sort((a, b) => b.orderPlacedTime - a.orderPlacedTime)
    : [];

  const handleChange = (e: Mui.SelectChangeEvent) => setCoinId(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const data = filteredTrades.map((trade) => {
    const userDetail = users?.find(({ id }) => trade.uid === id);
    return {
      id: trade.tradeId,
      username: `${userDetail?.firstName} ${userDetail?.lastName}`,
      email: userDetail?.email,
      date: trade.showPostTill,
      type: (
        <Mui.Typography
          sx={{
            py: 0.5,
            px: 2,
            borderRadius: 1,
            width: "fit-content",
            textTransform: "capitalize",
          }}
          color={trade.orderType === "buy" ? "success.light" : "error.light"}
          variant="inherit"
        >
          {trade.orderType}
        </Mui.Typography>
      ),
      pair: `${trade.coin}-${trade.currency}`,
      coinLimit: (
        <>
          <Components.Global.Format
            number={trade.quantityLimitFrom}
            type="number"
          />
          -
          <Components.Global.Format
            number={trade.quantityLimitTo}
            type="number"
          />
        </>
      ),
      // currencyLimit: (
      //   <>
      //     <Components.Global.Format
      //       number={trade.priceLimitFrom}
      //       type="number"
      //     />
      //     -
      //     <Components.Global.Format number={trade.priceLimitTo} type="number" />
      //   </>
      // ),
      quantity: trade.noOfCoins,
      paymentType:
        +trade.prefferedPayment === 0 ? "All Payments" : trade.prefferedPayment,
      status: (
        <Mui.Typography
          color={
            {
              cancelled: "error.main",
              dispute: "error.main",
              pending: "error.main",
              declined: "error.main",
              expired: "warning.main",
              confirm: "success.main",
              confirmed: "success.main",
              completed: "success.main",
            }[trade?.status]
          }
          variant="body2"
          sx={{ textTransform: "capitalize" }}
        >
          {trade.status}
        </Mui.Typography>
      ),
    };
  });

  return trades ? (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">Order History</Mui.Typography>
      <Components.Global.Container spacing={2} direction="column">
        <Mui.Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="flex-end"
          spacing={1}
        >
          <Mui.Select
            size="small"
            onChange={handleChange}
            name="coin"
            sx={{
              minWidth: 200,
              "& #mui-component-select-coin": {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              },
              "& .MuiListItemIcon-root": {
                minWidth: "fit-content",
                mr: 1,
              },
            }}
            defaultValue={coinId}
          >
            <Mui.MenuItem value="all">
              <Mui.Typography variant="body1">All Coins</Mui.Typography>
            </Mui.MenuItem>
            {coinList?.map((coin, index) => (
              <Mui.MenuItem key={index} value={coin.coinId}>
                <Mui.ListItemIcon>
                  <Mui.Avatar
                    src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                      import.meta.env.VITE_API_IP
                    }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
                    sx={{ height: 30, width: 30 }}
                  />
                </Mui.ListItemIcon>
                <Mui.Typography variant="body2">{coin.coinId}</Mui.Typography>
              </Mui.MenuItem>
            ))}
          </Mui.Select>
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
          id="P2P Order History"
          titles={[
            "POST ID",
            "USERNAME",
            "EMAIL",
            "DATE",
            "AD TYPE",
            "TRADE PAIR",
            "COIN LIMIT",
            // "CURRENCY LIMIT",
            "QUANTITY",
            "PAYMENT TYPE",
            "STATUS",
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
