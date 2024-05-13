import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Validations from "src/app/validations";

export const EditUser = ({ user }: { user: Contexts.userContext.User }) => {
  const { update } = Hooks.User.useUserUpdate();

  return (
    <Mui.Container maxWidth="md" sx={{ p: { xs: 0, sm: 1 } }}>
      <Formik.Formik
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          profileImage: user?.profileImage,
          password: "........",
        }}
        validationSchema={Validations.profile}
        onSubmit={update}
      >
        {({ isSubmitting }) => (
          <Formik.Form>
            <Mui.Stack spacing={2}>
              <Components.Global.Container
                direction="column"
                justifyContent="start"
                spacing={2}
                sx={{ height: "100%" }}
              >
                <Mui.Typography variant="h5">
                  Edit Personal Details
                </Mui.Typography>
                <Pages.User.Profile.Views.UserInfo disabled={isSubmitting} />
              </Components.Global.Container>

              <Mui.Grid item xs={12} sx={{ py: 3, px: 1 }}>
                <Mui.Stack
                  spacing={2}
                  alignItems="center"
                  direction={{ xs: "column", sm: "row" }}
                >
                  <Components.Form.SubmitButton sx={{ maxWidth: 150 }}>
                    Save Changes
                  </Components.Form.SubmitButton>
                  <Mui.Button
                    sx={{ width: 150 }}
                    variant="outlined"
                    component={Router.Link}
                    to=".."
                  >
                    Discard
                  </Mui.Button>
                </Mui.Stack>
              </Mui.Grid>
            </Mui.Stack>
            <Router.Outlet />
          </Formik.Form>
        )}
      </Formik.Formik>
    </Mui.Container>
  );
};
