import * as FirebaseFirestore from "firebase/firestore";
import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const MarketTrends = ({
  user,
  prices,
  nativeCurrency,
  mainCurrency,
  nativePrice,
  account,
  marketNfts,
  gasFee,
  syncedAccount,
  coinList,
}: {
  user: Contexts.userContext.User;
  prices: {
    currency_pair: string;
    last: number;
  }[];
  nativeCurrency: string;
  mainCurrency: string;
  nativePrice: number;
  account: string | undefined;
  marketNfts: nft[] | undefined;
  gasFee: string;
  syncedAccount: string | undefined;
  coinList: Hooks.Main.UseCoin.coin[];
}) => {
  const [value, setValue] = React.useState<"spot" | "p2p" | "token">("spot");
  const query = [
    FirebaseFirestore.where("showPostTill", ">=", new Date().getTime()),
    FirebaseFirestore.where("status", "in", ["pending", "partiallyPending"]),
    FirebaseFirestore.orderBy("showPostTill", "desc"),
  ];
  const { data: trades } = Hooks.Firebase.useFireSnapshot<p2pTrade>(
    "collection",
    `p2p_trade_book`
  ).collectionSnapshot(query);
  const { data: users } =
    Hooks.Firebase.useFireSnapshot<Hooks.User.UseUser.User>(
      "collection",
      "users"
    ).collectionSnapshot();
  const { data: reviews } = Hooks.Firebase.useFireSnapshot<p2p_review>(
    "collectionGroup",
    `reviews`
  ).collectionSnapshot();

  return trades === undefined ||
    users === undefined ||
    reviews === undefined ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Container sx={{ px: { xs: 0, md: 1 } }}>
      <Pages.Views.IntroJSConfig name="home" />
      <Components.Global.Container
        direction="column"
        maxWidth="lg"
        justifyContent="initial"
        spacing={1}
        sx={{
          position: "relative",
          overflow: "hidden",
          // backgroundImage: `url('${Assets.MarketTrands}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 2,
          px: { xs: 0, md: 1 },
          minHeight: "90vh",
        }}
      >
        <Mui.Typography variant="h4" sx={{ pb: 3, fontWeight: 900 }}>
          Trade Center
        </Mui.Typography>
        <Mui.ButtonGroup
          id="tradeNavigation"
          size="large"
          sx={{
            // border: (theme) => `1px solid ${theme.palette.grey[400]}`,
            // borderRadius: 20,
            overflow: "hidden",
            width: "fit-content",
            bgcolor: "background.default",
          }}
        >
          <Mui.Button
            variant="text"
            onClick={() => setValue("spot")}
            sx={{
              color: value === "spot" ? "primary.main" : "text.secondary",
              position: "relative",
              px: 3,
              fontWeight: 700,
            }}
          >
            Spot
            {value === "spot" && (
              <Mui.Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: 50,
                  borderRadius: 2,
                  borderBottom: (theme) =>
                    `3px solid ${theme.palette.primary.main}`,
                }}
              />
            )}
          </Mui.Button>
          <Mui.Button
            variant="text"
            onClick={() => setValue("p2p")}
            sx={{
              color: value === "p2p" ? "primary.main" : "text.secondary",
              position: "relative",
              px: 3,
              fontWeight: 700,
            }}
          >
            P2P
            {value === "p2p" && (
              <Mui.Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: 50,
                  borderRadius: 2,
                  borderBottom: (theme) =>
                    `3px solid ${theme.palette.primary.main}`,
                }}
              />
            )}
          </Mui.Button>
          <Mui.Button
            variant="text"
            onClick={() => setValue("token")}
            sx={{
              color: value === "token" ? "primary.main" : "text.secondary",
              position: "relative",
              px: 3,
              fontWeight: 700,
            }}
          >
            NFT
            {value === "token" && (
              <Mui.Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: 50,
                  borderRadius: 2,
                  borderBottom: (theme) =>
                    `3px solid ${theme.palette.primary.main}`,
                }}
              />
            )}
          </Mui.Button>
        </Mui.ButtonGroup>
        {
          {
            spot: (
              <Pages.Home.Views.SpotTable
                prices={prices}
                nativePrice={nativePrice}
                nativeCurrency={nativeCurrency}
                mainCurrency={mainCurrency}
                coinList={coinList}
                user={user}
              />
            ),
            p2p: (
              <Pages.Home.Views.P2POrderTable
                trades={trades}
                reviews={reviews}
                users={users}
                user={user}
              />
            ),
            token: marketNfts !== undefined && (
              <Pages.NFT.Views.NFTBuy
                account={account || ""}
                syncedAccount={syncedAccount || ""}
                marketNfts={marketNfts}
                gasFee={gasFee}
              />
            ),
          }[value]
        }
        <Mui.Box flexGrow={1} />
        <Mui.Typography align="center" sx={{ pt: 5 }}>
          <Mui.Button
            component={Router.Link}
            to={
              !Boolean(user?.email)
                ? `${Constants.API_CONFIG.base}account/login`
                : `${Constants.API_CONFIG.base}${
                    { spot: "spot", p2p: "p2p", token: "nft/buy" }[value]
                  }`
            }
            sx={{
              bgcolor: "#fff",
              color: "primary.main",
              "&:hover": {
                color: "#fff",
              },
            }}
            variant="contained"
            endIcon={<MuiIcons.ArrowForwardIos fontSize="small" />}
          >
            View More Markets
          </Mui.Button>
        </Mui.Typography>
      </Components.Global.Container>
    </Mui.Container>
  );
};
