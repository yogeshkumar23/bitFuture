import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Formik from "formik";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

const setFocus = (name: string) => {
  const element = document.getElementById(name);
  if (element) {
    element.focus();
    element.scrollIntoView({ block: "center" });
  }
};

export const Main = () => {
  const { user } = React.useContext(Contexts.UserContext);
  const { activeStep, loading, userKYC, validation, submitKyc } =
    Hooks.User.useUserUpdate();

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Formik.Formik
      initialValues={
        userKYC?.userKyc && !Boolean(userKYC?.userKyc?.reason)
          ? {
              ...userKYC.userKyc,
              documentType: userKYC.userKyc?.documentType || "0",
              addressDocumentType: userKYC.userKyc?.addressDocumentType || "0",
            }
          : {
              email: user?.email as string,
              primaryPhoneNumber: "",
              secondaryPhoneNumber: "",
              documentType: "0",
              documentNumber: "",
              documentPhotoFront: "",
              documentPhotoBack: "",
              userPicture: "",
              addressDocumentType: "0",
              addressProofPhoto: "",
            }
      }
      validationSchema={validation}
      onSubmit={submitKyc}
    >
      {() => (
        <Mui.Container
          component={Formik.Form}
          maxWidth="lg"
          aria-disabled={true}
          sx={{ px: { xs: 0, sm: 1 } }}
        >
          <Mui.Grid container spacing={2}>
            <Mui.Grid item xs={12}>
              <Pages.User.Kyc.Views.Header />
            </Mui.Grid>

            {Boolean(userKYC?.userKyc?.reason) ? (
              <Mui.Grid item xs={12}>
                <Mui.Stack
                  direction="row"
                  alignItems="center"
                  component={Mui.Alert}
                  severity="error"
                  sx={{ borderRadius: 2 }}
                >
                  <Mui.Typography variant="h6">
                    KYC Registration Failed
                  </Mui.Typography>
                  <Mui.Typography variant="body1">
                    {userKYC?.userKyc?.reason}
                  </Mui.Typography>
                </Mui.Stack>
              </Mui.Grid>
            ) : null}
            <Content userKYC={userKYC} activeStep={activeStep} />
            <Mui.Grid item xs={12} md={4}>
              <Pages.User.Kyc.Views.SubmitCard
                activeStep={activeStep}
                submitted={
                  !Boolean(userKYC?.userKyc?.reason) &&
                  Boolean(userKYC?.userKyc?.addressProofPhoto)
                }
                idVerify={userKYC?.userKyc?.idProof_verified}
                addressVerify={userKYC?.userKyc?.addressProof_verified}
              />
            </Mui.Grid>
          </Mui.Grid>
          <Router.Outlet />
        </Mui.Container>
      )}
    </Formik.Formik>
  );
};

const Content = ({
  userKYC,
  activeStep,
}: {
  userKYC: Hooks.User.UseUserKYC.Response;
  activeStep: number;
}) => {
  const { errors, isSubmitting } = Formik.useFormikContext();
  React.useEffect(() => {
    Object.entries(errors).forEach(([key, _], index) => {
      index ? null : setFocus(key);
    });
  }, [isSubmitting]);
  return (
    <Mui.Grid item xs={12} md={8} container spacing={2}>
      <Pages.Views.IntroJSConfig name="kyc" />
      <Mui.Grid item xs={12}>
        <Pages.User.Kyc.Views.ContactDetail
          disabled={Boolean(
            (!Boolean(userKYC?.userKyc?.reason) &&
              userKYC?.userKyc?.secondaryPhoneNumber) ||
              activeStep >= 1
          )}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Pages.User.Kyc.Views.DocumentDetail
          disabled={
            (!Boolean(userKYC?.userKyc?.reason) &&
              Boolean(userKYC?.userKyc?.userPicture)) ||
            activeStep >= 2
          }
        />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Pages.User.Kyc.Views.ResidentialAddress
          disabled={Boolean(
            (!Boolean(userKYC?.userKyc?.reason) &&
              userKYC?.userKyc?.addressProofPhoto) ||
              activeStep >= 3
          )}
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};
