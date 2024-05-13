import * as FirebaseFirestore from "firebase/firestore";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";

export const Disputes = () => {
  const navigate = Router.useNavigate();
  const [status, setStatus] = React.useState("all");
  const [filter, setFilter] = React.useState("");
  const { data: users } =
    Hooks.Firebase.useFireSnapshot<Hooks.User.UseUser.User>(
      "collection",
      "users"
    ).collectionSnapshot();
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
        .map((request) => {
          const mainuser = users?.find(({ id }) => request.tradeuid === id);
          const requestuser = users?.find(
            ({ id }) => request.requestuid === id
          );
          return {
            ...request,
            username: `${mainuser?.firstName} ${mainuser?.lastName}`,
            usermail: mainuser?.email,
            userProfile: mainuser?.profileImage,
            requestUname: `${requestuser?.firstName} ${requestuser?.lastName}`,
            requestmail: requestuser?.email,
            requestUserProfile: requestuser?.profileImage,
            ...trades?.find(
              ({ tradeId }) => tradeId === request.requestTradeId
            ),
            requestPlacedTime: request?.requestPlacedTime,
            requestuid: request?.requestuid,
          };
        })
        .filter(({ coin, dispute }) => Boolean(coin && dispute)) as (p2pTrade &
        p2pTradeRequest)[])
    : [];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const handleChange = (e: Mui.SelectChangeEvent) => setStatus(e.target.value);

  const data = tradeRequests
    .filter(({ disputeRaisedUid }) => Boolean(disputeRaisedUid))
    .filter((trade) =>
      status === "all" ? true : trade.requestStatus === status
    )
    .filter((trade) =>
      `${trade.requestTradeId} ${trade.usermail} ${trade.username} ${trade.requestUname} ${trade.requestUname} ${trade.orderType} ${trade.orderType} ${trade.coin}-${trade.currency}`
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase())
    )
    .sort((a, b) => (b?.disputedTime || 0) - (a.disputedTime || 0))
    .map((trade, index) => ({
      postId: trade.requestTradeId,
      date: trade.disputedTime,
      buyerId: (
        <Mui.Link
          component={Router.Link}
          to={`${Constants.API_CONFIG.base}users/details/${
            trade.orderType === "buy" ? trade.tradeuid : trade.requestuid
          }/info`}
        >
          {trade.orderType === "buy" ? trade.username : trade.requestUname}
          <MuiIcons.OpenInNew fontSize="inherit" />
        </Mui.Link>
      ),
      buyerEmail:
        trade.orderType === "buy" ? trade.usermail : trade.requestmail,
      sellerId: (
        <Mui.Link
          component={Router.Link}
          to={`${Constants.API_CONFIG.base}users/details/${
            trade.orderType === "sell" ? trade.tradeuid : trade.requestuid
          }/info`}
        >
          {trade.orderType === "sell" ? trade.username : trade.requestUname}
          <MuiIcons.OpenInNew fontSize="inherit" />
        </Mui.Link>
      ),
      sellerEmail:
        trade.orderType === "sell" ? trade.usermail : trade.requestmail,
      status: (
        <Mui.Typography
          variant="inherit"
          color={
            {
              cancelled: "error.main",
              dispute: "error.main",
              pending: "error.main",
              declined: "error.main",
              expired: "warning.main",
              confirm: "error.main",
              confirmed: "success.main",
              completed: "success.main",
              paid: "success.main",
              ongoing: "warning.main",
            }[trade.requestStatus || "pending"]
          }
          sx={{ textTransform: "capitalize" }}
        >
          {trade.requestStatus}
        </Mui.Typography>
      ),
      action: (
        <Mui.Button
          key={index}
          size="small"
          variant="contained"
          onClick={() => navigate("detail", { state: trade })}
        >
          View
        </Mui.Button>
      ),
    }));

  return trades ? (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">P2P Dispute List</Mui.Typography>
      <Components.Global.Container spacing={1} direction="column">
        <Mui.Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="flex-end"
          spacing={2}
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
            defaultValue={status}
          >
            <Mui.MenuItem value="all">
              <Mui.Typography variant="body1">All Status</Mui.Typography>
            </Mui.MenuItem>
            {[
              "cancelled",
              "dispute",
              "pending",
              "declined",
              "expired",
              "confirm",
              "confirmed",
              "completed",
              "paid",
              "ongoing",
            ].map((_status, index) => (
              <Mui.MenuItem key={index} value={_status}>
                {_status}
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
          id="P2P Disputes"
          titles={[
            "Trade ID",
            "Date",
            "Buyer",
            "Buyer Email",
            "Seller",
            "Seller Email",
            "Status",
            "Action",
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
