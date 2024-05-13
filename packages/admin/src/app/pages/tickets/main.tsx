import * as Mui from "@mui/material";
import * as Pages from "src/app/pages";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Main = () => {
  const mdDown = Mui.useMediaQuery(Mui.useTheme().breakpoints.down("md"));
  const { pathname } = Router.useLocation();
  const { data: tickets } = Hooks.Firebase.useFireSnapshot<tickets>(
    "collectionGroup",
    "tickets"
  ).collectionSnapshot();
  React.useEffect(() => {
    tickets?.length && <Router.Navigate to={`views/${tickets?.[0]?.id}`} />;
  }, [tickets?.length]);
  return tickets ? (
    <Mui.Grid container spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      {mdDown && (
        <Mui.Grid item xs={12} md={9}>
          <Components.Global.Container
            justifyContent="center"
            height="100%"
            alignItems="center"
            sx={{ display: pathname.includes("view") ? "none" : "flex" }}
          >
            <Mui.Typography variant="h5" color="text.secondary">
              {tickets?.length ? "Click Ticket to View" : "No Tickets Found"}
            </Mui.Typography>
          </Components.Global.Container>
          <Router.Outlet />
        </Mui.Grid>
      )}
      <Mui.Grid item xs={12} md={3}>
        <Pages.Ticket.Views.TicketHistory tickets={tickets as tickets[]} />
      </Mui.Grid>
      {!mdDown && (
        <Mui.Grid item xs={12} md={9}>
          <Components.Global.Container
            justifyContent="center"
            height="100%"
            alignItems="center"
            sx={{ display: pathname.includes("view") ? "none" : "flex" }}
          >
            <Mui.Typography variant="h5" color="text.secondary">
              {tickets?.length ? "Click Ticket to View" : "No Tickets Found"}
            </Mui.Typography>
          </Components.Global.Container>
          <Router.Outlet />
        </Mui.Grid>
      )}
    </Mui.Grid>
  ) : (
    <Components.Global.GlobalLoader />
  );
};
