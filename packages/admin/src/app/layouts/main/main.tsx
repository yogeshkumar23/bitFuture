import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Contexts from "src/app/contexts";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Layouts from "src/app/layouts";

export const Main = () => {
  const user = React.useContext(Contexts.UserContext);
  const { pathname } = Router.useLocation();
  const trigger = Mui.useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const check = Hooks.Design.useRouteCheck([
    `${Constants.API_CONFIG.base}pyra-center`,
    `${Constants.API_CONFIG.base}logout`,
    `${Constants.API_CONFIG.base}`,
    `${Constants.API_CONFIG.base}contact`,
  ]);

  React.useLayoutEffect(() => {
    if (!/\/p2p\/\w+\/(buy|sell)$/g.test(pathname)) {
      window.scrollTo(0, 0);
    }
    if (pathname === `${Constants.API_CONFIG.base}profile`) {
      user?.update();
    }
  }, [pathname]);

  return (
    <Mui.Box
      sx={{
        bgcolor: check ? "none" : (theme) => `${theme.palette.grey[100]}`,
        pt: check ? 0 : 10,
      }}
    >
      <Layouts.Main.Views.AppBar trigger={trigger} check={check} />
      <Layouts.Main.Views.Footer />
    </Mui.Box>
  );
};
