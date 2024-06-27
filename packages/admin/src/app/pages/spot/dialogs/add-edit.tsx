import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Query from "react-query";
import * as Router from "react-router-dom";
import * as Yup from "yup";
import * as Api from "src/api";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

const validateEditSpotPair = Yup.object().shape({
  baseCurrency: Yup.string()
    .notOneOf(["Select Base Currency"], "Base Currency is required")
    .required("Base Currency is required"),
  // baseCurrencyValue: Yup.number()
  //   .typeError("Base currency should be number")
  //   .required("Base Currency Value is required"),
  quoteCurrency: Yup.string()
    .notOneOf(["Select Quote Currency"], "Quote Currency is required")
    .required("Quote Currency is required"),
  // quoteCurrencyValue: Yup.number()
  //   .typeError("Quote currency should be number")
  //   .required("Quote Currency Value is required"),
  commission: Yup.number()
    .typeError("Commission should be number")
    .required("Commission is required"),
  coinStatus: Yup.string().required("Status is required"),
  botStatus: Yup.string(),
  buyerFee: Yup.number()
    .typeError("Buyer Fee should be number")
    .required("Buyer Fee is required"),
  sellerFee: Yup.number()
    .typeError("Seller Fee should be number")
    .required("Seller Fee is required"),
  // minimumPrice: Yup.number()
  //   .typeError("Minimum Price should be number")
  //   .required("Minimum Price is required"),
  // maximumPrice: Yup.number()
  //   .typeError("Maximum Price should be number")
  //   .required("Maximum Price is required"),
  // minimumQuantity: Yup.number()
  //   .typeError("Minimum Quantity should be number")
  //   .required("Minimum Quantity is required"),
  // maximumQuantity: Yup.number()
  //   .typeError("Maximum Quantity should be number")
  //   .required("Maximum Quantity is required"),
  marketPrice: Yup.number()
    .typeError("Market Price should be number")
    .required("Market Price is required"),
  // marketUp: Yup.number()
  //   .typeError("Market Up should be number")
  //   .required("Market Up is required"),
});

