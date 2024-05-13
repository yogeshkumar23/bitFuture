import * as FirebaseFirestore from "firebase/firestore";
import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Main = () => {
  const [open, close] = React.useState(false);
  const [paidLoading, setPaidLoading] = React.useState(false);
  const [frontendExpire, setFrontendExpire] = React.useState(false);
  const { user } = React.useContext(Contexts.UserContext);
  const navigate = Router.useNavigate();
  const [view, setView] = React.useState(false);
  const { link, loading: fileLoading, upload } = Hooks.Utils.useFileUpload();
  const { coin, type } = Router.useParams();
  const { state } = Router.useLocation() as {
    state: p2pTrade & p2pTradeRequest;
  };
  const {
    payment,
    loading,
    payemntDetials,
    tradeAccept,
    tradeDispute,
    tradeConfirm,
    pay,
  } = Hooks.Main.useP2PTrade(user?.uid as string);
  const { contentCopy } = Hooks.User.useUtils();
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
  const { data: requestTrades } =
    Hooks.Firebase.useFireSnapshot<p2pTradeRequest>(
      "collection",
      `users/${state?.uid}/p2p_trades/${state?.tradeId}/requests`
    ).collectionSnapshot([
      FirebaseFirestore.where("status", "in", ["confirmed", "ongoing"]),
    ]);

  const buyer =
    Boolean(type === "buy" && state?.uid === user?.uid) ||
    Boolean(type === "sell" && state?.requestuid === user?.uid);

  const completed = React.useMemo(
    () =>
      Boolean(
        trades?.[0]?.status === "completed" ||
          trades?.[0]?.status === "cancelled" ||
          request?.[0]?.requestStatus === "cancelled" ||
          request?.[0]?.requestStatus === "completed" ||
          request?.[0]?.requestStatus === "expired" ||
          frontendExpire
      ),
    [
      request?.[0]?.requestStatus,
      trades?.[0]?.showPostTill,
      paid?.[0]?.paid,
      frontendExpire,
    ]
  );

  const accepted = React.useMemo(
    () => Boolean(request?.[0]?.status === "confirmed"),
    [request?.[0]?.status]
  );

  const dispute = React.useMemo(
    () => Boolean(request?.[0]?.dispute),
    [request?.[0]?.dispute]
  );

  const handleDialog = () => {
    close(!open);
  };

  const raiseDispute = () => {
    tradeDispute(state);
    close(false);
  };

  const handleView = () => setView(!view);

  const handleBack = () => navigate(-1);

  const handleBrowse = async (e: React.ChangeEvent<HTMLInputElement>) =>
    await upload(e.target?.files?.[0] as File);

  React.useEffect(() => {
    setPaidLoading(false);
  }, [request?.[0]?.requestStatus]);

  React.useEffect(() => {
    if (+state?.prefferedPayment === 0) {
      const types = Object.keys(Constants.PaymentType).map((key) =>
        key.replaceAll(" ", "_").toLowerCase()
      );
      types.map(async (type) =>
        payemntDetials(
          type,
          state?.orderType === "buy" ? state?.requestuid : state?.uid,
          true,
          true
        )
      );
    } else {
      payemntDetials(
        state?.prefferedPayment as string,
        state?.orderType === "buy" ? state?.requestuid : state?.uid,
        false,
        true
      );
    }
  }, []);

  return (
    <Mui.Container maxWidth="lg" sx={{ px: { xs: 0, sm: 1 } }}>
      <Components.Global.Container direction="column" spacing={2}>
        <Mui.Grid container spacing={2}>
          <Mui.Grid item xs={12}>
            <Mui.Stack
              alignItems="flex-start"
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
            >
              <Mui.Button
                startIcon={<MuiIcons.ArrowBackIos />}
                onClick={handleBack}
              >
                <Mui.Typography
                  variant="h5"
                  color="primary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {buyer ? "Buy" : "Sell"} {coin}
                </Mui.Typography>
              </Mui.Button>
              <Mui.Alert
                severity="warning"
                sx={{
                  display:
                    request?.[0]?.requestStatus === "pending" &&
                    state?.noOfCoins - (state?.tradedCoins || 0) <
                      state?.requestCoins
                      ? "flex"
                      : "none",
                }}
              >
                <Mui.Typography variant="body2">{`Advertiser now required ${
                  state?.noOfCoins - (state?.tradedCoins || 0)
                } coins. So that will be only executes`}</Mui.Typography>
              </Mui.Alert>
              <Mui.Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width={{ xs: "100%", md: "fit-content" }}
              >
                <Mui.Typography
                  variant="body2"
                  noWrap
                  textAlign="center"
                  fontWeight={900}
                >
                  <b>Order ID : </b> {state?.requestTradeId}
                </Mui.Typography>
                <Mui.IconButton
                  size="small"
                  onClick={() => contentCopy(state?.requestTradeId)}
                >
                  <MuiIcons.CopyAll fontSize="inherit" color="primary" />
                </Mui.IconButton>
              </Mui.Stack>
            </Mui.Stack>
          </Mui.Grid>
          <Mui.Grid item xs={12} md={6}>
            <Mui.Stack
              spacing={1}
              sx={{
                minHeight: "80vh",
              }}
            >
              <Mui.Card
                elevation={0}
                sx={{
                  border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  borderRadius: 2,
                }}
              >
                <Pages.P2P.Trade.Views.OrderDetails
                  buyer={buyer}
                  status={request?.[0]?.requestStatus || ""}
                  traderName={
                    state?.uid !== user?.uid
                      ? state?.username || ""
                      : state?.requestUname || ""
                  }
                  quantity={state?.requestCoins}
                  coin={state.coin}
                  currency={state?.currency}
                  fiatAmount={state?.requestCoins * state?.pricePerCoin}
                  completed={completed}
                  showPostTill={state?.showPostTill}
                  timer={
                    ["pending", "confirm", "confirmed"].includes(
                      request?.[0]?.requestStatus || ""
                    ) ? (
                      <Components.Global.Counter
                        setFrontendExpire={setFrontendExpire}
                        stop={false}
                        time={state?.requestPlacedTime as number}
                      />
                    ) : (
                      <></>
                    )
                  }
                />
              </Mui.Card>
              <Mui.Card
                elevation={0}
                sx={{
                  border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  borderRadius: 2,
                }}
              >
                {accepted || !buyer || completed || paid?.[0]?.paid ? (
                  <Pages.P2P.Trade.Views.PaymentDetails
                    accountHolderName={
                      state?.orderType === "buy"
                        ? state?.requestUname
                        : state?.username
                    }
                    payment={payment}
                  />
                ) : (
                  <Mui.Typography
                    variant="h5"
                    sx={{
                      color: Mui.colors.grey[400],
                      textAlign: "center",
                      p: 5,
                    }}
                  >
                    Request not accepted yet
                  </Mui.Typography>
                )}
                <Mui.Stack spacing={2} component={Mui.CardContent}>
                  {state?.orderType === "sell" ||
                  accepted ||
                  paid?.[0]?.paid ? (
                    <>
                      <Mui.Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        sx={{
                          display:
                            accepted || paid?.[0]?.paid ? "flex" : "none",
                        }}
                      >
                        {paid?.[0]?.paid ? (
                          <Mui.Stack spacing={1}>
                            <Mui.Typography variant="h6">
                              Payment Receipt
                            </Mui.Typography>
                            <Mui.CardMedia
                              onClick={handleView}
                              component="img"
                              src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                                import.meta.env.VITE_API_IP
                              }${import.meta.env.VITE_ASSETS_PATH}${
                                paid?.[0]?.image
                              }`}
                              sx={{
                                width: 150,
                                height: 100,
                                borderRadius: 2,
                              }}
                            />
                          </Mui.Stack>
                        ) : (
                          <Mui.Badge
                            component={Mui.IconButton}
                            disabled={completed || fileLoading || !accepted}
                            sx={{
                              bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                  ? undefined
                                  : Mui.colors.grey[100],
                              borderRadius: 2,
                              height: "fit-content",
                              display: buyer ? "flex" : "none",
                            }}
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            badgeContent={
                              link && (
                                <Mui.Box
                                  component="span"
                                  borderRadius={60}
                                  sx={{
                                    px: 1,
                                    borderRadius: 20,
                                    color: "#fff",
                                    bgcolor: (theme) =>
                                      theme.palette.success.main,
                                  }}
                                >
                                  <Mui.Typography
                                    variant="caption"
                                    color="inherit"
                                  >
                                    1
                                  </Mui.Typography>
                                </Mui.Box>
                              )
                            }
                          >
                            {fileLoading ? (
                              <Mui.CircularProgress size="small" />
                            ) : (
                              <Components.Global.FileWrapper
                                name="paymentReceipt"
                                onChange={handleBrowse}
                                disabled={completed || dispute}
                              >
                                <MuiIcons.FileUpload />
                                <Mui.Typography>Payment Proof</Mui.Typography>
                              </Components.Global.FileWrapper>
                            )}
                          </Mui.Badge>
                        )}
                      </Mui.Stack>
                      <Mui.Stack alignItems="center" width="100%">
                        {accepted || completed || paid?.[0]?.paid ? (
                          <Mui.Stack
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            width="100%"
                          >
                            <MuiLab.LoadingButton
                              loading={loading || paidLoading}
                              variant="contained"
                              color="success"
                              disabled={
                                completed ||
                                dispute ||
                                !Boolean(paid?.[0]?.paid)
                              }
                              onClick={() => {
                                setPaidLoading(true);
                                tradeConfirm(
                                  state,
                                  `${buyer ? state?.uid : state?.requestuid}_${
                                    state?.requestPlacedTime
                                  }`
                                );
                              }}
                              sx={{
                                width: "fit-content",
                                display: buyer ? "none" : "flex",
                                textTransform: "capitalize",
                              }}
                            >
                              Payment Received
                            </MuiLab.LoadingButton>
                            <MuiLab.LoadingButton
                              loading={loading}
                              variant="contained"
                              color="success"
                              disabled={
                                !Boolean(link) ||
                                Boolean(paid?.[0]?.paid) ||
                                completed ||
                                dispute
                              }
                              onClick={() => pay(state, { image: link || "" })}
                              sx={{
                                width: "fit-content",
                                textTransform: "capitalize",
                                display: buyer ? "flex" : "none",
                              }}
                            >
                              Make Payment
                            </MuiLab.LoadingButton>
                            <MuiLab.LoadingButton
                              loading={loading}
                              variant="contained"
                              color="error"
                              disabled={dispute || completed}
                              onClick={handleDialog}
                              sx={{
                                width: "fit-content",
                              }}
                            >
                              Raise Dispute
                            </MuiLab.LoadingButton>
                          </Mui.Stack>
                        ) : state?.noOfCoins - (state?.tradedCoins || 0) <
                          state?.requestCoins ? (
                          "The Requested quantity is greater than the remaining order quantity"
                        ) : (
                          <MuiLab.LoadingButton
                            loading={loading || paidLoading}
                            variant="contained"
                            color="success"
                            disabled={
                              completed ||
                              Boolean(requestTrades?.length) ||
                              state?.noOfCoins - (state?.tradedCoins || 0) <
                                state?.requestCoins
                            }
                            onClick={() => {
                              tradeAccept(
                                state,
                                `${buyer ? state?.uid : state?.requestuid}_${
                                  state?.requestPlacedTime
                                }`
                              );
                            }}
                            sx={{
                              width: "fit-content",
                              display: buyer ? "none" : "flex",
                              textTransform: "capitalize",
                            }}
                          >
                            {Boolean(requestTrades?.length)
                              ? "Other Request Inprogress"
                              : "Accept Request"}
                          </MuiLab.LoadingButton>
                        )}
                      </Mui.Stack>
                    </>
                  ) : state?.noOfCoins - (state?.tradedCoins || 0) <
                    state?.requestCoins ? (
                    "The Requested quantity is greater than the remaining order quantity"
                  ) : (
                    <Mui.Stack alignItems="center">
                      {buyer ? (
                        <MuiLab.LoadingButton
                          loading={loading || paidLoading}
                          variant="contained"
                          color="success"
                          disabled={
                            completed ||
                            Boolean(requestTrades?.length) ||
                            state?.noOfCoins - (state?.tradedCoins || 0) <
                              state?.requestCoins
                          }
                          onClick={() => {
                            tradeAccept(
                              state,
                              `${!buyer ? state?.uid : state?.requestuid}_${
                                state?.requestPlacedTime
                              }`
                            );
                          }}
                          sx={{
                            width: "fit-content",
                            display: "flex",
                            textTransform: "capitalize",
                          }}
                        >
                          {Boolean(requestTrades?.length)
                            ? "Other Request Inprogress"
                            : "Accept Request"}
                        </MuiLab.LoadingButton>
                      ) : (
                        <Mui.Typography
                          variant="h5"
                          sx={{
                            color: Mui.colors.grey[400],
                            textAlign: "center",
                            p: 5,
                          }}
                        >
                          Request not accepted yet
                        </Mui.Typography>
                      )}
                    </Mui.Stack>
                  )}
                </Mui.Stack>
              </Mui.Card>
            </Mui.Stack>
          </Mui.Grid>
          <Mui.Grid item xs={12} md={6} sx={{ minHeight: "100%" }}>
            {trades?.[0]?.tradeId ? (
              <Pages.P2P.Trade.Views.Messaging
                path={`users/${state?.requestuid}/p2p_trade_messages/${state?.tradeId}_${state?.requestPlacedTime}/messages`}
                completed={completed}
                dispute={dispute}
              />
            ) : (
              <Components.Global.GlobalLoader />
            )}
          </Mui.Grid>
        </Mui.Grid>
        {view && (
          <Components.Global.FullView
            onClick={handleView}
            src={`${import.meta.env.VITE_API_ENCRYPTION}://${
              import.meta.env.VITE_API_IP
            }${import.meta.env.VITE_ASSETS_PATH}${paid?.[0]?.image}`}
          />
        )}
      </Components.Global.Container>
      <DisputeConfirmation
        open={open}
        handleDialog={handleDialog}
        raiseDispute={raiseDispute}
      />
    </Mui.Container>
  );
};

const DisputeConfirmation = ({
  open,
  handleDialog,
  raiseDispute,
}: {
  open: boolean;
  handleDialog: () => void;
  raiseDispute: () => void;
}) => (
  <Components.Global.Dialog open={open} onClose={handleDialog} icon>
    <Mui.Stack
      component={Mui.DialogContent}
      alignItems="center"
      spacing={2}
      maxWidth={400}
    >
      <Mui.IconButton
        size="large"
        disableRipple
        sx={{
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <MuiIcons.Info fontSize="large" color="primary" />
      </Mui.IconButton>
      <Mui.Typography variant="h5" color="primary">
        Confirmation
      </Mui.Typography>
      <Mui.Typography variant="body1" textAlign="center">
        If you raise dispute Admin will connect to this conversation
      </Mui.Typography>
      <Mui.Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        // sx={{ minWidth: "100%" }}
      >
        <Mui.Button variant="contained" onClick={raiseDispute}>
          Confirm
        </Mui.Button>
        <Mui.Button variant="outlined" onClick={handleDialog}>
          Cancel
        </Mui.Button>
      </Mui.Stack>
    </Mui.Stack>
  </Components.Global.Dialog>
);
