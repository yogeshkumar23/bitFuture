import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export const TwoFactor = () => (
  <Mui.Container maxWidth="md">
    <Components.Global.Container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: "80vh" }}
    >
      <Pages.Account.TwoFactor.Main />
    </Components.Global.Container>
  </Mui.Container>
);
