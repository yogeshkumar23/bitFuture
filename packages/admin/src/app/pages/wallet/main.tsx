import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Main = () => {
  const { coins, loading } = Hooks.Main.useCoin();
  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Grid container spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Grid item xs={12}>
        <Pages.Views.SpotBalance coins={coins?.coinList} />
        <Pages.Views.WalletCard coins={coins?.coinList} />
      </Mui.Grid>
      {/* <Mui.Grid item xs={12}>
      <Pages.Wallet.Views.TableCard />
    </Mui.Grid> */}
      <Router.Outlet />
    </Mui.Grid>
  );
};
