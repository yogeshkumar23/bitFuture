import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Query from "react-query";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Providers from "src/app/providers";

export const Details = () => {
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const queryClient = Query.useQueryClient();

  const { state } = Router.useLocation() as {
    state: Hooks.Admin.useUserKyc.kyc;
  };

  const handleAcceptDocument = () => {
    Api.Server.Request("updateUserKycStatus", {
      uid: state.uid,
      idProof_verified: true,
      addressProof_verified: true,
      reason: "",
    })
      .then((res) => {
        if (!res.error) {
          handler({
            message: res?.message,
            variant: "success",
          });
          queryClient.invalidateQueries("userKYC");
          navigate("..");
        }
      })
      .catch((err) =>
        handler({
          message: err?.message,
          variant: "error",
        })
      );
  };

  const handleRejectDocument = () => navigate("reject", { state });

  return (
    <>
      <Components.Global.Dialog open={true} fullScreen={true} icon>
        <Mui.DialogTitle>
          <Mui.Typography variant="h5">{`${state.firstName} ${state.lastName}`}</Mui.Typography>
        </Mui.DialogTitle>
        <Formik.Formik
          initialValues={
            !Boolean(state?.reason)
              ? {
                  name: `${state.firstName} ${state.lastName}`,
                  ...state,
                }
              : {
                  email: state?.email as string,
                  primaryPhoneNumber: "",
                  secondaryPhoneNumber: "",
                  documentType: "Aadhar",
                  documentNumber: "",
                  documentPhotoFront: "",
                  documentPhotoBack: "",
                  userPicture: "",
                  addressDocumentType: "0",
                  addressProofPhoto: "",
                }
          }
          onSubmit={() => {}}
        >
          <Formik.Form>
            <Mui.DialogContent sx={{ px: { xs: 2, md: 10 } }}>
              {Boolean(state.reason !== "") ? (
                <Mui.Box>
                  <Mui.Alert severity="error" icon={false}>
                    <Mui.AlertTitle>Reject Reason</Mui.AlertTitle>
                    {state.reason}
                  </Mui.Alert>
                </Mui.Box>
              ) : null}
              <Pages.Kyc.Views.ContactDetail disabled />
              <Pages.Kyc.Views.DocumentDetail disabled />
              <Pages.Kyc.Views.ResidentialAddress disabled />
            </Mui.DialogContent>
            <Mui.DialogActions>
              <Mui.Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                my={3}
              >
                <Mui.Button
                  color="success"
                  variant="contained"
                  onClick={handleAcceptDocument}
                  disabled={Boolean(
                    state.idProof_verified && state.addressProof_verified
                  )}
                >
                  {Boolean(
                    state.idProof_verified && state.addressProof_verified
                  )
                    ? "Accepted"
                    : "Accept"}
                </Mui.Button>
                <Mui.Button
                  color="error"
                  variant="contained"
                  onClick={handleRejectDocument}
                  disabled={Boolean(state.reason !== "")}
                >
                  Reject
                </Mui.Button>
              </Mui.Stack>
            </Mui.DialogActions>
          </Formik.Form>
        </Formik.Formik>
      </Components.Global.Dialog>
      <Router.Outlet />
    </>
  );
};
