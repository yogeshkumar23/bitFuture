import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Layouts from "src/app/layouts";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Footer = ({ auth }: { auth: boolean }) => {
  const check = Hooks.Design.useRouteCheck([
    `${Constants.API_CONFIG.base}spot/:coinId`,
  ]);

  return (
    <>
      <Mui.Grid
        component={Mui.Paper}
        container
        sx={{
          mt: 2,
          bgcolor: "background.default",
          px: { xs: 2, sm: 10 },
          py: 4,
          display: check ? "none" : "flex",
          minWidth: "100%",
        }}
        spacing={3}
      >
        <Mui.Grid item xs={12} md={4}>
          <Mui.Stack spacing={2}>
            <Components.Main.MainCenterLogo
              sx={{ height: 80, width: 170, mt: -7 }}
            />
            <Mui.Typography
              variant="body1"
              sx={{ width: { lg: "65%" }, lineHeight: 2 }}
            >
              Doo Exchange is a pioneering trading platform that has gained the
              trust of users all over the world, given our exceptional digital
              assets exchange services.
            </Mui.Typography>
          </Mui.Stack>
          <Mui.Box>
            <Mui.IconButton>
              <MuiIcons.Twitter />
            </Mui.IconButton>
            <Mui.IconButton>
              <MuiIcons.Facebook />
            </Mui.IconButton>
            <Mui.IconButton>
              <MuiIcons.Instagram />
            </Mui.IconButton>
            <Mui.IconButton>
              <MuiIcons.YouTube />
            </Mui.IconButton>
            <Mui.IconButton>
              <MuiIcons.Telegram />
            </Mui.IconButton>
          </Mui.Box>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={2}>
          <Mui.Stack spacing={1}>
            <Mui.Typography
              variant="h6"
              color="primary"
              fontWeight={900}
              mb={2}
            >
              Quick Links
            </Mui.Typography>
            <Mui.Typography
              variant="body1"
              component={Router.Link}
              to="help-center"
              color="text.primary"
              sx={{ textDecoration: "none" }}
            >
              Help Center
            </Mui.Typography>
            <Mui.Typography
              variant="body1"
              component={Router.Link}
              to={auth ? "terms-of-service" : "account/terms-of-service"}
              color="text.primary"
              sx={{ textDecoration: "none" }}
            >
              Terms Of Service
            </Mui.Typography>
            <Mui.Typography
              variant="body1"
              component={Router.Link}
              to={auth ? "privacy-policy" : "account/privacy-policy"}
              color="text.primary"
              sx={{ textDecoration: "none" }}
            >
              Privacy Policy
            </Mui.Typography>
          </Mui.Stack>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={3}>
          <Mui.Stack spacing={2}>
            <Mui.Typography
              color="primary"
              variant="h6"
              fontWeight={900}
              mb={2}
            >
              Contact
            </Mui.Typography>
            <Mui.Stack direction="row" alignItems="center" spacing={2}>
              <MuiIcons.MailOutlined fontSize="small" color="primary" />
              <Mui.Typography
                variant="body1"
                component={Mui.Link}
                href="mailto:support@DooWorld.com"
                color="text.primary"
                sx={{ textDecoration: "none" }}
              >
                support@DooWorld.com
              </Mui.Typography>
            </Mui.Stack>
            <Mui.Stack direction="row" alignItems="center" spacing={1}>
              <MuiIcons.CallOutlined fontSize="small" color="primary" />
              <Mui.Typography
                variant="body1"
                color="text.primary"
                sx={{ textDecoration: "none" }}
              >
                +221-0000 0000
              </Mui.Typography>
            </Mui.Stack>
          </Mui.Stack>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={3}>
          <Mui.Stack spacing={2}>
            <Mui.Typography
              color="primary"
              variant="h6"
              fontWeight={900}
              mb={2}
            >
              Subscribe Newsletter
            </Mui.Typography>
            <Mui.Typography variant="body1">
              Keep yourself up to date. Touch base with us.
            </Mui.Typography>
            <Layouts.Main.Views.Subscribe />
          </Mui.Stack>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Typography
        textAlign="center"
        variant="body1"
        sx={{
          display: check ? "none" : "block",
          bgcolor: (theme) => `${theme.palette.grey[100]}`,
          p: 3,
        }}
      >
        © Copyright {new Date().getFullYear()} by DooWorld. All rights reserved.
      </Mui.Typography>
    </>
  );
};
