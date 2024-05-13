import * as Mui from "@mui/material";
import * as Layouts from "src/app/layouts";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";

export const AppBar = ({
  check,
  trigger,
  user,
}: {
  check: boolean;
  trigger: boolean;
  user: Contexts.userContext.User;
}) => {
  return (
    <Mui.AppBar
      elevation={check && !trigger ? 0 : 5}
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
          {Boolean(user?.email) ? (
            <Layouts.Main.Views.MenuBar
              check={check}
              trigger={trigger}
              user={user}
            />
          ) : null}
          {check ? (
            trigger ? (
              <Components.Main.MainCenterLogo />
            ) : (
              <Components.Main.MainCenterLogoWHITE />
            )
          ) : (
            <Components.Main.MainCenterLogo />
          )}
          {Boolean(user?.email) ? (
            <Layouts.Main.Views.MainMenu check={check} trigger={trigger} />
          ) : (
            <Layouts.Main.Views.LandingMenu trigger={trigger} />
          )}
        </Mui.Stack>
      </Mui.Container>
    </Mui.AppBar>
  );
};
