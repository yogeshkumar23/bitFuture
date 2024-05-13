import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";

export const Main = () => {
  const { pathname } = Router.useLocation();

  React.useLayoutEffect(() => {
    if (!/\/p2p\/\w+\/(buy|sell)$/g.test(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return (
    <Mui.Container maxWidth="lg">
      <Components.Main.MainCenterLogo />
      <Mui.Container maxWidth="sm">
        <Router.Outlet />
      </Mui.Container>
    </Mui.Container>
  );
};
