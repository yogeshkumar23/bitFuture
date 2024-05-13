import * as Mui from "@mui/material";
import * as Pages from "src/app/pages";
import * as Router from "react-router-dom";

export default () => (
  <Mui.Container maxWidth="lg" sx={{ px: { xs: 0, sm: 1 } }}>
    <Mui.Grid container spacing={2}>
      <Mui.Grid item xs={12}>
        <Pages.User.Invite.Views.ReferFriends />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Pages.User.Invite.Views.Working />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Pages.User.Invite.Views.ReferredUsers />
      </Mui.Grid>
    </Mui.Grid>
    <Router.Outlet />
  </Mui.Container>
);
