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
  transactionFees: Yup.number()
    .typeError("Base currency should be number")
    .required("Base Currency Value is required"),
  quoteCurrency: Yup.string()
    .notOneOf(["Select Quote Currency"], "Quote Currency is required")
    .required("Quote Currency is required"),
  // markPrice: Yup.number()
  //   .typeError("Quote currency should be number")
  //   .required("Quote Currency Value is required"),
  coinStatus: Yup.string().required("Status is required"),
});

export const AddEdit = () => {
  const handler = Providers.useCustomHandler;
  const queryClient = Query.useQueryClient();
  const navigate = Router.useNavigate();
  const { currency } = Hooks.Main.useCurrency();
  const { pathname, state } = Router.useLocation() as {
    state: AddForm.coin;
    pathname: string;
  };

  const Submit = async (
    values: AddForm.Form,
    { setSubmitting }: Formik.FormikHelpers<AddForm.Form>
  ) => {
    await Api.Server.Request("updateP2PcoinPair", {
      coin: values.baseCurrency,
      currency: values.quoteCurrency,
      p2p_transactionFee: values.transactionFees,
      // p2p_markPrice: values.markPrice,
      p2p_active: values.coinStatus === "Active",
      is_p2pTrade: true,
    })
      .then((res) => {
        if (res?.error)
          handler({
            message: res?.message,
            variant: "error",
          });
        else {
          queryClient.invalidateQueries("p2pcoinList");
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
      <Mui.Stack component={Mui.DialogTitle}>
        <Mui.Typography variant="h5" align="center">
          {`${
            pathname.includes("add")
              ? "Add"
              : `Edit ${state.coin}/${state.currency_id}`
          } P2P Trade Pair`}
        </Mui.Typography>
      </Mui.Stack>
      <Mui.Stack component={Mui.DialogContent}>
        <Formik.Formik
          initialValues={
            pathname.includes("add")
              ? {
                  baseCurrency: "Select Base Currency",
                  quoteCurrency: "Select Quote Currency",
                  transactionFees: "" as unknown as number,
                  // markPrice: "" as unknown as number,
                  coinStatus: "Active",
                }
              : {
                  baseCurrency: state.coin,
                  quoteCurrency: state.currency_id,
                  transactionFees: state.p2p_transactionFee,
                  // markPrice: state.p2p_markPrice,
                  coinStatus: state.p2p_active ? "Active" : "Deactive",
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

                <Mui.Grid item xs={12}>
                  <Components.Form.AmountField
                    size="small"
                    name="transactionFees"
                    label="Transaction Fees (%)"
                  />
                </Mui.Grid>

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
                    name="markPrice"
                    label="Mark price"
                  />
                </Mui.Grid> */}

                <Mui.Grid item xs={12}>
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
                    variant="outlined"
                    sx={{ mr: 2 }}
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
    transactionFees: number;
    quoteCurrency: string;
    // markPrice: number;
    coinStatus: string;
  }

  export interface coin {
    coin: string;
    currency_id: string;
    p2p_active: number;
    // p2p_markPrice: number;
    p2p_transactionFee: number;
  }
}

