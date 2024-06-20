import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Layouts from "src/app/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';

export const MainMenu = ({
  check,
  trigger,
}: {
  check: boolean;
  trigger: boolean;
}) => {
  const { pathname } = Router.useLocation();
  const [language, setLanguage] = React.useState("en");
  const {t, i18n } = useTranslation();

  
  const Navigations = [{
    name: `${t("dashboard")}`,
    path: 'dashboard'
  },
  {
    name: `${t("spot")}`,
    path: 'spot'
  },{
    name: `P2P`,
    path: 'P2P'
  },
  {
    name: `${t("wallet")}`,
    path: 'wallet'
  }

  ];


  const handleChange = (e: any) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e?.target?.value);
  }


  return (
    <>
      <Mui.Box flexGrow={2} />
      <Mui.Stack
        direction="row"
        spacing={5}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {Navigations.map((element, index) => (
          <Mui.Stack key={index}>
            <Mui.Box
              component="span"
              borderRadius={8}
              sx={{
                bgcolor: "primary.dark",
                width: "104%",
                p: 0.5,
                mt: -2.6,
                ml: -0.2,
                display: pathname.includes(element?.path?.toLowerCase())
                  ? "block"
                  : "none",
              }}
            />
            <Mui.Button
              key={index}
              disableRipple
              component={Router.Link}
              to={element?.path?.toLowerCase()}
              sx={
                pathname.includes(element?.path?.toLowerCase())
                  ? {
                    color: "primary.main",
                    borderRadius: 0,
                    fontWeight: 900,
                    boxShadow: (theme) =>
                      `0 1rem 15px -.8rem ${theme.palette.primary.main} inset`,
                    mt: -0.5,
                    pt: 2,
                  }
                  : { color: !trigger && check ? "#fff" : "text.secondary" }
              }
            >
              {element?.name}
            </Mui.Button>
          </Mui.Stack>
        ))}
      </Mui.Stack>
      <Mui.Box flexGrow={2} />
      <Mui.Grid
      display={"flex"}
      justifyContent={"start"}
      alignItems={"center"}
      sx={{cursor: "pointer"}}
      >
        <Mui.Select
          value={language}
          onChange={handleChange}
          sx={{
            color: !trigger && check ? "#fff" : "text.secondary",
            // color: (theme) => (theme.palette.mode === "light" ? "#000" : "#fff"),
            // border: (theme) => (theme.palette.mode === "light" ? "2px solid white" : "2px solid black"),
            fontSize: 14,
            marginRight: "-25px",
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSelect-icon': {
              display: 'none',
            },

          }}
        >
          <Mui.MenuItem sx={{fontSize: 12}} value={"en"}>English</Mui.MenuItem>
          <Mui.MenuItem sx={{fontSize: 12}} value={"jp"}>Japanese</Mui.MenuItem>
        </Mui.Select>
        <LanguageIcon sx={{fontSize: "20px", cursor: "pointer", color: !trigger && check ? "#fff" : "text.secondary",}}/>
      </Mui.Grid>
      <Mui.Stack direction="row" alignItems="center" spacing={1}>
        <Layouts.Main.Views.Notification check={check} trigger={trigger} />
        <Layouts.Main.Views.Profile click check={check} trigger={trigger} />
        <Mui.Box sx={{ display: { xs: "none", sm: check ? "none" : "block" } }}>
          <Layouts.Main.Views.ThemeSwitch />
        </Mui.Box>
      </Mui.Stack>
    </>
  );
};
