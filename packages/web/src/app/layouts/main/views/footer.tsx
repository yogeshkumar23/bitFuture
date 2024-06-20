import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Layouts from "src/app/layouts";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as LanguageSelector from "react-i18next";

export const Footer = ({ auth }: { auth: boolean }) => {
  const check = Hooks.Design.useRouteCheck([
    `${Constants.API_CONFIG.base}spot/:coinId`,
  ]);

  const {t} = LanguageSelector.useTranslation();

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
        <Mui.Grid item xs={10} md={2}>
          <Mui.Stack spacing={2}>
            <Components.Main.MainCenterLogo
              sx={{ height: 80, width: 170, mt: -5 }}
            />
            {/* <Mui.Typography
              variant="body1"
              sx={{ width: { lg: "100%" }, lineHeight: 2 }}
            >
              BitFuture Exchange is a pioneering trading platform that has gained the
              trust of users all over the world, given our exceptional digital
              assets exchange services.
            </Mui.Typography> */}
          </Mui.Stack>
          <Mui.Box>
            <Mui.IconButton sx={{width: "1rem", px: 2.5}}>
              <MuiIcons.Twitter />
            </Mui.IconButton>
            <Mui.IconButton sx={{width: "1rem", px: 2.5}}>
              <MuiIcons.Facebook />
            </Mui.IconButton>
            <Mui.IconButton sx={{width: "1rem", px: 2.5}}>
              <MuiIcons.Instagram />
            </Mui.IconButton>
            <Mui.IconButton sx={{width: "1rem", px: 2.5}}>
              <MuiIcons.YouTube />
            </Mui.IconButton>
            <Mui.IconButton sx={{width: "1rem", px: 2.5}}>
              <MuiIcons.Telegram />
            </Mui.IconButton>
          </Mui.Box>
        </Mui.Grid>
        <Mui.Grid item xs={8} md={2}>
          <Mui.Stack spacing={1}>
            <Mui.Typography
              variant="h6"
              color="primary"
              fontWeight={900}
              fontSize={14}
              mb={2}
            >
              {t("quickLinks")}
            </Mui.Typography>
            <Mui.Typography
              variant="body1"
              component={Router.Link}
              fontSize={14}
              to="help-center"
              color="text.primary"
              sx={{ textDecoration: "none" }}
            >
              {t("helpCenter")}
            </Mui.Typography>
            <Mui.Typography
              variant="body1"
              component={Router.Link}
              fontSize={14}
              to={auth ? "terms-of-service" : "account/terms-of-service"}
              color="text.primary"
              sx={{ textDecoration: "none" }}
            >
             {t("termOfService")}
            </Mui.Typography>
            <Mui.Typography
              variant="body1"
              component={Router.Link}
              fontSize={14}
              to={auth ? "privacy-policy" : "account/privacy-policy"}
              color="text.primary"
              sx={{ textDecoration: "none" }}
            >
              {t("privacyPolicy")}
            </Mui.Typography>
          </Mui.Stack>
        </Mui.Grid>

        {/* Company Details */}
        <Mui.Grid item xs={10} md={2}>
          <Mui.Stack spacing={1}>
            <Mui.Typography
              variant="h6"
              color="primary"
              fontWeight={900}
              fontSize={14}
              mb={2}
            >
              {t("company")}
            </Mui.Typography>
            <Mui.Typography
              variant="body1"
              component={Router.Link}
              fontSize={14}
              to="help-center"
              color="text.primary"
              sx={{ textDecoration: "underline" }}
            >
             Future Capital Ventures
            </Mui.Typography>
            <Mui.Typography
              variant="body1"
              component={Router.Link}
              fontSize={14}
              to={auth ? "terms-of-service" : "account/terms-of-service"}
              color="text.primary"
              sx={{ textDecoration: "none" }}
            >
              Bloc Office Hub, Fifth Floor, Santa Maria Business District, Panama CIty 801, Panama
            </Mui.Typography>
            {/* <Mui.Typography
              variant="body1"
              component={Router.Link}
              to={auth ? "privacy-policy" : "account/privacy-policy"}
              color="text.primary"
              sx={{ textDecoration: "none" }}
            >
              Privacy Policy
            </Mui.Typography> */}
          </Mui.Stack>
        </Mui.Grid>

        <Mui.Grid item xs={8} md={3}>
          <Mui.Stack spacing={2}>
            <Mui.Typography
              color="primary"
              variant="h6"
              fontWeight={900}
              fontSize={14}
              mb={2}
            >
              {t("contact")}
            </Mui.Typography>
            <Mui.Stack direction="row" alignItems="center" spacing={2}>
              <MuiIcons.MailOutlined fontSize="small" color="primary" />
              <Mui.Typography
                variant="body1"
                component={Mui.Link}
                href="mailto:support@DooWorld.com"
                color="text.primary"
                sx={{ textDecoration: "none" , fontSize: "14"}}
              >
                support@bitfuture.pro
              </Mui.Typography>
            </Mui.Stack>
            <Mui.Stack direction="row" alignItems="center" spacing={1}>
              <MuiIcons.CallOutlined fontSize="small" color="primary" />
              <Mui.Typography
                variant="body1"
                color="text.primary"
                sx={{ textDecoration: "none", fontSize: 14 }}
              >
                +918-0000 0001
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
              fontSize={14}
              mb={2}
            >
              {t("subscribeNewsLetter")}
            </Mui.Typography>
            <Mui.Typography fontSize={14} variant="body1">
            {t("KeepYourselfUpToDate")}
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
        © Copyright {new Date().getFullYear()} by  Future Capital Ventures. All rights reserved.
      </Mui.Typography>
    </>
  );
};
