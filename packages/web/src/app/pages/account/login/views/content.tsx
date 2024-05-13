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
      Login
    </Mui.Typography>
    <Components.Form.FormField
      label="Email"
      name="email"
      type="text"
      size="medium"
    />
    <Components.Form.FormField
      label="Password"
      name="password"
      type="password"
      size="medium"
    />
    <Mui.Link
      color="text.secondary"
      component={Router.Link}
      to={`${Constants.API_CONFIG.base}account/forgot-password`}
    >
      Forgot your password?
    </Mui.Link>
    <Components.Form.SubmitButton size="large" sx={{ fontWeight: "bold" }}>
      Login
    </Components.Form.SubmitButton>
    <Mui.Typography textAlign="center">
      Don't have an account?{" "}
      <Mui.Link
        component={Router.Link}
        fontWeight="bold"
        to={`${Constants.API_CONFIG.base}account/register`}
      >
        Register
      </Mui.Link>
    </Mui.Typography>
  </Mui.CardContent>
);
