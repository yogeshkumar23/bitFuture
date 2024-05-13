import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Constants from "src/constants";
import * as Component from "src/app/components";

export const ForgotSuccess = () => (
  <Component.Global.Dialog fullScreen={false}>
    <Mui.Stack
      component={Mui.DialogContent}
      spacing={3}
      alignItems="center"
      // sx={{ p: 7 }}
    >
      <Mui.CardMedia
        component="img"
        src={Assets.CheckEmail}
        sx={{ height: "auto", width: 50 }}
      />
      <Mui.Typography variant="h5" fontWeight={900}>
        Check Your Email
      </Mui.Typography>
      <Mui.Typography align="center" sx={{ maxWidth: 400 }}>
        Password reset request has been sent to your email. Please check your
        email to reset your password.
      </Mui.Typography>
      <Mui.Button
        size="large"
        variant="outlined"
        component={Router.Link}
        to={`${Constants.API_CONFIG.base}account/login`}
      >
        Back to Login
      </Mui.Button>
    </Mui.Stack>
  </Component.Global.Dialog>
);
