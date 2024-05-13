import * as Mui from "@mui/material";
import * as Layouts from "src/app/layouts";

export const MainMenu = ({
  check,
  trigger,
}: {
  check: boolean;
  trigger: boolean;
}) => (
  <Mui.Stack direction="row" alignItems="center" spacing={1}>
    <Layouts.Main.Views.Notification check={check} trigger={trigger} />
    <Layouts.Main.Views.Profile click check={check} trigger={trigger} />
    <Mui.Box sx={{ display: { xs: "none", sm: check ? "none" : "block" } }}>
      <Layouts.Main.Views.ThemeSwitch />
    </Mui.Box>
  </Mui.Stack>
);
