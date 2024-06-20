import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import { useTranslation } from "react-i18next";


export const TableCard = ({
  coinWalletDetails,
  nativeCurrency,
  mainCurrency,
  nativePrice,
  syncedAccount,
  nfts,
}: {
  coinWalletDetails: Hooks.User.coinsWallet[];
  nativeCurrency: string;
  mainCurrency: string;
  nativePrice: number;
  syncedAccount: string;
  nfts: nft[];
}) => {
  const {t} = useTranslation();

  const [value, setValue] = React.useState<"crypto" | "nft">("crypto");
  const navigate = Router.useNavigate();
  const handleDeposit = (coin: Hooks.User.coinsWallet) =>
    navigate("deposit", { state: coin });
  const handleWithdraw = (coin: Hooks.User.coinsWallet) =>
    navigate("withdraw", { state: coin });
  const handleTrade = (coin: Hooks.User.coinsWallet) =>
    navigate(`${Constants.API_CONFIG.base}spot/${coin.id}`, { state: coin });

  const data = coinWalletDetails?.length
    ? coinWalletDetails
        // .filter(
        //   ({ type, coin, currency }) =>
        //     (type === "COIN" && currency === mainCurrency) ||
        //     coin === mainCurrency
        // )
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.typeId === value.typeId)
        )
        .map((coin, index) => ({
          coin: (
            <Mui.Stack
              key={index}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Mui.CardMedia
                component="img"
                src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                  import.meta.env.VITE_API_IP
                }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
                sx={{ width: 50, borderRadius: 20 }}
              />
              <Mui.Stack>
                <Mui.Typography variant="body2" noWrap fontWeight="bolder">
                  {coin.coinName}
                </Mui.Typography>
                <Mui.Typography variant="body2" color="text.secondary">
                  {coin.coin}
                </Mui.Typography>
              </Mui.Stack>
            </Mui.Stack>
          ),
          amount: (
            <Components.Global.Format
              number={coin.balance - Math.abs(coin.freeze)}
              type="coin"
              coin={coin.coin}
            />
          ),
          price: (
            <Components.Global.Format
              number={
                (coin.balance - Math.abs(coin.freeze)) *
                coin.current_price *
                nativePrice
              }
              type={nativeCurrency}
            />
          ),
          freeze: (
            <Components.Global.Format
              number={Math.abs(coin.freeze)}
              type="coin"
              coin={coin.coin}
            />
          ),
          action: (
            <Mui.Stack
              key={index}
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Mui.Link
                id="cryptoDeposit"
                sx={{ color: "success.main" }}
                component={Mui.Button}
                onClick={() => handleDeposit(coin)}
              >
                {t('deposit')}
              </Mui.Link>
              <Mui.Link
                id="cryptoWithdraw"
                disabled={coin.balance - Math.abs(coin.freeze) <= 0}
                sx={{ color: "warning.main" }}
                component={Mui.Button}
                onClick={() => handleWithdraw(coin)}
              >
                {t('withdraw')}
              </Mui.Link>
              <Mui.Link
                id="cryptoTrade"
                disabled={!Boolean(coin.type === "COIN" && coin.active)}
                component={Mui.Button}
                onClick={() => handleTrade(coin)}
              >
                {coin.type === "COIN" && coin.active
                  ? `Trade by ${coin.currency}`
                  : "Currently Unavailable"}
              </Mui.Link>
            </Mui.Stack>
          ),
        }))
    : [];

  return (
    <Components.Global.Container direction="column" spacing={2}>
      <Mui.Typography variant="h6" fontWeight={900}>
        {t('myAssets')}
      </Mui.Typography>
      <Mui.Alert
        severity="info"
        sx={{ mb: 1, display: value == "nft" ? "flex" : "none" }}
      >
        <b>NOTE:</b> If you lost your wallet post a query in help center to change your meta
        mask wallet address.
      </Mui.Alert>
      <Mui.ButtonGroup
        id="assetType"
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
          onClick={() => setValue("crypto")}
          sx={{
            color: value === "crypto" ? "primary.main" : "text.secondary",
            position: "relative",
            px: 3,
            fontWeight: "bold",
          }}
        >
          {t('cryptos')}
          {value === "crypto" && (
            <Mui.Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: 50,
                borderRadius: 2,
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.primary.main}`,
              }}
            />
          )}
        </Mui.Button>
        {/* <Mui.Button
          variant="text"
          onClick={() => setValue("nft")}
          sx={{
            color: value === "nft" ? "primary.main" : "text.secondary",
            position: "relative",
            px: 3,
            fontWeight: "bold",
          }}
        >
          NFT
          {value === "nft" && (
            <Mui.Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: 50,
                borderRadius: 2,
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.primary.main}`,
              }}
            />
          )}
        </Mui.Button> */}
      </Mui.ButtonGroup>
      {
        {
          crypto: (
            <Components.Global.ResponsiveTable
              id="availableCryptos"
              titles={[
                `${t('coin')}`.toUpperCase(), 
                `${t('amount')}`.toUpperCase(), 
                `${t('price')}`.toUpperCase(), 
                `${t('p2pEscrow')}`, 
                `${t('actions')}`.toUpperCase(), 
              ]}
              data={data}
            />
          ),
          nft: (
            <Pages.NFT.Views.NFTSell
              account={syncedAccount || ""}
              syncedAccount={syncedAccount || ""}
              nfts={nfts}
              hide
            />
          ),
        }[value]
      }

      <Mui.Box flexGrow={1} />
    </Components.Global.Container>
  );
};
