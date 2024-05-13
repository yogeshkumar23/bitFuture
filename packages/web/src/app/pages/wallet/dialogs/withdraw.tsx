import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as ReactQuery from "react-query";
import * as Formik from "formik";
import * as Yup from "yup";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Providers from "src/app/providers";

export const Withdraw = () => {
  const { state } = Router.useLocation() as {
    state: Hooks.User.coinsWallet;
  };
  const queryClient = ReactQuery.useQueryClient();
  const navigate = Router.useNavigate();
  const handler = Providers.useCustomHandler;
  const { verified } = Hooks.User.useUserKYC(false);
  const { chains, loading } = Hooks.User.useCoinChains(state?.typeId);
  const validateWithdraw = Yup.object().shape({
    blockChain: Yup.string()
      .notOneOf(["0"], "Please choose blockchain")
      .required("Blockchain is required"),
    amount: Yup.number()
      .max(state?.balance - Math.abs(state?.freeze), "Insufficient Balance")
      .when(
        "blockChain",
        (blockChain: string, field: Yup.NumberSchema<number | undefined>) => {
          const selectedChain = chains?.chainList?.find(
            (chain) => chain.chainName === blockChain
          );
          return selectedChain
            ? field.min(
                selectedChain?.withdrawalMinSize,
                `Minimum withdraw amount is ${selectedChain?.withdrawalMinSize}`
              )
            : field;
        }
      ),
    toAddress: Yup.string().required("No Withdraw address provided"),
    finalWithdrawAmount: Yup.number(),
    otp: Yup.number()
      .min(6, "Minimum 6 digit needed")
      .typeError("Invalid OTP")
      .required("OTP required to transfer"),
  });
  const Submit = async (
    { amount, toAddress, otp, blockChain }: withdraw.Form,
    { setSubmitting }: Formik.FormikHelpers<withdraw.Form>
  ) => {
    await Api.Server.Request("cryptoPayout", {
      type: state?.type,
      coin: state.typeId,
      amount,
      network: blockChain,
      walletAddress: toAddress,
      otp,
    })
      .then((res) => {
        handler({
          message: res.error ? res.message : `Withdraw Successful`,
          variant: res.error
            ? res?.isPending
              ? "warning"
              : "error"
            : "success",
        });
        if (!res.error) {
          queryClient.invalidateQueries("userCoinWallet");
          setSubmitting(false);
          navigate("..");
        }
      })
      .catch(() => {
        handler({
          message: "Something went wrong, Please try again later",
          variant: "error",
        });
      });
  };

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : state ? (
    <Components.Global.Dialog icon>
      <Mui.DialogTitle>
        <Mui.Typography variant="h5">Withdraw</Mui.Typography>
        <Mui.Divider />
      </Mui.DialogTitle>
      <Mui.DialogContent>
        <Formik.Formik
          initialValues={{
            blockChain: "0",
            amount: "" as unknown as number,
            toAddress: "",
            finalWithdrawAmount: "" as unknown as number,
            otp: "",
          }}
          validationSchema={validateWithdraw}
          onSubmit={Submit}
        >
          {() => (
            <Formik.Form>
              <Components.Global.StackLabel
                direction="row"
                node
                medium
                title={`${state?.typeId} Balance`}
                label={
                  <Components.Global.Format
                    type="coin"
                    number={state?.balance - Math.abs(state?.freeze)}
                    coin={state?.typeId}
                  />
                }
              />
              <Pages.Wallet.Dialogs.Views.Withdraw
                chainList={chains?.chainList}
                verified={verified}
              />
            </Formik.Form>
          )}
        </Formik.Formik>
      </Mui.DialogContent>
    </Components.Global.Dialog>
  ) : (
    <Router.Navigate to=".." />
  );
};

export declare namespace withdraw {
  export interface Form {
    blockChain: string;
    amount: number;
    toAddress: string;
    finalWithdrawAmount: number;
    otp: string;
  }
}
