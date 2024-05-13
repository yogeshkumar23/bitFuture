import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Layouts from "src/app/layouts";

export const MainMenu = ({
  check,
  trigger,
}: {
  check: boolean;
  trigger: boolean;
}) => {
  const { pathname } = Router.useLocation();

  return (
    <>
      <Mui.Box flexGrow={2} />
      <Mui.Stack
        direction="row"
        spacing={5}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {Constants.Navigations.map((text, index) => (
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
                display: pathname.includes(text.toLowerCase())
                  ? "block"
                  : "none",
              }}
            />
            <Mui.Button
              key={index}
              disableRipple
              component={Router.Link}
              to={text.toLowerCase()}
              sx={
                pathname.includes(text.toLowerCase())
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
              {text}
            </Mui.Button>
          </Mui.Stack>
        ))}
      </Mui.Stack>
      <Mui.Box flexGrow={2} />
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
