import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Constants from "src/constants";
import * as Component from "src/app/components";

export const MailVerify = () => (
  <Component.Global.Dialog open={true} fullScreen={false}>
    <Mui.Stack
      component={Mui.DialogContent}
      spacing={3}
      alignItems="center"
      sx={{ p: 7 }}
    >
      <Mui.CardMedia
        component="img"
        src={Assets.CheckEmail}
        sx={{ height: "auto", width: 50 }}
      />
      <Mui.Typography variant="h5">Check Your Email</Mui.Typography>
      <Mui.Typography align="center" sx={{ maxWidth: 400 }}>
        Email verify request has been sent to your email. Please check your
        email to verify your email.
      </Mui.Typography>
      <Mui.Button
        variant="outlined"
        component={Router.Link}
        to={`${Constants.API_CONFIG.base}account/login`}
      >
        <Mui.Typography variant="h6">Back to Login</Mui.Typography>
      </Mui.Button>
    </Mui.Stack>
  </Component.Global.Dialog>
);
