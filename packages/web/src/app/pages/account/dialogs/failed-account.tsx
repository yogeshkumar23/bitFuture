import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Component from "src/app/components";

export const AccountFalied = () => {
  const { state } = Router.useLocation() as { state: { message: string } };

  return (
    <Component.Global.Dialog fullScreen={false}>
      <Mui.Stack
        component={Mui.DialogContent}
        spacing={3}
        alignItems="center"
        // sx={{ p: 7 }}
      >
        <Mui.CardMedia
          component="img"
          src={Assets.SecureStorage}
          sx={{ height: "auto", width: 50 }}
        />
        <Mui.Typography variant="h5" fontWeight={900}>
          Blocked
        </Mui.Typography>
        <Mui.Typography align="center" sx={{ maxWidth: 400 }}>
          Your {state?.message}. Please contact admin.
        </Mui.Typography>
      </Mui.Stack>
    </Component.Global.Dialog>
  );
};
