import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Components from "src/app/components";
import * as Layouts from "src/app/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';

export const Main = () => {
  const { pathname } = Router.useLocation();
  const [language, setLanguage] = React.useState('en');
  const { i18n } = useTranslation();

  const handleChange = (e: any) => {
    setLanguage(e?.target?.value);
    i18n.changeLanguage(e?.target?.value);
  }

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
          <Mui.Grid
            width={"full"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Components.Main.MainCenterLogo />

            {/* Change Language Select Button */}
            <Mui.Grid
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              sx={{ cursor: "pointer" }}
            >
              <Mui.Select
                value={language}
                onChange={handleChange}
                sx={{
                  color: "#000",
                  // border: (theme) => (theme.palette.mode === "light" ? "2px solid white" : "2px solid black"),
                  fontSize: '1rem',
                  marginRight: "-30px",
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiSelect-icon': {
                    display: 'none',
                  },

                }}
              >
                <Mui.MenuItem value={"en"}>English</Mui.MenuItem>
                <Mui.MenuItem value={"jp"}>Japanese</Mui.MenuItem>
              </Mui.Select>
              <LanguageIcon sx={{ fontSize: "22px", cursor: "pointer", color: "#e64388" }} />
            </Mui.Grid>
          </Mui.Grid>
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
