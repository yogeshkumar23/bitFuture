import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";
import LanguageIcon from '@mui/icons-material/Language';
export const LandingMenu = ({ trigger }: { trigger: boolean }) => {

  const [language, setLanguage] = React.useState("en");
  const {t, i18n } = useTranslation();


  const handleChange = (e: any) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e?.target?.value);
  }


  return (
    <Mui.Stack
    direction="row"
    spacing={1}
    alignItems="center"
    sx={{ color: trigger ? "text.primary" : "background.paper" }}
  >
    <Mui.Button
      component={Router.Link}
      to="account/login"
      sx={{
        color: (theme) => (theme.palette.mode === "light" ? "inherit" : "#fff"),
      }}
    >
      {t("login")}
    </Mui.Button>
    <Mui.Button
      variant="contained"
      component={Router.Link}
      to="account/register"
      sx={
        trigger
          ? undefined
          : {
              bgcolor: "primary.light",
              "&:hover": { bgcolor: "primary.light" },
            }
      }
    >
      {t("signup")}
    </Mui.Button>

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
            color: (theme) => (theme.palette.mode === "light" ? "inherit" : "#fff"),
            // border: (theme) => (theme.palette.mode === "light" ? "2px solid white" : "2px solid black"),
            fontSize: '1rem',
            marginRight: "-26px",
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
        <LanguageIcon sx={{fontSize: "22px", cursor: "pointer", color: (theme) => (theme.palette.mode === "light" ? "inherit" : "#fff"),}}/>
      </Mui.Grid>
  </Mui.Stack>
  )
}
