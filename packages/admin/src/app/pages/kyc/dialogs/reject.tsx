import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Query from "react-query";
import * as Router from "react-router-dom";
import * as Yup from "yup";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Providers from "src/app/providers";
import * as Hooks from "src/app/hooks";

const validateViewKyc = Yup.object().shape({
  reason: Yup.string().required("No Reason provided"),
});

export const Reject = () => {
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const queryClient = Query.useQueryClient();
  const { state } = Router.useLocation() as {
    state: Hooks.Admin.useUserKyc.kyc;
  };

  const handleSubmit = (
    values: rejectKYC,
    { setSubmitting }: Formik.FormikHelpers<rejectKYC>
  ) => {
    Api.Server.Request("updateUserKycStatus", {
      uid: state.uid,
      idProof_verified: false,
      addressProof_verified: false,
      reason: values.reason,
    })
      .then((res) => {
        if (!res.error) {
          handler({
            message: res?.message,
            variant: "success",
          });
          queryClient.invalidateQueries("userKYC");
          navigate("../../");
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
    <Components.Global.Dialog fullScreen={false} icon>
      <Formik.Formik
        initialValues={{
          reason: "",
        }}
        validationSchema={validateViewKyc}
        onSubmit={handleSubmit}
      >
        <Formik.Form>
          <Mui.DialogTitle sx={{ m: 3 }}>
            <Mui.Typography variant="h5" textAlign="center">
              {`${state?.firstName} ${state?.lastName}`} KYC Request
            </Mui.Typography>
          </Mui.DialogTitle>
          <Mui.DialogContent>
            <Mui.Stack spacing={3} width={500}>
              <Components.Form.FormField
                label="Reject Reason"
                name="reason"
                type="text"
                multiline
                fullWidth
                minRows={3}
              />
              <Components.Form.SubmitButton
                color="error"
                sx={{ width: "fit-content", alignSelf: "flex-end" }}
              >
                Confirm Reject
              </Components.Form.SubmitButton>
            </Mui.Stack>
          </Mui.DialogContent>
        </Formik.Form>
      </Formik.Formik>
    </Components.Global.Dialog>
  );
};

interface rejectKYC {
  reason: string;
}
