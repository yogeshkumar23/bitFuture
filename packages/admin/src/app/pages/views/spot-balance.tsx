import * as FirebaseFirestore from "firebase/firestore";
import * as Mui from "@mui/material";
import React from "react";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const SpotBalance = ({
  coins,
}: {
  coins: Hooks.Main.UseCoin.coin[];
}) => {
  const {
    prices,
    loading: priceLoading,
    nativePrice,
    mainCurrency,
  } = Hooks.Main.useCoinPairPrices();
  const { commissions, loading } = Hooks.Admin.useGetCommission();
  const { data: coinFee } = Hooks.Firebase.useFireSnapshot<tradeBook>(
    "collectionGroup",
    `trade_book`
  ).collectionSnapshot([FirebaseFirestore.where("status", "==", "completed")]);
  // const mainCoinDetail = coins?.find((_coin) => _coin.coin === "USDT");
  const buyTrades = React.useMemo(
    () => coinFee?.filter(({ orderType }) => [1, 2, 3].includes(orderType)),
    [coinFee?.length]
  );
  const buyCoins = React.useMemo(
    () => [...new Set(buyTrades?.map(({ coin }) => coin))],
    [buyTrades?.length]
  );
  const sellTrades = React.useMemo(
    () => coinFee?.filter(({ orderType }) => [4, 5, 6].includes(orderType)),
    [coinFee?.length]
  );
  const sellCoins = React.useMemo(
    () => [...new Set(buyTrades?.map(({ currency }) => currency))],
    [sellTrades?.length]
  );

  return loading || priceLoading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Components.Global.Container
      direction="column"
      justifyContent="initial"
      spacing={2}
      sx={{ bgcolor: "primary.main", color: "#fff", mb: 2 }}
      customTitle={
        <Mui.Typography variant="h6">Spot/P2P Commissions</Mui.Typography>
      }
    >
      {/* <Mui.Typography variant="caption">Main Order</Mui.Typography>
      <Mui.Box>
        {sellCoins?.map((coin) => (
          <Mui.Typography
            variant="h6"
            sx={{
              width: "fit-content",
              float: "left",
              m: 0.5,
            }}
          >
            <Pages.Views.Coins
              coin={`/coins/${coin.toLowerCase()}.png`}
              coinName={coin}
              balance={
                commissions?.commissionDetails?.find(
                  ({ module, typeId }) => module === "SPOT" && typeId === coin
                )?.commission || 0
              }
              amountType="amount"
              amount={
                (prices.find(
                  (coinPrice) =>
                    coinPrice.currency_pair === `${coin}_USDT`.toUpperCase()
                )?.last || 1) * nativePrice
              }
            />
          </Mui.Typography>
        ))}
        {buyCoins?.map((coin) => {
          const coinDetail = coins?.find((_coin) => _coin.coin === coin);
          return (
            <Mui.Typography
              variant="h6"
              sx={{
                width: "fit-content",
                float: "left",
                m: 0.5,
              }}
            >
              <Pages.Views.Coins
                coin={`/coins/${coin.toLowerCase()}.png`}
                coinName={coin}
                balance={
                  commissions?.commissionDetails?.find(
                    ({ module, typeId }) => module === "SPOT" && typeId === coin
                  )?.commission || 0
                }
                amountType="amount"
                amount={coinDetail?.current_price as number}
              />
            </Mui.Typography>
          );
        })}
      </Mui.Box> */}
      <Mui.Typography variant="caption">Spot Binance Order</Mui.Typography>
      <Mui.Box>
        {commissions?.commissionDetails
          ?.filter((asset) => asset.module === "SPOT")
          ?.map((asset) => (
            <Mui.Typography
              variant="h6"
              sx={{
                width: "fit-content",
                float: "left",
                m: 0.5,
              }}
            >
              <Pages.Views.Coins
                key={asset.typeId}
                coin={`/coins/${asset.typeId.toLowerCase()}.png`}
                coinName={asset.typeId}
                balance={asset.commission || 0}
                amountType="amount"
                amount={
                  asset.typeId === mainCurrency
                    ? prices.find(
                        (coinPrice) =>
                          coinPrice.currency_pair ===
                          `${asset.typeId}_USD`.toUpperCase()
                      )?.last || 1
                    : (prices.find(
                        (coinPrice) =>
                          coinPrice.currency_pair ===
                          `${asset.typeId}_USDT`.toUpperCase()
                      )?.last || 1) * nativePrice
                }
              />
            </Mui.Typography>
          ))}
      </Mui.Box>
      <Mui.Typography variant="caption">P2P Order</Mui.Typography>
      <Mui.Box>
        {commissions?.commissionDetails
          ?.filter((asset) => asset.module === "P2P")
          ?.map((asset) => (
            <Mui.Typography
              variant="h6"
              sx={{
                width: "fit-content",
                float: "left",
                m: 0.5,
              }}
            >
              <Pages.Views.Coins
                key={asset.typeId}
                coin={`/coins/${asset.typeId.toLowerCase()}.png`}
                coinName={asset.typeId}
                balance={asset.commission || 0}
                amountType="amount"
                amount={
                  asset.typeId === mainCurrency
                    ? prices.find(
                        (coinPrice) =>
                          coinPrice.currency_pair ===
                          `${asset.typeId}_USD`.toUpperCase()
                      )?.last || 1
                    : (prices.find(
                        (coinPrice) =>
                          coinPrice.currency_pair ===
                          `${asset.typeId}_USDT`.toUpperCase()
                      )?.last || 1) * nativePrice
                }
              />
            </Mui.Typography>
          ))}
      </Mui.Box>
    </Components.Global.Container>
  );
};
