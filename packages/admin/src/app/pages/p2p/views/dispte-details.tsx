import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import React from "react";
import * as Router from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const DisputeDetails = () => {
  const user = React.useContext(Contexts.UserContext);
  const [paidLoading, setPaidLoading] = React.useState(false);
  const [view, setView] = React.useState(false);
  const handleView = () => setView(!view);
  const { state } = Router.useLocation() as {
    state: p2pTrade & p2pTradeRequest;
  };
  const { data: paid } = Hooks.Firebase.useFireSnapshot(
    "collection",
    `users/${state?.requestuid}/p2p_trade_messages`
  ).documentSnapshot(`${state?.tradeId}_${state?.requestPlacedTime}`) as {
    data: { image: string; paid: boolean }[];
  };
  const { data: trades } = Hooks.Firebase.useFireSnapshot<p2pTrade>(
    "collection",
    `p2p_trade_book`
  ).documentSnapshot(state?.orderPlacedTime?.toString() as string);
  const { data: request } = Hooks.Firebase.useFireSnapshot<p2pTradeRequest>(
    "collection",
    `users/${state?.requestuid}/p2p_request_trades`
  ).documentSnapshot(`${state?.tradeId}_${state?.requestPlacedTime}`);

  const { loading, tradeConfirm, tradeRequestCancel } = Hooks.Main.useP2PTrade(
    user?.uid as string,
    state?.requestPlacedTime as number
  );

  const completed = React.useMemo(() => {
    setPaidLoading(false);
    return Boolean(
      trades?.[0]?.status === "completed" ||
        trades?.[0]?.status === "cancelled" ||
        request?.[0]?.requestStatus === "cancelled" ||
        request?.[0]?.requestStatus === "completed" ||
        request?.[0]?.requestStatus === "expired"
    );
  }, [request?.[0]?.requestStatus, trades?.[0]?.status]);

  return trades ? (
    <Mui.Grid container spacing={1}>
      <Mui.Grid item xs={12}>
        <Components.Global.Container
          direction="column"
          sx={{ pr: { xs: 1, md: 2 } }}
          customTitle={
            <Mui.Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Mui.Typography variant="h6" align="center" fontWeight={700}>
                Trade Details
                <Mui.Typography
                  variant="body2"
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
                    }[request?.[0]?.requestStatus || "pending"]
                  }
                  sx={{ textTransform: "capitalize" }}
                >
                  (
                  {
                    {
                      pending: "Request Pending",
                      confirm: "Request Pending",
                      confirmed: "Request Accepted",
                      ongoing: "Payment Completed",
                      paid: "Order Completed",
                      completed: "Order Completed",
                      dispute: "Dispute Raised",
                      expired: "Request Expired",
                      cancelled: "Request Cancelled",
                    }[request?.[0]?.requestStatus || "pending"]
                  }
                  )
                </Mui.Typography>
              </Mui.Typography>
              <Mui.Button
                startIcon={<MuiIcons.ArrowBack />}
                variant="outlined"
                component={Router.Link}
                to="../disputes"
                sx={{ mb: 1, height: "fit-content" }}
              >
                Back
              </Mui.Button>
            </Mui.Stack>
          }
        >
          <Mui.Grid container spacing={2}>
            <Mui.Grid item xs={12} md={4}>
              <Mui.Stack component={Mui.DialogContent} spacing={2}>
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Trade ID"
                  label={state?.tradeId}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Created Date"
                  label={state?.orderPlacedTime}
                  time
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Buyer"
                  label={
                    state?.orderType === "buy"
                      ? state?.username
                      : state?.requestUname
                  }
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Buyer Email"
                  label={
                    state?.orderType === "buy"
                      ? state?.usermail
                      : state?.requestmail
                  }
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Seller"
                  label={
                    state?.orderType === "sell"
                      ? state?.username
                      : state?.requestUname
                  }
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Seller Email"
                  label={
                    state?.orderType === "sell"
                      ? state?.usermail
                      : state?.requestmail
                  }
                  node
                />
              </Mui.Stack>
            </Mui.Grid>
            <Mui.Grid item xs={12} md={4}>
              <Mui.Stack component={Mui.DialogContent} spacing={2}>
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Coin"
                  label={state?.coin}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Currency"
                  label={state?.currency}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Price per coin"
                  label={state?.pricePerCoin}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Requested Quantity"
                  label={state?.requestCoins}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Payment Type"
                  label={state?.prefferedPayment}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Show Post Till"
                  label={state?.showPostTill}
                  time
                />
              </Mui.Stack>
            </Mui.Grid>
            <Mui.Grid item xs={12} md={4}>
              <Mui.Stack component={Mui.DialogContent} spacing={2}>
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Order Type"
                  label={state?.orderType}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Current Market Price"
                  label={state?.coinMarketPrice}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Traded Coins"
                  label={state?.tradedCoins}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Disputed UID"
                  label={state?.disputeRaisedUid}
                  node
                />
                <Components.Global.StackLabel
                  direction="row"
                  medium
                  title="Disputed Time"
                  label={state?.disputedTime as number}
                  time
                />
              </Mui.Stack>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Stack direction="row" justifyContent="space-between">
            <MuiLab.LoadingButton
              loading={loading || paidLoading}
              variant="contained"
              color="success"
              disabled={completed || !Boolean(paid?.[0]?.paid)}
              onClick={() => {
                setPaidLoading(true);
                tradeConfirm(state);
              }}
              sx={{
                width: "fit-content",
                textTransform: "capitalize",
              }}
            >
              Resolve Trade
            </MuiLab.LoadingButton>
            <MuiLab.LoadingButton
              loading={loading || paidLoading}
              variant="contained"
              color="error"
              disabled={completed}
              onClick={() => {
                setPaidLoading(true);
                tradeRequestCancel(
                  state.tradeId as string,
                  state?.tradeuid as string,
                  state?.requestuid as string
                );
              }}
              sx={{
                width: "fit-content",
                textTransform: "capitalize",
              }}
            >
              cancel Trade
            </MuiLab.LoadingButton>
          </Mui.Stack>
        </Components.Global.Container>
      </Mui.Grid>
      <Mui.Grid item xs={12} md={4}>
        {view && (
          <Components.Global.FullView
            onClick={handleView}
            src={`${import.meta.env.VITE_API_ENCRYPTION}://${
              import.meta.env.VITE_API_IP
            }${import.meta.env.VITE_ASSETS_PATH}${paid?.[0]?.image}`}
          />
        )}
        <Components.Global.Container direction="column" sx={{ height: "65vh" }}>
          <Mui.Typography variant="h6">Payment Receipt</Mui.Typography>
          {paid?.[0]?.image ? (
            <Mui.CardMedia
              onClick={handleView}
              component="img"
              src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                import.meta.env.VITE_API_IP
              }${import.meta.env.VITE_ASSETS_PATH}${paid?.[0]?.image}`}
              sx={{ width: "100%", height: "100%", borderRadius: 2 }}
            />
          ) : (
            <Mui.Typography
              variant="caption"
              color="secondary"
              textAlign="center"
            >
              No Payment Receipt Available
            </Mui.Typography>
          )}
        </Components.Global.Container>
      </Mui.Grid>
      <Mui.Grid item xs={12} md={8}>
        <Pages.P2P.Views.Messaging
          path={`users/${state?.requestuid}/p2p_trade_messages/${state?.tradeId}_${state?.requestPlacedTime}/messages`}
          completed={completed}
          dispute={false}
        />
      </Mui.Grid>
    </Mui.Grid>
  ) : (
    <Components.Global.GlobalLoader />
  );
};
