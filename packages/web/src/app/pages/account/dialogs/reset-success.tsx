import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Constants from "src/constants";
import * as Component from "src/app/components";

export const ResetSuccess = () => (
  <Component.Global.Dialog fullScreen={false}>
    <Mui.Stack
      component={Mui.DialogContent}
      spacing={3}
      alignItems="center"
      // sx={{ p: 7 }}
    >
      <Mui.CardMedia
        component="img"
        src={Assets.Success}
        sx={{ height: "auto", width: 50 }}
      />
      <Mui.Typography variant="h5" fontWeight={900}>
        Password Reset Successful!
      </Mui.Typography>
      <Mui.Typography align="center" sx={{ maxWidth: 400 }}>
        You can now use your new password to Login to your account.
      </Mui.Typography>
      <Mui.Button
        size="large"
        variant="contained"
        component={Router.Link}
        to={`${Constants.API_CONFIG.base}account/login`}
      >
        Login
      </Mui.Button>
    </Mui.Stack>
  </Component.Global.Dialog>
);
