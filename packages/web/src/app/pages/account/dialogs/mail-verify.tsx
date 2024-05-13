import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Assets from "src/assets";
import * as Component from "src/app/components";

export const MailVerify = () => {
  const navigate = Router.useNavigate();
  const { state } = Router.useLocation() as {
    state: { email: string };
    pathname: string;
  };
  const resend = () => {
    Api.Server.Request("resendVerificationEmail", {
      email: state?.email,
    });
    navigate("..");
  };
  return state?.email ? (
    <Component.Global.Dialog open={true} fullScreen={false} icon={true}>
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
          Email verify request has been sent to your email. Please check your
          email to verify your email. If you didn't receive
        </Mui.Typography>
        <Mui.Button size="large" variant="outlined" onClick={resend}>
          Click here to resend
        </Mui.Button>
      </Mui.Stack>
    </Component.Global.Dialog>
  ) : (
    <Router.Navigate to=".." />
  );
};
