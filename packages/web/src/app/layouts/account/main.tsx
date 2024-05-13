import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Components from "src/app/components";
import * as Layouts from "src/app/layouts";

export const Main = () => {
  const { pathname } = Router.useLocation();
  return (
    <Mui.Grid container>
      <Mui.Grid
        item
        xs={12}
        md={pathname.includes("terms-of-service") ? 12 : 6}
        sx={{ p: 2, overflowY: "auto", height: "100vh" }}
      >
        <Mui.Container
          maxWidth={pathname.includes("terms-of-service") ? "lg" : "sm"}
          sx={{ px: { xs: 0, sm: 1 } }}
        >
          <Components.Main.MainCenterLogo />
          <Router.Outlet />
        </Mui.Container>
      </Mui.Grid>
      <Mui.Grid
        item
        xs={12}
        md={6}
        sx={{
          position: "relative",
          display: {
            md: ["terms-of-service"].includes(pathname.substring(9))
              ? "none"
              : "block",
            xs: "none",
          },
        }}
      >
        <Mui.CardMedia
          component="img"
          src={pathname.includes("two-factor") ? Assets.FAbg : Assets.BgImg}
          sx={{ height: "100vh" }}
        />
        <Mui.CardMedia
          component="img"
          src={Assets.WhiteLogo}
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%,-50%) scale(0.22)",
            display: pathname.includes("two-factor") ? "none" : "flex",
          }}
        />
        {pathname.includes("two-factor") ? null : (
          <Layouts.Account.Views.Carousel />
        )}
      </Mui.Grid>
    </Mui.Grid>
  );
};
