// import * as Mui from "@mui/material";
// import * as Components from "src/app/components";
// import * as Hooks from "src/app/hooks";
// import * as Pages from "src/app/pages";

// export default () => {
//   const { coins, loading } = Hooks.Main.useCoin();
//   return loading ? (
//     <Components.Global.GlobalLoader />
//   ) : (
//     <Mui.Grid container spacing={2} sx={{ pr: { xs: 1, md: 2 } }}>
//       <Mui.Grid container item spacing={2} xs={12} md={9}>
//         <Pages.Dashboard.Views.HeaderCard />
//         <Mui.Grid item xs={12}>
//           <Pages.Dashboard.Views.MarketOverview coins={coins?.coinList} />
//         </Mui.Grid>
//         <Mui.Grid item xs={12}>
//           <Pages.Dashboard.Views.Table coins={coins?.coinList} />
//         </Mui.Grid>
//       </Mui.Grid>
//       <Mui.Grid item xs={12} md={3}>
//         <Pages.Views.SpotBalance coins={coins?.coinList} />
//         <Pages.Views.WalletCard coins={coins?.coinList} />
//       </Mui.Grid>
//     </Mui.Grid>
//   );
// };


import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export default () => {
  const { coins, loading } = Hooks.Main.useCoin();
  const {
    prices,
    nativeCurrency,
    mainCurrency,
    nativePrice,
    loading: priceLoading,
  } = Hooks.Main.useCoinPairPrices();
  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Grid container spacing={2} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Grid container item spacing={2} xs={12} md={9}>
        <Pages.Dashboard.Views.HeaderCard />
        <Mui.Grid item xs={12}>
          <Pages.Dashboard.Views.MarketOverview coins={coins?.coinList} />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Pages.Dashboard.Views.Table
            coins={coins?.coinList}
            prices={prices}
            nativeCurrency={nativeCurrency}
            nativePrice={nativePrice}
          />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item xs={12} md={3}>
        <Pages.Views.SpotBalance
          coins={coins?.coinList}
          prices={prices}
          nativeCurrency={nativeCurrency}
          mainCurrency={mainCurrency}
          nativePrice={nativePrice}
        />
        <Pages.Views.WalletCard
          coins={coins?.coinList}
          prices={prices}
          nativeCurrency={nativeCurrency}
          mainCurrency={mainCurrency}
          nativePrice={nativePrice}
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};
