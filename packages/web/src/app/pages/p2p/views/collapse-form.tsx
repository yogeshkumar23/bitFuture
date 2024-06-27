import * as FirebaseFirestore from "firebase/firestore";
import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Yup from "yup";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";

export const CollapseForm = (
  props: p2pTrade & { coinWalletDetails: Hooks.User.coinsWallet[] }
) => {
  const {
    coin,
    currency,
    tradeId,
    orderType,
    pricePerCoin,
    uid,
    noOfCoins,
    tradedCoins,
    coinWalletDetails,
    quantityLimitFrom,
    prefferedPayment,
  } = props;
  const availableCoin = noOfCoins - (tradedCoins || 0);
  const navigate = Router.useNavigate();
  const { user } = React.useContext(Contexts.UserContext);
  const [paymentDetail, setPaymentDetail] = React.useState<{
    [key: string]: boolean;
  }>({ 0: false });
  const { get } = Hooks.Firebase.useFirestore();
  const { verified } = Hooks.User.useUserKYC(false);
  const { data: requestedTrades } =
    Hooks.Firebase.useFireSnapshot<p2pTradeRequest>(
      "collection",
      `users/${uid}/p2p_trades/${tradeId}/requests`
    ).collectionSnapshot([
      FirebaseFirestore.where("requestuid", "==", user?.uid as string),
    ]);

  const { init, tradeRequest } = Hooks.Main.useP2PTrade(user?.uid as string);

  const coinBalance = (() => {
    const walletBalance = coinWalletDetails?.find(
      (wallet) => wallet.coin === coin
    );
    return walletBalance
      ? walletBalance?.balance - Math.abs(walletBalance?.freeze)
      : 0;
  })();

  const validateCoin = Yup.object().shape({
    requestCoins: Yup.number()
      .typeError("Must br number")
      // .min(quantityLimitFrom, "Must be equal to minimum quantity")
      .min(
        quantityLimitFrom > availableCoin ? 0.000001 : quantityLimitFrom,
        "Must be equal to minimum quantity"
      )
      .notOneOf([0, undefined], "Please provided no of coins")
      .max(
        availableCoin < coinBalance || orderType === "sell"
          ? availableCoin
          : coinBalance,
        availableCoin < coinBalance || orderType === "sell"
          ? "Invalid Quantity"
          : "Insufficient Balance"
      ),
  });

  const completed = React.useMemo(
    () =>
      Boolean(requestedTrades?.[0]?.requestCoins) &&
      requestedTrades?.map(({ status }) => status).includes("confirm"),
    [requestedTrades?.[0]?.status]
  );

  const Submit = async (
    values: Pick<p2pTradeRequest, "requestCoins">,
    {
      setSubmitting,
    }: Formik.FormikHelpers<Pick<p2pTradeRequest, "requestCoins">>
  ) => {
    if (completed) {
      navigate(`${Constants.API_CONFIG.base}p2p/my-requests`);
    } else {
      const requestPlacedTime = new Date().getTime();
      const newTrade = {
        requestCoins: +values.requestCoins,
        requestTradeId: tradeId as string,
        requestPrice: pricePerCoin,
        requestPlacedTime,
        coin,
        currency,
        requestuid: user?.uid,
        requestProfileImg: user?.profileImage,
        requestUserName: `${user?.firstName} ${user?.lastName}`,
        requestEmail: user?.email || "",
        requestPhoneNo: user?.phoneNumber || "",
      };
      await init(user?.uid as string, uid, `${tradeId}_${requestPlacedTime}`);
      await tradeRequest(newTrade, uid, tradeId as string);
      navigate(`${Constants.API_CONFIG.base}p2p/my-requests`, {
        state: { ...props, ...values },
      });
    }
    setSubmitting(false);
  };

  React.useEffect(() => {
    if (user?.uid) {
      const types = Object.keys(Constants.PaymentType);
      types.map((type) => {
        get(
          `users/${user?.uid}/payment_details`,
          type.replaceAll(" ", "_").toLowerCase()
        ).then((res) => {
          const values = res.data();
          setPaymentDetail((prevValues) => ({
            ...prevValues,
            [type]: values
              ? Boolean(Object.values(values).filter(Boolean).length)
              : false,
            0:
              prevValues[0] ||
              (values
                ? Boolean(Object.values(values).filter(Boolean).length)
                : false),
          }));
        });
      });
    }
  }, [user?.uid]);

  return requestedTrades ? (
    <Formik.Formik
      initialValues={{
        requestCoins: completed
          ? requestedTrades?.find(
              ({ status }) => status === "confirm" || status === "paid"
            )?.requestCoins || ("" as unknown as number)
          : ("" as unknown as number),
      }}
      validationSchema={validateCoin}
      onSubmit={Submit}
    >
      {({ values }) => (
        <Mui.Stack component={Formik.Form} spacing={2}>
          <Components.Form.AmountField
            size="small"
            label={`I will ${orderType === "buy" ? "Sell" : "Buy"}`}
            name="requestCoins"
            disabled={completed}
            InputProps={{
              endAdornment: (
                <Mui.InputAdornment position="end">
                  <Mui.Typography
                    sx={{
                      p: 1,
                      mr: -1.6,
                      bgcolor:
                        orderType === "buy" ? "error.main" : "success.main",
                      color: "#fff",
                      borderRadius: 1,
                    }}
                    variant="body1"
                  >
                    ₮ {coin}
                  </Mui.Typography>
                </Mui.InputAdornment>
              ),
            }}
          />
          <Components.Global.StackLabel
            direction="row"
            medium
            title="Asset Amount:"
            label={`${values["requestCoins"]} ${coin}`}
            node
          />
          <Components.Global.StackLabel
            direction="row"
            medium
            title="Fiat Amount:"
            label={`${values["requestCoins"] * pricePerCoin} ${currency}`}
            node
          />
          {verified ? (
            <>
              <Components.Form.SubmitButton
                sx={{
                  width: "fit-content",
                  alignSelf: "flex-end",
                  display:
                    !paymentDetail[prefferedPayment] && orderType === "buy"
                      ? "none"
                      : "flex",
                }}
                variant="contained"
              >
                {completed ? "View Request" : "Trade Request"}
              </Components.Form.SubmitButton>
              <Mui.Button
                variant="contained"
                component={Router.Link}
                to={`${Constants.API_CONFIG.base}profile/payment-edit`}
                sx={{
                  alignSelf: "center",
                  marginTop: 2,
                  maxWidth: 200,
                  display:
                    !paymentDetail[prefferedPayment] && orderType === "buy"
                      ? "flex"
                      : "none",
                }}
              >
                Update Payment Details
              </Mui.Button>
            </>
          ) : (
            <Mui.Button
              component={Router.Link}
              to={`${Constants.API_CONFIG.base}kyc/warning`}
              size="small"
              variant="contained"
              sx={{ width: "fit-content", alignSelf: "flex-end" }}
            >
              Trade Request
            </Mui.Button>
          )}
        </Mui.Stack>
      )}
    </Formik.Formik>
  ) : (
    <Components.Global.GlobalLoader />
  );
};
