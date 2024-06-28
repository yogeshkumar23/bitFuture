import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const OrderHistory = ({ type }: { type: "orders" | "trades" }) => {
  const [coinId, setCoinId] = React.useState("all");
  const [filter, setFilter] = React.useState("");
  const { data: coinList } =
    Hooks.Firebase.useFireSnapshot<Hooks.Main.UseCoin.coin>(
      "collection",
      "coins"
    ).collectionSnapshot();
  const { trades, loading } = Hooks.Admin.useSpotAllTrades();
  const { users, loading: userLoading } = Hooks.Admin.useUserList();
  const { contentCopy } = Hooks.User.useUtils();
  const handleChange = (e: Mui.SelectChangeEvent) => setCoinId(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);
  const data = trades
    ? trades
        .sort(
          (a, b) =>
            new Date(b.orderPlacedTime || b.placedAt).getTime() -
            new Date(a.orderPlacedTime || a.placedAt).getTime()
        )
        .filter(({ status }) =>
          type === "trades"
            ? ["completed", "FILLED", "done"].includes(status)
            : true
        )
        .filter((trade) =>
          coinId === "all"
            ? true
            : (trade?.coinId?.replace("/", "") || trade.coin) === coinId
        )
        .filter((trade) => {
          const userDetail = users?.userList?.find(
            (user) => user.uid === trade.uid
          );
          return `${userDetail?.firstName} ${userDetail?.lastName} ${
            userDetail?.email
          } ${trade.baseAsset} ${trade?.quoteAsset} ${
            Constants.ORDERTYPE[(trade.orderType || trade.orderTypeId) - 1]
          } ${trade.noOfCoins} ${trade?.noOfCoinsAsset || trade?.coin} ${
            ["FILLED", "done"].includes(trade.status)
              ? "Completed"
              : ["NEW", "open"].includes(trade.status)
              ? "Pending"
              : ["CANCELED", "canceled"].includes(trade.status)
              ? "Cancelled"
              : trade.status
          }`
            .toLowerCase()
            .includes(filter.toLowerCase());
        })
        .map((trade) => {
          const userDetail = users?.userList?.find(
            (user) => user.uid === trade.uid
          );
          return {
            id: (
              <Mui.Stack direction="row" alignItems="center">
                <Mui.Typography variant="inherit" width={100} noWrap>
                  {trade.tradeId}{" "}
                </Mui.Typography>
                <Mui.IconButton
                  size="small"
                  onClick={() => contentCopy(trade.tradeId)}
                >
                  <MuiIcons.CopyAll fontSize="inherit" color="primary" />
                </Mui.IconButton>
              </Mui.Stack>
            ),
            date: trade?.orderPlacedTime || trade?.placedAt,
            username: (
              <Mui.Typography
                variant="inherit"
                textTransform="capitalize"
              >{`${userDetail?.firstName} ${userDetail?.lastName}`}</Mui.Typography>
            ),
            email: userDetail?.email,
            pair: `${trade.baseAsset}/${trade?.quoteAsset}`,
            side: (
              <Mui.Typography
                variant="inherit"
                color={
                  Constants.ORDERTYPE[
                    (trade?.orderType || trade?.orderTypeId) - 1
                  ].includes("Buy")
                    ? "success.main"
                    : "error.main"
                }
              >
                {
                  Constants.ORDERTYPE[
                    (trade?.orderType || trade?.orderTypeId) - 1
                  ]
                }
              </Mui.Typography>
            ),
            price: (
              <Components.Global.Format
                number={
                  trade?.marketPrice || trade?.filledPrice || trade?.limitPrice
                }
                type="coin"
                coin={trade?.quoteAsset}
              />
            ),
            quantity: (
              <Components.Global.Format
                number={trade.noOfCoins}
                type="coin"
                coin={trade?.baseAsset}
              />
            ),
            // remaining: (
            //   <Components.Global.Format
            //     number={trade.noOfCoins - trade.tradedCoins}
            //     type="coin"
            //     coin={trade.coin}
            //   />
            // ),
            amount: (
              <Components.Global.Format
                number={trade.amount}
                type="coin"
                coin={trade?.quoteAsset}
              />
            ),
            commission: (
              <>
                <Components.Global.Format
                  number={
                    (trade?.commisionAmount || trade?.commission) +
                    (trade?.fee || 0)
                  }
                  type="coin"
                  coin={
                    Constants.ORDERTYPE[
                      (trade.orderTypeId || trade.orderType) - 1
                    ]
                      ?.toUpperCase()
                      ?.includes("BUY")
                      ? trade.baseAsset
                      : trade?.quoteAsset
                  }
                />
              </>
            ),
            // total: (
            //   <Components.Global.Format
            //     number={trade.orderTotalAmount}
            //     type="coin"
            //     coin={trade.currency}
            //   />
            // ),
            // trigger: trade.description,
            status: (
              <Mui.Typography
                color={
                  {
                    cancelled: "error.main",
                    canceled: "error.main",
                    dispute: "error.main",
                    pending: "warning.main",
                    open: "warning.main",
                    failed: "warning.main",
                    partiallyPending: "error.main",
                    declined: "error.main",
                    expired: "warning.main",
                    confirm: "success.main",
                    confirmed: "success.main",
                    completed: "success.main",
                    done: "success.main",
                    filled: "success.main",
                  }[trade?.status.toLowerCase()]
                }
                variant="inherit"
                sx={{ textTransform: "capitalize" }}
              >
                {["FILLED", "done"].includes(trade.status)
                  ? "Completed"
                  : ["NEW", "open"].includes(trade.status)
                  ? "Pending"
                  : ["CANCELED", "canceled"].includes(trade.status)
                  ? "Cancelled"
                  : trade.status}
              </Mui.Typography>
            ),
          };
        })
    : [];

  return loading || userLoading ? (
    <Components.Global.GlobalLoader />
  ) : (
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
            <Mui.MenuItem key={index} value={coin.coinId.replace("/", "")}>
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
        titles={[
          "Trade ID",
          "Date",
          "Username",
          "Email",
          "Pair",
          "Type",
          // "Side",
          "Price",
          "Quantity",
          // "Remaining",
          "Amount",
          "Commission",
          // "Total",
          // "Trigger Conditions",
          "Status",
        ]}
        data={data}
      />
    </Components.Global.Container>
  );
};
