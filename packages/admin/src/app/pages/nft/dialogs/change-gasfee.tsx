import * as Formik from "formik";
import * as Router from "react-router-dom";
import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const ChangeGasFee = () => {
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const { gasFee, changeGasFee } = Hooks.Main.useNFT();

  const Submit = async (
    { price }: { price: string },
    { setSubmitting }: Formik.FormikHelpers<{ price: string }>
  ) => {
    try {
      await changeGasFee(price);
      handler({ message: "GasFee updated", variant: "success" });
    } catch (_) {
      handler({
        message: "GasFee not updated, Please make sure admin account",
        variant: "error",
      });
    } finally {
      setSubmitting(false);
      navigate("..");
    }
  };

  return (
    <Components.Global.Dialog icon>
      <Mui.DialogTitle>
        <Mui.Typography variant="h5">Change GasFee</Mui.Typography>
        <Mui.Divider sx={{ mt: 1 }} />
      </Mui.DialogTitle>
      <Mui.Stack spacing={3} component={Mui.DialogContent} alignItems="center">
        <Formik.Formik initialValues={{ price: gasFee }} onSubmit={Submit}>
          {() => (
            <Mui.Stack spacing={2} component={Formik.Form}>
              <Components.Form.AmountField
                size="small"
                name="price"
                label="Gas Fee"
                helperText={`Current price : ${gasFee}`}
              />
              <Components.Form.SubmitButton
                variant="contained"
                sx={{ width: "fit-content", mr: 2 }}
              >
                Save
              </Components.Form.SubmitButton>
            </Mui.Stack>
          )}
        </Formik.Formik>
      </Mui.Stack>
    </Components.Global.Dialog>
  );
};
