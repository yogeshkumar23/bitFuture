import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Validations from "src/app/validations";

export const ChangePassword = () => {
  const { changePassword } = Hooks.User.useUserUpdate();
  return (
    <Mui.Container maxWidth="md">
      <Formik.Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={Validations.changePasswordValidate}
        onSubmit={changePassword}
      >
        <Formik.Form>
          <Components.Global.Container
            direction="column"
            justifyContent="start"
            spacing={2}
            sx={{ height: "100%" }}
          >
            <Mui.Container
              maxWidth="xs"
              sx={{ ml: 0 }}
              component={Mui.Stack}
              spacing={2}
            >
              <Mui.Typography variant="h5">Change password</Mui.Typography>
              <Components.Form.FormField
                label="Enter Current Password"
                name="currentPassword"
                type="password"
                size="small"
              />
              <Components.Form.FormField
                label="Create New Password"
                name="newPassword"
                type="password"
                size="small"
              />
              <Components.Form.FormField
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                size="small"
              />
            </Mui.Container>
          </Components.Global.Container>
          <Mui.Stack direction="row" spacing={2} sx={{ py: 3, px: 1 }}>
            <Components.Form.SubmitButton
              sx={{ height: "fit-content", width: "max-content" }}
            >
              Update Password
            </Components.Form.SubmitButton>
            <Mui.Button
              variant="outlined"
              color="secondary"
              component={Router.Link}
              to=".."
            >
              Discard
            </Mui.Button>
          </Mui.Stack>
        </Formik.Form>
      </Formik.Formik>
    </Mui.Container>
  );
};
