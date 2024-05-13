import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Content = ({
  coinWalletDetails,
  uid,
  verified,
  p2pCoins,
  p2pCurrency,
  pairs,
}: {
  coinWalletDetails: Hooks.User.coinsWallet[];
  uid: string;
  verified: boolean;
  p2pCoins: string[];
  p2pCurrency: string[];
  pairs: Hooks.Main.UseP2PCoinList.coinsList[];
}) => {
  const [paymentOptions, setPaymentOptions] = React.useState<{
    [key: string]: boolean;
  }>({ 0: false });
  const { get } = Hooks.Firebase.useFirestore();
  const { values, setFieldValue, setValues, setFieldError } =
    Formik.useFormikContext<{
      [key: string]: string;
    }>();
  const coinDetail = React.useMemo(
    () =>
      coinWalletDetails?.find((coin) => coin.coin === values["coin"]) || {
        balance: 0,
        freeze: 0,
        current_price: 0,
        coinName: "",
      },
    [values["coin"], values["currency"]]
  );
  const { coinPriceDetail } = Hooks.Main.useCoinPrice(
    coinDetail?.coinName,
    values["currency"]
  );
  const currencyDetail = React.useMemo(
    () =>
      coinWalletDetails?.find(
        (coin) =>
          coin.coin === values["coin"] && coin.currency === values["currency"]
      ) || {
        balance: 0,
        freeze: 0,
        current_price: 0,
      },
    [values["coin"], values["currency"]]
  );

  React.useEffect(() => {
    // setFieldValue(
    //   "coinMarketPrice",
    //   coinPriceDetail?.price?.toFixed(4) ||
    //     currencyDetail?.current_price?.toFixed(4)
    // );
    if (!Boolean(+values["noOfCoins"])) {
      if (values["orderType"] === "sell") {
        setFieldValue(
          "noOfCoins",
          coinDetail?.balance - Math.abs(coinDetail?.freeze)
        );
        setFieldValue(
          "quantityLimitTo",
          coinDetail?.balance - Math.abs(coinDetail?.freeze)
        );
      } else {
        setFieldValue("noOfCoins", "");
        setFieldValue("quantityLimitTo", "");
      }
    } else {
      setFieldValue("noOfCoins", "");
      setFieldValue("quantityLimitTo", "");
    }
  }, [values["coin"], values["orderType"]]);

  React.useEffect(() => {
    if (+values["prefferedPayment"] === 0) {
      const types = Object.keys(Constants.PaymentType).map((key) =>
        key.replaceAll(" ", "_").toLowerCase()
      );
      types.map((type) =>
        get(`users/${uid}/payment_details`, type).then((res) =>
          setValues((prevValues) => ({
            ...prevValues,
            ...res.data(),
          }))
        )
      );
    } else {
      get(
        `users/${uid}/payment_details`,
        values["prefferedPayment"]?.replaceAll(" ", "_").toLowerCase()
      ).then((res) => {
        setValues({
          ...Object.assign(
            {},
            ...Object.entries(values)
              .filter(([key]) =>
                [
                  "coin",
                  "coinMarketPrice",
                  "currency",
                  "noOfCoins",
                  "orderType",
                  "prefferedPayment",
                  "quantityLimitFrom",
                  "quantityLimitTo",
                  "priceLimitFrom",
                  "priceLimitTo",
                  "pricePerCoin",
                  "showPostTill",
                  "termsOfService",
                ].includes(key)
              )
              .map(([key, value]) => ({ [key]: value }))
          ),
          ...res.data(),
        });
      });
    }
  }, [values["prefferedPayment"]]);

  React.useEffect(() => {
    if (uid) {
      const types = Object.keys(Constants.PaymentType);
      types.map((type) => {
        get(
          `users/${uid}/payment_details`,
          type.replaceAll(" ", "_").toLowerCase()
        ).then((res) => {
          const values = res.data();
          setPaymentOptions((prevValues) => ({
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
  }, [uid]);

  return (
    <>
      <Pages.P2P.Dialogs.NewOrder.Views.OrderType name="orderType" />
      <Mui.Stack direction="row" marginTop={2}>
        <Mui.Grid container spacing={2}>
          <Mui.Grid item xs={12} sm={3}>
            <Components.Form.SelectField
              size="small"
              name="coin"
              label="Choose Asset"
              defaultValue={0}
            >
              <Mui.MenuItem disabled value={0}>
                <Mui.Typography variant="body1" color="text.secondary">
                  Choose
                </Mui.Typography>
              </Mui.MenuItem>
              {p2pCoins.map((coin, index) => (
                <Mui.MenuItem value={coin} key={index}>
                  {coin}
                </Mui.MenuItem>
              ))}
            </Components.Form.SelectField>
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={3}>
            <Components.Form.SelectField
              size="small"
              name="currency"
              label="For currency"
              defaultValue={0}
            >
              <Mui.MenuItem disabled value={0}>
                <Mui.Typography variant="body1" color="text.secondary">
                  Choose
                </Mui.Typography>
              </Mui.MenuItem>
              {pairs
                ?.filter(({ coin }) => coin === values["coin"])
                ?.map(({ currency_id }, index) => (
                  <Mui.MenuItem value={currency_id} key={index}>
                    {currency_id}
                  </Mui.MenuItem>
                ))}
            </Components.Form.SelectField>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Stack>

      <Mui.Grid container spacing={2} marginTop={1}>
        <Mui.Grid item xs={12} sm={6}>
          <Components.Form.AmountField
            label="Quantity"
            name="noOfCoins"
            InputProps={{
              endAdornment: (
                <Mui.InputAdornment position="end">
                  <Mui.Typography
                    variant="caption"
                    color="primary"
                    fontWeight="bold"
                  >
                    {values["coin"] === "0" ? null : values["coin"]}
                  </Mui.Typography>
                </Mui.InputAdornment>
              ),
            }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Components.Form.AmountField
            label={`Per ${
              values["currency"] === "0" ? "Currency" : values["currency"]
            } Price`}
            name="pricePerCoin"
            InputProps={{
              endAdornment: (
                <Mui.InputAdornment position="end">
                  <Mui.Typography
                    variant="caption"
                    color="primary"
                    fontWeight="bold"
                  >
                    {values["currency"] === "0" ? null : values["currency"]}
                  </Mui.Typography>
                </Mui.InputAdornment>
              ),
            }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Stack direction="row" spacing={2}>
            <Components.Form.AmountField
              label="Quantity Limit From"
              name="quantityLimitFrom"
            />
          </Mui.Stack>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Stack direction="row" spacing={2}>
            <Components.Form.AmountField
              label="Quantity Limit To"
              name="quantityLimitTo"
            />
          </Mui.Stack>
        </Mui.Grid>
        {/* <Mui.Grid item xs={12} sm={6}>
          <Components.Form.AmountField
            disabled
            label={`Current Market P  rice(per ${
              values["currency"] === "0" ? null : values["currency"]
            })`}
            name="coinMarketPrice"
            InputProps={{
              endAdornment: (
                <Mui.InputAdornment position="end">
                  <Mui.Typography
                    variant="caption"
                    color="primary"
                    fontWeight="bold"
                  >
                    {values["currency"] === "0" ? null : values["currency"]}
                  </Mui.Typography>
                </Mui.InputAdornment>
              ),
            }}
          />
        </Mui.Grid> */}
        {/* <Mui.Grid item xs={12} sm={6}>
          <Mui.Stack direction="row" spacing={2}>
            <Components.Form.AmountField
              label="Price Limit From"
              name="priceLimitFrom"
            />
            <Components.Form.AmountField
              label="Price Limit To"
              name="priceLimitTo"
            />
          </Mui.Stack>
        </Mui.Grid> */}
        <Mui.Grid item xs={12} sm={6}>
          <Components.Form.DateTimePicker
            size="small"
            name="showPostTill"
            label="Show Post Till"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Components.Form.SelectField
            size="small"
            name="prefferedPayment"
            label="Preferred Payments"
            defaultValue={0}
            sx={{
              minWidth: { md: 200 },
              "& .MuiListItemIcon-root": {
                display: "none",
              },
            }}
          >
            <Mui.MenuItem value={-1} disabled>
              Select Payment
            </Mui.MenuItem>
            <Mui.MenuItem
              value={0}
              disabled={
                values["orderType"] === "buy"
                  ? false
                  : !Boolean(paymentOptions[0])
              }
            >
              All Payments
            </Mui.MenuItem>
            {Object.entries(Constants.PaymentType).map(
              ([key, value], index) => (
                <Mui.MenuItem
                  value={key}
                  key={index}
                  disabled={
                    values["orderType"] === "buy"
                      ? false
                      : !Boolean(paymentOptions[key])
                  }
                >
                  <Mui.ListItemIcon>
                    <Mui.CardMedia
                      component="img"
                      src={value}
                      sx={{ height: 25, width: 25 }}
                    />
                  </Mui.ListItemIcon>
                  {`${key} ${
                    !Boolean(paymentOptions[key]) &&
                    values["orderType"] === "sell"
                      ? "(Detail required)"
                      : ""
                  }`}
                </Mui.MenuItem>
              )
            )}
          </Components.Form.SelectField>
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Components.Form.CheckBox
            label={
              <Mui.Typography variant="inherit">
                I agree to Escrow my assets and accept the{" "}
                <Mui.Link
                  component={Router.Link}
                  target="_blank"
                  to={`${Constants.API_CONFIG.base}terms-of-service`}
                >
                  Terms & Conditions
                </Mui.Link>
              </Mui.Typography>
            }
            name="termsOfService"
          />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Stack direction="row" spacing={2}>
        {verified ? (
          <Mui.Button variant="contained" type="submit">
            Next
          </Mui.Button>
        ) : (
          <Mui.Button
            component={Router.Link}
            to={`${Constants.API_CONFIG.base}kyc/warning`}
            variant="contained"
          >
            Next
          </Mui.Button>
        )}
      </Mui.Stack>
    </>
  );
};
