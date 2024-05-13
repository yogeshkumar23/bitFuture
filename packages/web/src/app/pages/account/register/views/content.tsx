import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";

export const Content = () => (
  <Mui.CardContent
    component={Mui.Stack}
    spacing={3}
    sx={{
      minHeight: 700,
      justifyContent: "center",
      mx: { sm: 6 },
    }}
  >
    <Mui.Typography variant="h5" fontWeight={900}>
      Create New Account
    </Mui.Typography>
    <Mui.Stack direction="row" spacing={2}>
      <Components.Form.FormField
        label="First name"
        name="firstName"
        type="text"
        size="medium"
      />
      <Components.Form.FormField
        label="Last name"
        name="lastName"
        type="text"
        size="medium"
      />
    </Mui.Stack>
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
    <Components.Form.FormField
      label="Referral code(optional)"
      name="referalCode"
      type="text"
      size="medium"
    />
    <Components.Form.CheckBox
      size="medium"
      label={
        <Mui.Typography variant="inherit">
          I have read and agree to the{" "}
          <Mui.Link component={Router.Link} to={`terms-of-service`}>
            Terms & Conditions
          </Mui.Link>
        </Mui.Typography>
      }
      name="termsOfService"
    />
    <Components.Form.SubmitButton size="large" sx={{ fontWeight: "bold" }}>
      Create Account
    </Components.Form.SubmitButton>
    <Mui.Typography textAlign="center">
      Already a member?{" "}
      <Mui.Link
        component={Router.Link}
        fontWeight="bold"
        to={`${Constants.API_CONFIG.base}account/login`}
      >
        Log In
      </Mui.Link>
    </Mui.Typography>
  </Mui.CardContent>
);
