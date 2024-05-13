import * as Mui from "@mui/material";
import * as Formik from "formik";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Validations from "src/app/validations";

export const Edit = () => {
  const navigate = Router.useNavigate();
  const [paymentOptions, setPaymentOptions] = React.useState<{
    [key: string]: boolean;
  }>({ 0: false });
  const { state } = Router.useLocation() as { state: { trade: p2pTrade } };
  const { user } = React.useContext(Contexts.UserContext);
  const { get } = Hooks.Firebase.useFirestore();
  const { edit } = Hooks.Main.useP2PTrade(user?.uid as string);
  const Submit = async (
    values: Pick<
      p2pTrade,
      | "noOfCoins"
      | "pricePerCoin"
      | "priceLimitFrom"
      | "priceLimitTo"
      | "prefferedPayment"
      | "showPostTill"
    >,
    {
      setSubmitting,
    }: Formik.FormikHelpers<
      Pick<
        p2pTrade,
        | "noOfCoins"
        | "pricePerCoin"
        | "priceLimitFrom"
        | "priceLimitTo"
        | "prefferedPayment"
        | "showPostTill"
      >
    >
  ) => {
    await edit(state?.trade?.tradeId as string, {
      ...values,
      priceLimitFrom: +values.priceLimitFrom,
      priceLimitTo: +values.priceLimitTo,
      pricePerCoin: +values.pricePerCoin,
      noOfCoins: +values.noOfCoins,
      showPostTill: new Date(values.showPostTill).getTime(),
    });
    setSubmitting(false);
    navigate("..");
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
  }, [user?.uid]);

  return (
    <Components.Global.Dialog icon>
      <Mui.DialogTitle>
        <Mui.Typography variant="h5">Edit My Order</Mui.Typography>
        <Mui.Divider sx={{ mt: 1 }} />
      </Mui.DialogTitle>
      <Mui.DialogContent>
        <Formik.Formik
          initialValues={{
            ...(state?.trade as Pick<
              p2pTrade,
              | "noOfCoins"
              | "pricePerCoin"
              | "priceLimitFrom"
              | "priceLimitTo"
              | "quantityLimitFrom"
              | "quantityLimitTo"
              | "prefferedPayment"
              | "showPostTill"
            >),
            showPostTill: new Date(state?.trade?.showPostTill) as any,
          }}
          validationSchema={Validations.editOrder}
          onSubmit={Submit}
        >
          {({ values }) => (
            <Formik.Form>
              <Mui.Grid container spacing={2}>
                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    label="Quantity"
                    name="noOfCoins"
                    disabled
                    InputProps={{
                      endAdornment: (
                        <Mui.InputAdornment position="end">
                          <Mui.Typography
                            variant="caption"
                            color="primary"
                            fontWeight="bold"
                          >
                            {state?.trade?.coin}
                          </Mui.Typography>
                        </Mui.InputAdornment>
                      ),
                    }}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    label="Per USDT Price"
                    name="pricePerCoin"
                    InputProps={{
                      endAdornment: (
                        <Mui.InputAdornment position="end">
                          <Mui.Typography
                            variant="caption"
                            color="primary"
                            fontWeight="bold"
                          >
                            {state?.trade?.currency}
                          </Mui.Typography>
                        </Mui.InputAdornment>
                      ),
                    }}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    label="Quantity Limit From"
                    name="quantityLimitFrom"
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    label="Quantity Limit To"
                    name="quantityLimitTo"
                  />
                </Mui.Grid>
                {/* <Mui.Grid item xs={12} sm={3}>
                  <Components.Form.AmountField
                    label="Price Limit From"
                    name="priceLimitFrom"
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sm={3}>
                  <Components.Form.AmountField
                    label="Price Limit To"
                    name="priceLimitTo"
                  />
                </Mui.Grid> */}
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
                        state?.trade?.orderType === "buy"
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
                            state?.trade?.orderType === "buy"
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
                            state?.trade?.orderType === "sell"
                              ? "(Detail required)"
                              : ""
                          }`}
                        </Mui.MenuItem>
                      )
                    )}
                  </Components.Form.SelectField>
                </Mui.Grid>
                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.DateTimePicker
                    size="small"
                    name="showPostTill"
                    label="Show Post Till"
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12}>
                  <Components.Form.SubmitButton sx={{ mr: 2, maxWidth: 150 }}>
                    Save Changes
                  </Components.Form.SubmitButton>
                  <Mui.Button
                    sx={{ maxWidth: 200 }}
                    variant="outlined"
                    component={Router.Link}
                    to=".."
                  >
                    Discard
                  </Mui.Button>
                </Mui.Grid>
              </Mui.Grid>
            </Formik.Form>
          )}
        </Formik.Formik>
      </Mui.DialogContent>
    </Components.Global.Dialog>
  );
};
