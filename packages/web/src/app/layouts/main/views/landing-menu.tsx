import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";
import LanguageIcon from '@mui/icons-material/Language';
import * as MuiIcon from "@mui/icons-material";

export const LandingMenu = ({ trigger }: { trigger: boolean }) => {

  const [language, setLanguage] = React.useState("en");
  const { t, i18n } = useTranslation();
  const navigate = Router.useNavigate();


  const handleChange = (e: any) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e?.target?.value);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("account/login");
    setAnchorEl(null);
  }

  const handleSignUp = () => {
    navigate("account/register");
    setAnchorEl(null);
  }
  
  

  return (
    <Mui.Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ color: trigger ? "text.primary" : "background.paper" }}
    >
      <Mui.Grid
      display={{xs: 'none', sm: "flex"}}      
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
      </Mui.Grid>

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
        <LanguageIcon sx={{ fontSize: "22px", cursor: "pointer", color: (theme) => (theme.palette.mode === "light" ? "inherit" : "#fff"), }} />
      </Mui.Grid>

      <Mui.Grid 
      display={{xs: "flex", sm: "none"}}
      justifyContent={'center'} 
      alignItems={"center"}   
      >
        <MuiIcon.Menu
          fontSize="large"
          onClick={handleClick}
        />
        <Mui.Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Mui.MenuItem onClick={handleLogin}><MuiIcon.Login sx={{marginRight: "15px", color: "#e64388"}}/>{t("login")}</Mui.MenuItem>
          <Mui.MenuItem onClick={handleSignUp}><MuiIcon.SensorOccupied sx={{marginRight: "15px", color: "#e64388"}}/>{t("signup")}</Mui.MenuItem>
        </Mui.Menu>
      </Mui.Grid>
    </Mui.Stack>
  )
}
