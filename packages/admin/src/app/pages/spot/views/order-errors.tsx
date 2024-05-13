import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const OrderErrors = () => {
  const navigate = Router.useNavigate();
  const [coinId, setCoinId] = React.useState("all");
  const [filter, setFilter] = React.useState("");
  const { data: coinList } =
    Hooks.Firebase.useFireSnapshot<Hooks.Main.UseCoin.coin>(
      "collection",
      "coins"
    ).collectionSnapshot();
  const { trades, loading } = Hooks.Admin.useSpotTradesErrors();
  const handleChange = (e: Mui.SelectChangeEvent) => setCoinId(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);
  const handleEdit = (id: string, info: Hooks.Admin.GetTradeError.allOrder) =>
    navigate(id, { state: info });

  const data = trades?.tradeErrors
    ? trades.tradeErrors
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .filter((trade) =>
          coinId === "all" ? true : `${trade.coin}${trade.coinPair}` === coinId
        )
        .filter((trade) =>
          `${trade?.firstName} ${trade?.lastName} ${trade?.email} ${
            trade.baseAsset
          } ${trade.quoteAsset} ${Constants.ORDERTYPE[trade.orderType - 1]} ${
            trade.amount
          } ${trade?.coin}`
            .toLowerCase()
            .includes(filter.toLowerCase())
        )
        .map((trade) => ({
          id: trade.teoId,
          date: trade.createdAt,
          username: (
            <Mui.Typography
              variant="inherit"
              textTransform="capitalize"
            >{`${trade.firstName} ${trade.lastName}`}</Mui.Typography>
          ),
          email: trade.email,
          pair: `${trade.baseAsset}/${trade.quoteAsset}`,
          side: (
            <Mui.Typography
              variant="inherit"
              color={
                Constants.ORDERTYPE[trade?.orderType - 1].includes("Buy")
                  ? "success.main"
                  : "error.main"
              }
            >
              {Constants.ORDERTYPE[trade?.orderType - 1]}
            </Mui.Typography>
          ),
          quantity: (
            <Components.Global.Format
              number={trade.amount}
              type="coin"
              coin={
                Constants.ORDERTYPE[trade.orderType - 1]
                  ?.toUpperCase()
                  ?.includes("BUY")
                  ? trade.baseAsset
                  : trade?.quoteAsset
              }
            />
          ),
          status: (
            <Mui.Typography
              color={
                {
                  cancelled: "error.main",
                  canceled: "error.main",
                  dispute: "error.main",
                  pending: "warning.main",
                  new: "warning.main",
                  failed: "error.main",
                  partiallyPending: "error.main",
                  declined: "error.main",
                  expired: "warning.main",
                  confirm: "success.main",
                  confirmed: "success.main",
                  completed: "success.main",
                  filled: "success.main",
                  success: "success.main",
                }[trade.status.toLowerCase()]
              }
              variant="inherit"
              sx={{ textTransform: "capitalize" }}
            >
              {["FILLED"].includes(trade.status)
                ? "Completed"
                : ["NEW"].includes(trade.status)
                ? "Pending"
                : ["CANCELED"].includes(trade.status)
                ? "Cancelled"
                : trade.status.toLowerCase()}
            </Mui.Typography>
          ),
          message: JSON.parse(trade.errorInfo)["msg"],
          action: (
            <Mui.Stack direction={{ xs: "column", md: "row" }} spacing={1}>
              <Mui.Button
                size="small"
                variant="contained"
                sx={{
                  display:
                    trade.status.toLowerCase() === "pending" ? "flex" : "none",
                }}
                onClick={() => handleEdit(`edit/${trade.teoId}`, trade)}
              >
                Edit Status
              </Mui.Button>
            </Mui.Stack>
          ),
        }))
    : [];

  return loading ? (
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
          "ID",
          "Date",
          "Username",
          "Email",
          "Coin Pair",
          "Type",
          "Entered Quantity",
          "Status",
          "Message",
          "Action",
        ]}
        data={data}
      />
      <Router.Outlet />
    </Components.Global.Container>
  );
};
