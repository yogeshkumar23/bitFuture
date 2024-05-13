import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Main = () => {
  const navigate = Router.useNavigate();
  const { pathname } = Router.useLocation();
  const { users, loading } = Hooks.Admin.useUserList();
  const { account, nfts, logs, gasFee } = Hooks.Main.useNFT();

  const handleNavigate = (nft: nft) => {
    navigate(`${nft?.tokenId}/view`, {
      state: { ...nft, users: users?.userList },
    });
  };

  return logs === undefined || loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Mui.Typography variant="h5">NFT Collections</Mui.Typography>
        <Mui.Link
          target="_blank"
          href={`https://mumbai.polygonscan.com/address/${
            import.meta.env.VITE_CONTRACT_ADDRESS
          }`}
        >
          <Mui.Typography
            variant="h6"
            color="primary"
            component={Mui.Stack}
            direction="row"
            alignItems="center"
          >
            Block Explorer{" "}
            <MuiIcons.OpenInNew fontSize="inherit" sx={{ m: 1 }} />
          </Mui.Typography>
        </Mui.Link>
        {pathname.includes("nft") ? (
          window.ethereum ? (
            <Pages.Views.NFTBalance />
          ) : (
            <Pages.Views.NFTInstall />
          )
        ) : null}
      </Mui.Stack>
      <Components.Global.Container spacing={2} direction="column">
        <Mui.Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
        ></Mui.Stack>
        <Pages.NFT.Views.Transactions
          users={users?.userList || []}
          logs={logs}
          elements={
            <>
              <Mui.Typography variant="h6">Transactions</Mui.Typography>
              <Mui.Box flexGrow={1} />
              <Mui.Button
                variant="contained"
                component={Router.Link}
                to="change-price"
                sx={{ height: "fit-content" }}
              >
                Change GasFee{" "}
                <Components.Global.Format
                  number={gasFee}
                  type="coin"
                  coin="ETH"
                />
              </Mui.Button>
            </>
          }
        />
        <Mui.Divider />
        <Mui.Typography variant="h6">Assets</Mui.Typography>
        <Mui.Box>
          <Mui.Grid container spacing={2} justifyContent="center">
            {nfts ? (
              nfts?.map((nft, index) => (
                <Mui.Grid key={index} item xs={12} md={4}>
                  <Pages.Views.NFTCard
                    id={nft?.tokenId}
                    image={nft?.tokenURI}
                    name={nft?.metadata?.name}
                    subname={nft?.metadata?.description}
                    price={account ? nft?.sale || nft?.isAuction : false}
                    onClick={() => account && handleNavigate(nft)}
                    value={
                      <Components.Global.Format
                        number={nft?.price}
                        type="coin"
                        coin="ETH"
                      />
                    }
                    button={
                      account ? (
                        nft?.isAuction ? (
                          <Mui.Button
                            startIcon={<MuiIcons.Check />}
                            size="small"
                            variant="outlined"
                            color="primary"
                            sx={{ width: "100%", borderRadius: 5 }}
                          >
                            <Components.Global.Timer
                              variant="caption"
                              time={nft?.isAuctionDuration * 1000}
                            >
                              {"Available for Auction "}
                            </Components.Global.Timer>
                          </Mui.Button>
                        ) : nft?.sale ? (
                          <Mui.Button
                            startIcon={<MuiIcons.Check />}
                            size="small"
                            variant="outlined"
                            color="primary"
                            sx={{ width: "100%", borderRadius: 5 }}
                          >
                            {nft?.isAuction
                              ? "Available for Auction"
                              : "Available for Sale"}
                          </Mui.Button>
                        ) : (
                          <Mui.Button
                            startIcon={<MuiIcons.Close />}
                            size="small"
                            variant="outlined"
                            color="error"
                            sx={{ width: "100%", borderRadius: 5 }}
                          >
                            Not Ready for Sale
                          </Mui.Button>
                        )
                      ) : null
                    }
                  />
                </Mui.Grid>
              ))
            ) : account ? (
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
            )}
          </Mui.Grid>
        </Mui.Box>
        <Router.Outlet />
      </Components.Global.Container>
    </Mui.Stack>
  );
};
