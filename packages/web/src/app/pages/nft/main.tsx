import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export const Main = ({
  account,
  syncedAccount,
  marketNfts,
  nfts,
  gasFee,
}: {
  account: string;
  syncedAccount: string;
  marketNfts: nft[];
  nfts: nft[];
  gasFee: string;
}) => {
  const { type } = Router.useParams();
  return (
    <Mui.Container sx={{ px: { xs: 0, sm: 1 } }}>
      <Mui.Alert severity="info" sx={{ mb: 1 }}>
        <b>NOTE:</b> If you have lost your wallet address, post a query in the help center to change old wallet to new one.
      </Mui.Alert>
      <Components.Global.Container
        spacing={2}
        justifyContent="flex-start"
        sx={{ minHeight: "80vh" }}
        customTitle={
          <Mui.Stack spacing={2} sx={{ px: 0, width: "100%" }}>
            <Mui.Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Mui.Typography variant="h5" fontWeight={900}>
                {type === "buy" ? "Market Items" : "My Items"}
              </Mui.Typography>

              {window.ethereum ? (
                <Pages.NFT.Views.NFTBalance />
              ) : (
                <Pages.NFT.Views.NFTInstall />
              )}
            </Mui.Stack>
            <Mui.ButtonGroup
              id="tradeType"
              sx={{
                "& .MuiButtonGroup-grouped": {
                  borderRadius: "4px !important",
                  width: 80,
                },
              }}
            >
              <Mui.Button
                component={Router.Link}
                to={`../buy`}
                variant={type === "buy" ? "contained" : "text"}
                color={type === "buy" ? "success" : "secondary"}
              >
                Buy
              </Mui.Button>
              <Mui.Button
                component={Router.Link}
                to={`../sell`}
                variant={type === "sell" ? "contained" : "text"}
                color={type === "sell" ? "error" : "secondary"}
              >
                Sell
              </Mui.Button>
            </Mui.ButtonGroup>
          </Mui.Stack>
        }
      >
        <Mui.Alert
          severity="warning"
          sx={{
            display:
              !syncedAccount || account === syncedAccount ? "none" : "flex",
          }}
        >
          {`Please connect previously synced wallet. Your already synced wallet address ends with following ...${syncedAccount.slice(
            -10
          )}`}
        </Mui.Alert>
        {type === "buy" ? (
          <Pages.NFT.Views.NFTBuy
            account={account}
            syncedAccount={syncedAccount}
            marketNfts={marketNfts}
            gasFee={gasFee}
          />
        ) : (
          <Pages.NFT.Views.NFTSell
            account={account}
            syncedAccount={syncedAccount}
            nfts={nfts}
          />
        )}
        <Router.Outlet />
      </Components.Global.Container>
    </Mui.Container>
  );
};
