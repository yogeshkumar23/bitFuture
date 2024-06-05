import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import React from "react";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import { useTranslation } from "react-i18next";

export const Main = () => {

  const { t } = useTranslation();
  const mdDown = Mui.useMediaQuery(Mui.useTheme().breakpoints.down("md"));
  const { user } = React.useContext(Contexts.UserContext);
  const { data: tickets } = Hooks.Firebase.useFireSnapshot<tickets>(
    "collection",
    `users/${user?.uid}/tickets`
  ).collectionSnapshot();

  return (
    <Mui.Container sx={{ px: { xs: 0, sm: 1 } }}>
      <Pages.Views.IntroJSConfig name="ticket" />
      <Mui.Grid container spacing={2}>
        {mdDown && (
          <Mui.Grid item xs={12} sx={{ display: { xs: "block", md: "none" } }}>
            <Router.Outlet />
          </Mui.Grid>
        )}
        <Mui.Grid item xs={12} md={4}>
          <Components.Global.Container
            direction="column"
            justifyContent="start"
            spacing={2}
          >
            <Mui.Typography variant="h6" sx={{ fontWeight: 900 }}>
              {t('ticketHistory')} ({tickets?.length})
            </Mui.Typography>
            <Mui.Stack
              id="ticketList"
              spacing={2}
              sx={{
                maxHeight: 550,
                width: "100%",
                height: 550,
                overflow: "auto",
              }}
            >
              {tickets?.length ? (
                tickets
                  ?.sort((a, b) =>
                    a.createdTime < b.createdTime
                      ? 1
                      : b.createdTime < a.createdTime
                      ? -1
                      : 0
                  )
                  ?.map((ticket, index) => (
                    <Pages.User.Support.Views.Ticket key={index} {...ticket} />
                  ))
              ) : (
                <Mui.Typography
                  variant="h6"
                  textAlign="center"
                  py={5}
                  sx={{ color: Mui.colors.grey[400] }}
                >
                  {t('noTicketsFound')}
                </Mui.Typography>
              )}
            </Mui.Stack>
          </Components.Global.Container>
        </Mui.Grid>
        {!mdDown && (
          <Mui.Grid
            item
            xs={12}
            md={8}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Router.Outlet />
          </Mui.Grid>
        )}
      </Mui.Grid>
    </Mui.Container>
  );
};
