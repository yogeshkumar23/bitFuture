import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export const TwoFactor = () => (
  <Mui.Container maxWidth="md" sx={{ px: { xs: 0, sm: 1 } }}>
    <Components.Global.Container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: "80vh", px: { xs: 0, sm: 1 } }}
    >
      <Pages.Account.TwoFactor.Main />
    </Components.Global.Container>
  </Mui.Container>
);
