import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export const Main = () => (
  <Mui.Container>
    <Mui.Grid container spacing={2}>
      <Mui.Grid item container spacing={2} xs={12} md={8}>
        <Mui.Grid item xs={12}>
          <Pages.User.Profile.Views.PersonalDetails />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Pages.User.Profile.Views.SecurityDetails />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container spacing={2} lg={4} md={4} xs={12}>
        <Mui.Grid item xs={12}>
          <Pages.User.Profile.Views.SessionHistory />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Grid>
    <Router.Outlet />
  </Mui.Container>
);
