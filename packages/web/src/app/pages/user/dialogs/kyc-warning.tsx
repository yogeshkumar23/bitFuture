import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Component from "src/app/components";

export const KycWarning = () => (
  <Component.Global.Dialog fullScreen={false} icon>
    <Mui.Stack component={Mui.DialogContent} spacing={3} alignItems="center">
      <Mui.CardMedia
        component="img"
        src={Assets.KYCError}
        sx={{ height: "auto", width: 50 }}
      />
      <Mui.Typography variant="h5" textAlign="center">
        KYC Verification required
      </Mui.Typography>
      <Mui.Typography variant="body2" color="text.secondary" textAlign="center">
        Your account is not verified. Please verify your account
      </Mui.Typography>
      <Mui.Button variant="contained" component={Router.Link} to="..">
        Verify Now
      </Mui.Button>
    </Mui.Stack>
  </Component.Global.Dialog>
);
