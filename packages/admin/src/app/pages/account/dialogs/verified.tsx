import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Constants from "src/constants";
import * as Component from "src/app/components";

export const Verified = () => (
  <Component.Global.Dialog fullScreen={false}>
    <Mui.Stack
      component={Mui.DialogContent}
      spacing={3}
      alignItems="center"
      sx={{ p: 7 }}
    >
      <Mui.CardMedia
        component="img"
        src={Assets.TwoFASuccess}
        sx={{ height: "auto", width: 50 }}
      />
      <Mui.Typography variant="h5" textAlign="center">
        Two-Factor Authentication Verified!
      </Mui.Typography>
      <Mui.Button
        variant="contained"
        component={Router.Link}
        to={Constants.API_CONFIG.base}
      >
        Done
      </Mui.Button>
    </Mui.Stack>
  </Component.Global.Dialog>
);
