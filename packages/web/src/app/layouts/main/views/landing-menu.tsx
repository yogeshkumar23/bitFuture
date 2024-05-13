import * as Mui from "@mui/material";
import * as Router from "react-router-dom";

export const LandingMenu = ({ trigger }: { trigger: boolean }) => (
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
      Login
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
      Sign Up
    </Mui.Button>
  </Mui.Stack>
);
