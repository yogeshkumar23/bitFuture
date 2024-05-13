import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Main = ({
  user,
  update,
  updatePayment,
  payment,
  sessions,
}: {
  user: Contexts.userContext.User;
  update: () => void;
  updatePayment: (type: string, values: object) => Promise<void>;
  payment: paymentDetails;
  sessions: Hooks.User.UseSession.Response;
}) => (
  <Mui.Container sx={{ px: { xs: 0, sm: 1 } }}>
    <Pages.Views.IntroJSConfig name="profile" />
    <Mui.Grid container spacing={2}>
      <Mui.Grid item container spacing={2} xs={12} md={8}>
        <Mui.Grid item xs={12}>
          <Pages.User.Profile.Views.PersonalDetails user={user} />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Pages.User.Profile.Views.PaymentDetails
            variant="view"
            updatePayment={updatePayment}
            payment={payment}
          />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container spacing={2} lg={4} md={4} xs={12}>
        <Mui.Grid item xs={12}>
          <Pages.User.Profile.Views.SecurityDetails
            user={user}
            update={update}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Pages.User.Profile.Views.SessionHistory sessions={sessions} />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Grid>
    <Router.Outlet />
  </Mui.Container>
);
