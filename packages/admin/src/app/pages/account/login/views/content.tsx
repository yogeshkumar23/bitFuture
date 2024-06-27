import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";

export const Content = () => (
  <Mui.CardContent
    component={Mui.Stack}
    spacing={2}
    sx={{ height: "90vh", justifyContent: "center", mx: { sm: 6 } }}
  >
    <Mui.Typography variant="h5">Sign In</Mui.Typography>
    <Components.Form.FormField label="Email" name="email" type="text" />
    <Components.Form.FormField
      label="Password"
      name="password"
      type="password"
    />
    <Mui.Link
      color="text.secondary"
      component={Router.Link}
      to={`${Constants.API_CONFIG.base}account/forgot-password`}
      textAlign="right"
    >
      Forgot your password?
    </Mui.Link>
    <Components.Form.SubmitButton>Sign In</Components.Form.SubmitButton>
  </Mui.CardContent>
);
