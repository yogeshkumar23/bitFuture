import * as Mui from "@mui/material";
import * as Formik from "formik";
import React from "react";
import * as Router from "react-router-dom";
import * as Yup from "yup";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Validations from "src/app/validations";

const getDefaultDate = () => {
  const d = new Date();
  d.setTime(d.getTime() + 1 * 60 * 60 * 1000);
  return d;
};

export const Main = ({
  p2pCoins,
  p2pCurrency,
  user,
  coinWalletDetails,
  pairs,
}: {
  p2pCoins: string[];
  p2pCurrency: string[];
  user: Hooks.User.UseUser.User;
  coinWalletDetails: Hooks.User.coinsWallet[];
  pairs: Hooks.Main.UseP2PCoinList.coinsList[];
}) => {
  const navigate = Router.useNavigate();
  const [next, setNext] = React.useState(false);
  const { verified } = Hooks.User.useUserKYC(false);
  // const balance = state?.filter(({ type }) => type === "AMOUNT");

  const balanecValidation = Yup.object().shape({
    noOfCoins: Yup.number()
      .typeError("Must be number")
      .notOneOf([0, undefined], "No Quantity provided")
      .when(
        "currency",
        (currency: string, field: Yup.NumberSchema<number | undefined>) =>
          field.when(
            "coin",
            (coin: string, field: Yup.NumberSchema<number | undefined>) =>
              field.when(
                "orderType",
                (
                  orderType: string,
                  field: Yup.NumberSchema<number | undefined>
                ) => {
                  const currentBalance = coinWalletDetails?.find(
                    ({ typeId }) => typeId === coin
                  ) || { balance: 0, freeze: 0, current_price: 0 };
                  return orderType === "sell"
                    ? field.max(
                      currentBalance.balance -
                      Math.abs(currentBalance.freeze),
                      "Insufficient Balance"
                    )
                    : field;
                }
              )
          )
      ),
    quantityLimitFrom: Yup.number()
      .typeError("Must be number")
      .notOneOf([0, undefined], "No Quantity from limit  provided")
      .max(
        Yup.ref("quantityLimitTo"),
        "Minimum quantity exceeded from maximum quantity"
      ),
    quantityLimitTo: Yup.number()
      .typeError("Must be number")
      .notOneOf([0, undefined], "No Quantity to limit provided")
      .max(
        Yup.ref("noOfCoins"),
        "Maximum quantity exceeded from provided quantity"
      ),
  });
  const { trade } = Hooks.Main.useP2PTrade(user?.uid as string);
  const Submit = async (
    {
      coin,
      currency,
      orderType,
      prefferedPayment,
      showPostTill,
      priceLimitFrom,
      priceLimitTo,
      quantityLimitFrom,
      quantityLimitTo,
      pricePerCoin,
      noOfCoins,
      coinMarketPrice,
    }: Omit<
      p2pTrade,
      "active" | "status" | "tradeId" | "uid" | "orderPlacedTime"
    > & {
      termsOfService?: boolean;
    },
    {
      setSubmitting,
      resetForm,
    }: Formik.FormikHelpers<
      Omit<
        p2pTrade,
        "active" | "status" | "tradeId" | "uid" | "orderPlacedTime"
      >
    > & {
      termsOfService?: boolean;
    }
  ) => {
    if (next) {
      const newOrder: p2pTrade = {
        coin,
        currency,
        orderType,
        prefferedPayment,
        quantityLimitFrom: +quantityLimitFrom,
        quantityLimitTo: +quantityLimitTo,
        priceLimitFrom: +priceLimitFrom,
        priceLimitTo: +priceLimitTo,
        pricePerCoin: +pricePerCoin,
        noOfCoins: +noOfCoins,
        coinMarketPrice: +coinMarketPrice,
        active: 1,
        showPostTill: new Date(showPostTill).getTime(),
        status: "pending",
        uid: user?.uid as string,
        profileImg: user?.profileImage as string,
        userName: `${user?.firstName} ${user?.lastName}`,
        email: user?.email || "",
        phoneNo: user?.phoneNumber || "",
        orderPlacedTime: new Date().getTime(),
      };
      await trade(newOrder);
      navigate(-1);
      setSubmitting(false);
      resetForm();
    } else setNext(true);
  };

  return (
    <Components.Global.Dialog icon>
      <Mui.DialogTitle>
        <Mui.Typography variant="h5">Post New Order</Mui.Typography>
        {/* <Mui.Typography color="warning.main" marginTop={1} marginBottom={1}>
          Wallet:{" "}
          {balance?.map((wallet, index, a) => (
            <>
              <Components.Global.Format
                key={index}
                type="coin"
                number={wallet.balance}
                coin={wallet.typeId}
              />
              {index + 1 === a.length ? "" : ", "}
            </>
          ))}
        </Mui.Typography> */}
        <Mui.Divider />
      </Mui.DialogTitle>
      <Mui.DialogContent>
        <Formik.Formik<any>
          initialValues={{
            coin: "0",
            coinMarketPrice: "" as unknown as number,
            currency: "0",
            noOfCoins: "" as unknown as number,
            quantityLimitFrom: "" as unknown as number,
            quantityLimitTo: "" as unknown as number,
            orderType: "buy",
            prefferedPayment: "-1",
            priceLimitFrom: "" as unknown as number,
            priceLimitTo: "" as unknown as number,
            pricePerCoin: "" as unknown as number,
            showPostTill: getDefaultDate(),
            termsOfService: false,
          }}
          validationSchema={Validations.newOrder.concat(balanecValidation)}
          onSubmit={Submit}
        >
          {({
            values: {
              termsOfService,
              showPostTill,
              prefferedPayment,
              ...values
            },
            setFieldValue,
          }) => (
            <Formik.Form>
              {next ? (
                <>
                  <Mui.Grid container spacing={2} sx={{ p: 2 }}>
                    {Object.entries(values)
                      .filter(([key]) =>
                        values["orderType"] === "buy"
                          ? ![
                            "bank_transfer$account_no",
                            "bank_transfer$account_name",
                            "bank_transfer$bank_address",
                            "bank_transfer$ifsc_code",
                            "bank_transfer$sort_code",
                            "bank_transfer$routing_number",
                            "upi$upi_id",
                            "interac$email",
                            "interac$mobile_no",
                            "zelle$email",
                            "zelle$mobile_no",
                            "m-pesa$name",
                            "m-pesa$mobile_no",
                            "mtn_mobile_money$name",
                            "mtn_mobile_money$mobile_no",
                            "cash_app$cash_tag_id",
                          ].includes(key)
                          : true
                      )
                      .map(([key, value], index) => {
                        let title =
                          key.replace("$", " : ").replaceAll("_", " ") || "";
                        title.match(/[A-Z]/g)?.forEach((v) => {
                          title = title.replace(v, ` ${v}`).trim();
                        });
                        return value ? (
                          <Mui.Grid
                            item
                            key={index}
                            xs={12}
                            textTransform="capitalize"
                          >
                            <Components.Global.StackLabel
                              direction="row"
                              medium
                              title={title}
                              titleColor={
                                Boolean(value) ? undefined : "error.main"
                              }
                              label={
                                (value as string) || (
                                  <Mui.Typography
                                    variant="inherit"
                                    color="error.main"
                                    fontWeight="bold"
                                  >
                                    Required
                                  </Mui.Typography>
                                )
                              }
                              node
                            />
                          </Mui.Grid>
                        ) : (
                          <></>
                        );
                      })}
                    <Mui.Grid item xs={12}>
                      <Components.Global.StackLabel
                        direction="row"
                        medium
                        title="Preferred Payment"
                        label={
                          +prefferedPayment === 0
                            ? "All Payments"
                            : prefferedPayment
                        }
                        node
                      />
                    </Mui.Grid>
                    <Mui.Grid item xs={12}>
                      <Components.Global.StackLabel
                        direction="row"
                        medium
                        title="Show Post Till"
                        label={showPostTill}
                        time
                      />
                    </Mui.Grid>
                    <Mui.Grid item xs={12}>
                      <Mui.Alert
                        severity="error"
                        sx={{
                          display:
                            values["orderType"] === "sell" &&
                              Object.values(values).filter(Boolean).length < 8
                              ? "flex"
                              : "none",
                        }}
                      >
                        <Mui.Typography variant="body2">
                          Payment detail not updated. Please update.
                        </Mui.Typography>
                      </Mui.Alert>
                    </Mui.Grid>
                  </Mui.Grid>
                  <Mui.Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    pt={2}
                  >
                    <Mui.Button
                      variant="contained"
                      sx={{ height: "fit-content" }}
                      onClick={() => {
                        setNext(false);
                        setFieldValue("termsOfService", false);
                      }}
                    >
                      Back
                    </Mui.Button>
                    <Components.Form.SubmitButton
                      sx={{
                        marginTop: 2,
                        maxWidth: 100,
                        display:
                          values["orderType"] === "sell" &&
                            Object.values(values).filter(Boolean).length < 8
                            ? "none"
                            : "flex",
                      }}
                    >
                      Post Order
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
                          values["orderType"] === "sell" &&
                            Object.values(values).filter(Boolean).length < 8
                            ? "flex"
                            : "none",
                      }}
                    >
                      Update Payment Details
                    </Mui.Button>
                  </Mui.Stack>
                </>
              ) : (
                <Pages.P2P.Dialogs.NewOrder.Views.Content
                  verified={verified}
                  uid={user?.uid as string}
                  coinWalletDetails={coinWalletDetails}
                  p2pCoins={p2pCoins}
                  p2pCurrency={p2pCurrency}
                  pairs={pairs}
                />
              )}
            </Formik.Form>
          )}
        </Formik.Formik>
      </Mui.DialogContent>
    </Components.Global.Dialog>
  );
};
