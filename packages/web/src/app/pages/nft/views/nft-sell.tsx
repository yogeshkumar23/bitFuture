import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Pages from "src/app/pages";

export const NFTSell = ({
  nfts,
  account,
  syncedAccount,
  form = false,
  hide = false,
}: {
  nfts: nft[];
  account: string;
  syncedAccount: string;
  form?: boolean;
  hide?: boolean;
}) => {
  const navigate = Router.useNavigate();

  const handleNavigate = (nft: nft) => {
    navigate(`${nft?.contract}/${nft?.tokenId}/sale`, { state: nft });
  };

  return syncedAccount ? (
    nfts === undefined ? (
      <Components.Global.GlobalLoader />
    ) : (
      <Mui.Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Mui.Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {nfts?.length ? (
            nfts.map((nft) => (
              <Mui.Grid key={nft?.tokenId} item xs={12} md={4}>
                <Pages.NFT.Views.NFTCard
                  account={account}
                  key={nft?.tokenId}
                  id={nft?.tokenId}
                  image={nft?.tokenURI || ""}
                  name={nft?.metadata?.name || ""}
                  subname={nft?.metadata?.description}
                  price={nft?.sale || nft?.isAuction}
                  onClick={
                    form
                      ? () =>
                          document
                            ?.getElementById(
                              `${nft?.tokenId}_${nft?.contract}_NFT`
                            )
                            ?.click()
                      : () => {
                          if (hide) {
                            navigate(`${Constants.API_CONFIG.base}nft/sell`);
                          } else
                            account === syncedAccount &&
                              nft &&
                              handleNavigate(nft);
                        }
                  }
                  form={undefined}
                  value={
                    form ? null : (
                      <Components.Global.Format
                        number={nft?.price}
                        type="coin"
                        coin="ETH"
                      />
                    )
                  }
                />
              </Mui.Grid>
            ))
          ) : (
            <Mui.Stack
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ p: 2 }}
            >
              <Mui.Typography variant="h6" textAlign="center">
                No NFTs available in your Account
              </Mui.Typography>
            </Mui.Stack>
          )}
        </Mui.Grid>
      </Mui.Stack>
    )
  ) : (
    <Mui.Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ p: 2 }}
    >
      <Mui.Typography variant="h6">No NFTs to show</Mui.Typography>
      <Mui.Typography variant="body2">
        Connect your wallet to show the list
      </Mui.Typography>
    </Mui.Stack>
  );
};
