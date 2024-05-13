import * as Mui from "@mui/material";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Main = ({
  coinWalletDetails,
  amountWalletDetails,
  mainCurrency,
  nativeCurrency,
  nativePrice,
  p2pCoins,
}: {
  coinWalletDetails: Hooks.User.coinsWallet[];
  amountWalletDetails: Hooks.User.UseCoinBalance.userWallet[];
  mainCurrency: string;
  nativeCurrency: string;
  nativePrice: number;
  p2pCoins: string[];
}) => (
  <>
    <Pages.Views.IntroJSConfig name="p2p" />
    <Mui.Container maxWidth="lg" sx={{ px: { xs: 0, sm: 1 } }}>
      <Mui.Grid
        container
        spacing={2}
        sx={{
          pb: 2,
        }}
      >
        <Mui.Grid item xs={12} md={8}>
          <Pages.P2P.Views.OrderBox coinWalletDetails={coinWalletDetails} />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={4}>
          <Pages.Views.AmountBox
            coinWalletDetails={coinWalletDetails}
            amountWalletDetails={amountWalletDetails}
            mainCurrency={mainCurrency}
            nativeCurrency={nativeCurrency}
            nativePrice={nativePrice}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Pages.P2P.Views.TableView p2pCoins={p2pCoins} />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Container>
    <Pages.P2P.Views.Footer />
  </>
);
