import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as Router from "react-router-dom";
import * as Layouts from "src/app/layouts";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";

export const AppBar = ({
  check,
  trigger,
}: {
  check: boolean;
  trigger: boolean;
}) => {
  const isMobile = Mui.useMediaQuery(Mui.useTheme().breakpoints.up("sm"));
  const [open, setOpen] = React.useState(isMobile);
  const user = React.useContext(Contexts.UserContext);
  const drawerWidth = React.useMemo(
    () => (open ? (isMobile ? 200 : "auto") : 60),
    [open, isMobile]
  );
  const handleDrawer = () => setOpen(!open);
  React.useEffect(() => {
    setOpen(isMobile);
  }, [isMobile]);
  return (
    <>
      <Mui.AppBar
        position="fixed"
        elevation={check && !trigger ? 0 : 1}
        sx={{
          bgcolor: check && !trigger ? "transparent" : "background.default",
        }}
      >
        <Mui.Container maxWidth={check ? "lg" : false} sx={{ p: 0 }}>
          <Mui.Stack
            direction="row"
            component={Mui.Toolbar}
            justifyContent="space-between"
            alignItems="center"
          >
            <Mui.IconButton
              // sx={{ display: { md: "none" } }}
              onClick={handleDrawer}
            >
              <MuiIcons.Menu />
            </Mui.IconButton>
            {check ? (
              trigger ? (
                <Components.Main.MainCenterLogo />
              ) : (
                <Components.Main.MainCenterLogoWHITE />
              )
            ) : (
              <Components.Main.MainCenterLogo />
            )}
            <Mui.Box flexGrow={1} />
            {Boolean(user?.email) ? (
              <Layouts.Main.Views.MainMenu check={check} trigger={trigger} />
            ) : (
              <Layouts.Main.Views.LandingMenu trigger={trigger} />
            )}
          </Mui.Stack>
        </Mui.Container>
      </Mui.AppBar>
      <Mui.Drawer
        variant={isMobile ? "permanent" : "temporary"}
        open={open}
        onClose={handleDrawer}
        onClick={isMobile ? undefined : handleDrawer}
        PaperProps={{
          sx: {
            zIndex: (theme) => theme.zIndex.appBar - 1,
            width: drawerWidth,
            overflowX: "hidden",
          },
        }}
        sx={{ "& .MuiPaper-root": { bgcolor: "background.default" } }}
      >
        <Mui.Toolbar>
          <Mui.Stack direction="row" alignItems="center">
            <Layouts.Main.Views.Profile check={check} trigger={trigger} />
            <Mui.Typography variant="body1">{`${user?.firstName} ${user?.lastName}`}</Mui.Typography>
          </Mui.Stack>
          <Mui.IconButton size="small" onClick={handleDrawer}>
            <MuiIcons.KeyboardArrowLeft />
          </Mui.IconButton>
          <Layouts.Main.Views.ThemeSwitch />
        </Mui.Toolbar>
        <Layouts.Main.Views.SideBar
          permissions={user?.permissions as string[]}
          open={open}
        />
      </Mui.Drawer>
      <Mui.Box
        sx={{
          width: { xs: "auto", sm: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: "auto", sm: `${drawerWidth}px` },
          pl: 1,
        }}
      >
        <Router.Outlet />
      </Mui.Box>
    </>
  );
};