export const AddEditPair = () => {
  const handler = Providers.useCustomHandler;
  const queryClient = Query.useQueryClient();
  const navigate = Router.useNavigate();
  const { pathname, state } = Router.useLocation() as {
    state: AddForm.coin;
    pathname: string;
  };
  const { currency } = Hooks.Main.useCurrency();

  const Submit = async (
    values: AddForm.Form,
    { setSubmitting }: Formik.FormikHelpers<AddForm.Form>
  ) => {
    await Api.Server.Request(
      pathname.includes("add") ? "addCoinPair" : "updateCoinStatus",
      {
        coinId: state?.coinId,
        coin: values.baseCurrency,
        // coin_value: values.baseCurrencyValue,
        currency: values.quoteCurrency,
        // currency_value: values.quoteCurrencyValue,
        active: values.coinStatus === "Active",
        p2p_active: values.p2p_active === "Active",
        is_p2pTrade: values.p2p_active === "Active",
        commission: values.commission,
        bot_status: values.botStatus.toLowerCase(),
        buyer_fees: values.buyerFee,
        seller_fees: values.sellerFee,
        // minimum_price: values.minimumPrice,
        // maximum_price: values.maximumPrice,
        // minimum_quantity: values.minimumQuantity,
        // maximum_quantity: values.maximumQuantity,
        current_price: values.marketPrice,
        // market_up: values.marketUp,
      }
    )
      .then((res) => {
        if (res?.error)
          handler({
            message: res?.message,
            variant: "error",
          });
        else {
          queryClient.invalidateQueries("coins");
          handler({
            message: res?.message,
            variant: "success",
          });
          navigate("..");
        }
      })
      .catch((err) => {
        handler({
          message: err?.message,
          variant: "error",
        });
      });
    setSubmitting(false);
  };

  return (
    <Components.Global.Dialog icon>
      <Mui.DialogTitle>
        <Mui.Typography variant="h5">
          {`${
            pathname.includes("add")
              ? "Add"
              : `Edit ${state.coin}/${state.currency}`
          } Spot Pair`}
        </Mui.Typography>
        <Mui.Divider sx={{ mt: 1 }} />
      </Mui.DialogTitle>
      <Mui.Stack spacing={3} component={Mui.DialogContent} alignItems="center">
        <Formik.Formik
          initialValues={
            pathname.includes("add")
              ? {
                  baseCurrency: "Select Base Currency",
                  // baseCurrencyValue: "" as unknown as number,
                  quoteCurrency: "Select Quote Currency",
                  // quoteCurrencyValue: "" as unknown as number,
                  commission: "" as unknown as number,
                  coinStatus: "Active",
                  p2p_active: "Active",
                  botStatus: "Off",
                  buyerFee: "" as unknown as number,
                  sellerFee: "" as unknown as number,
                  // minimumPrice: "" as unknown as number,
                  // maximumPrice: "" as unknown as number,
                  // minimumQuantity: "" as unknown as number,
                  // maximumQuantity: "" as unknown as number,
                  marketPrice: "" as unknown as number,
                  // marketUp: "" as unknown as number,
                }
              : {
                  baseCurrency: state?.coin,
                  // baseCurrencyValue: state?.coin_value,
                  quoteCurrency: state?.currency,
                  // quoteCurrencyValue: state?.currency_value,
                  commission: state?.commission,
                  coinStatus: state?.active ? "Active" : "Deactive",
                  p2p_active: state?.p2p_active ? "Active" : "Deactive",
                  botStatus: state?.bot_status,
                  buyerFee: state?.buyer_fees,
                  sellerFee: state?.seller_fees,
                  // minimumPrice: state?.minimum_price,
                  // maximumPrice: state?.maximum_price,
                  // minimumQuantity: state?.minimum_quantity,
                  // maximumQuantity: state?.maximum_quantity,
                  marketPrice: state?.current_price,
                  // marketUp: state?.market_up,
                }
          }
          validationSchema={validateEditSpotPair}
          onSubmit={Submit}
        >
          {() => (
            <Formik.Form>
              <Mui.Grid container spacing={4}>
                {!pathname.includes("edit") && (
                  <Mui.Grid item xs={12} sm={6}>
                    <Components.Form.SelectField
                      disabled={pathname.includes("edit")}
                      size="small"
                      name="baseCurrency"
                      label="Base Currency"
                      defaultValue={0}
                    >
                      <Mui.MenuItem value={"Select Base Currency"} disabled>
                        Select Base Currency
                      </Mui.MenuItem>
                      {Constants.coinList.map((text, index) => (
                        <Mui.MenuItem value={text} key={index}>
                          {text}
                        </Mui.MenuItem>
                      ))}
                    </Components.Form.SelectField>
                  </Mui.Grid>
                )}

                {/* <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    size="small"
                    name="baseCurrencyValue"
                    label="Base Currency Value"
                  />
                </Mui.Grid> */}

                {!pathname.includes("edit") && (
                  <Mui.Grid item xs={12} sm={6}>
                    <Components.Form.SelectField
                      disabled={pathname.includes("edit")}
                      size="small"
                      name="quoteCurrency"
                      label="Quote Currency"
                      defaultValue={0}
                    >
                      <Mui.MenuItem value={"Select Quote Currency"} disabled>
                        Select Quote Currency
                      </Mui.MenuItem>
                      {currency?.currencyList?.map((text, index) => (
                        <Mui.MenuItem value={text.currency} key={index}>
                          {text.currency}
                        </Mui.MenuItem>
                      ))}
                    </Components.Form.SelectField>
                  </Mui.Grid>
                )}

                {/* <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="quoteCurrencyValue"
                    label="Quote Currency Value"
                  />
                </Mui.Grid> */}

                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.SelectField
                    size="small"
                    name="coinStatus"
                    label="Coin Status"
                    defaultValue={0}
                  >
                    {["Active", "Deactive"]?.map((text, index) => (
                      <Mui.MenuItem value={text} key={index}>
                        {text}
                      </Mui.MenuItem>
                    ))}
                  </Components.Form.SelectField>
                </Mui.Grid>
                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.SelectField
                    size="small"
                    name="p2p_active"
                    label="P2P Status"
                    defaultValue={0}
                  >
                    {["Active", "Deactive"]?.map((text, index) => (
                      <Mui.MenuItem value={text} key={index}>
                        {text}
                      </Mui.MenuItem>
                    ))}
                  </Components.Form.SelectField>
                </Mui.Grid>

                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="commission"
                    label="Commission"
                  />
                </Mui.Grid>

                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.SelectField
                    size="small"
                    name="botStatus"
                    label="Bot Status"
                    defaultValue="Off"
                  >
                    {["Binance", "Off"]?.map((text, index) => (
                      <Mui.MenuItem value={text.toLowerCase()} key={index}>
                        {text}
                      </Mui.MenuItem>
                    ))}
                  </Components.Form.SelectField>
                </Mui.Grid>

                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="buyerFee"
                    label="Buyer Fees (%)"
                  />
                </Mui.Grid>

                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="sellerFee"
                    label="Seller Fees (%)"
                  />
                </Mui.Grid>

                {/* <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="minimumPrice"
                    label="Minimum Price"
                  />
                </Mui.Grid>

                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="maximumPrice"
                    label="Maximum Price"
                  />
                </Mui.Grid>

                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="minimumQuantity"
                    label="Minimum Quantity"
                  />
                </Mui.Grid>

                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="maximumQuantity"
                    label="Maximum Quantity"
                  />
                </Mui.Grid> */}

                <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="marketPrice"
                    label="Market Price"
                  />
                </Mui.Grid>

                {/* <Mui.Grid item xs={12} sm={6}>
                  <Components.Form.AmountField
                    name="marketUp"
                    label="Market Up (%)"
                  />
                </Mui.Grid> */}

                <Mui.Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Components.Form.SubmitButton
                    size="small"
                    variant="contained"
                    sx={{ width: "fit-content", mr: 2 }}
                  >
                    Save
                  </Components.Form.SubmitButton>
                  <Mui.Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate("..")}
                  >
                    Close
                  </Mui.Button>
                </Mui.Grid>
              </Mui.Grid>
            </Formik.Form>
          )}
        </Formik.Formik>
      </Mui.Stack>
    </Components.Global.Dialog>
  );
};

export declare namespace AddForm {
  export interface Form {
    baseCurrency: string;
    // baseCurrencyValue: number;
    quoteCurrency: string;
    // quoteCurrencyValue: number;
    commission: number;
    coinStatus: string;
    p2p_active: string;
    botStatus: string;
    buyerFee: number;
    sellerFee: number;
    // minimumPrice: number;
    // maximumPrice: number;
    // minimumQuantity: number;
    // maximumQuantity: number;
    marketPrice: number;
    // marketUp: number;
  }

  export interface coin {
    coinId: string;
    coinName: string;
    coin: string;
    coinLogo: string;
    current_price: number;
    last_price: number;
    commission: number;
    fund_limit: number;
    currency_id: string;
    active: number;
    is_p2pTrade: number;
    p2p_active: number;
    created_At: string;
    updated_At: string;
    coin_value: number;
    bot_status: string;
    buyer_fees: number;
    seller_fees: number;
    minimum_price: number;
    maximum_price: number;
    minimum_quantity: number;
    maximum_quantity: number;
    market_up: number;
    currency_value: number;
    currencyId: number;
    currency_symbol: string;
    currency: string;
    currency_name: string;
  }
}
