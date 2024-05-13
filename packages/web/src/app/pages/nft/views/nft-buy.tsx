import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export const NFTBuy = ({
  account,
  syncedAccount,
  marketNfts,
  gasFee,
}: {
  account: string;
  syncedAccount: string;
  marketNfts: nft[];
  gasFee: string;
}) => {
  const navigate = Router.useNavigate();
  const { pathname } = Router.useLocation();

  const handleNavigate = (nft: nft) => {
    navigate(`${nft?.contract}/${nft?.tokenId}/view`, {
      state: { ...nft, gasFee },
    });
  };

  const hidder = React.useMemo(
    () => pathname !== "/" && account === syncedAccount,
    [pathname, account, syncedAccount]
  );

  return marketNfts === undefined ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack
      id="marketItems"
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
        {marketNfts?.length ? (
          marketNfts
            // ?.filter((nft) => nft.owner.toLowerCase() !== account)
            ?.slice(0, pathname === "/" ? 9 : undefined)
            ?.map((nft) => (
              <Mui.Grid key={nft?.tokenId} item xs={12} md={4}>
                <Pages.NFT.Views.NFTCard
                  account={account}
                  key={nft?.tokenId}
                  id={nft?.tokenId}
                  image={nft?.tokenURI}
                  name={nft?.metadata?.name}
                  subname={nft?.metadata?.description}
                  price={Boolean(hidder)}
                  onClick={() => hidder && handleNavigate(nft)}
                  value={
                    <Components.Global.Format
                      number={nft?.price}
                      type="coin"
                      coin="ETH"
                    />
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
              No NFTs available in Market
            </Mui.Typography>
          </Mui.Stack>
        )}
      </Mui.Grid>
    </Mui.Stack>
  );
};
