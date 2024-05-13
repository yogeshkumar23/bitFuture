import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";

export const Content = () => (
  <Mui.CardContent
    component={Mui.Stack}
    spacing={3}
    sx={{ height: "90vh", justifyContent: "center", mx: { sm: 6 } }}
  >
    <Mui.Typography variant="h5" fontWeight={900}>
      Reset Password
    </Mui.Typography>
    <Mui.Typography variant="subtitle1">
      Please enter your registered email address. An email notification with a
      password reset code will be sent to you.
    </Mui.Typography>
    <Components.Form.FormField
      label="Email"
      name="email"
      type="text"
      size="medium"
    />
    <Components.Form.SubmitButton size="large" sx={{ fontWeight: "bold" }}>
      Reset Password
    </Components.Form.SubmitButton>
    <Mui.Typography textAlign="center">
      Remember your password?{" "}
      <Mui.Link
        component={Router.Link}
        fontWeight="bold"
        to={`${Constants.API_CONFIG.base}account/login`}
      >
        Login
      </Mui.Link>
    </Mui.Typography>
  </Mui.CardContent>
);
