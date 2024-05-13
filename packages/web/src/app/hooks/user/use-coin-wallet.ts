import React from "react";
import * as Hooks from "src/app/hooks";

// export const useCoinWallet = () => {
//   const { coins, loading: coinLoading } = Hooks.Main.useCoin();
//   const { CoinBalance, loading } = Hooks.User.useCoinBalance("all", "");
//   const {
//     prices,
//     nativeCurrency,
//     mainCurrency,
//     nativePrice,
//     loading: priceLoading,
//   } = Hooks.Main.useCoinPairPrices();

//   const getWallet = (coin: Hooks.Main.UseCoin.coin) => {
//     const walletDetail = CoinBalance?.userWallet?.find(
//       ({ typeId }) => typeId === coin.coin
//     ) || { balance: 0, freeze: 0 };
//     return {
//       ...coin,
//       ...walletDetail,
//       ...(["binance", "kucoin"].includes(coin.bot_status)
//         ? {
//             current_price:
//               prices?.find(
//                 (coinPrice) =>
//                   coinPrice.currency_pair ===
//                   `${coin.coin}_${coin.currency}`.toUpperCase()
//               )?.last || 1,
//           }
//         : {}),
//     };
//   };

//   const coinWalletDetails = React.useMemo(
//     () =>
//       coins?.coinList
//         ?.map((coin) => ({
//           ...coin,
//           ...getWallet(coin),
//         }))
//         ?.sort(
//           (a, b) =>
//             (b.balance - Math.abs(b.freeze)) * (b.current_price || 0) -
//             (a.balance - Math.abs(a.freeze)) * (a.current_price || 0)
//         ) as unknown as coinsWallet[],
//     [loading, coins, prices?.length, coinLoading]
//   );

//   return {
//     coinWalletDetails,
//     amountWalletDetails: CoinBalance?.userWallet
//       ?.filter(({ type }) => type === "AMOUNT")
//       ?.sort(
//         (a, b) =>
//           b.balance - Math.abs(b.freeze) - (a.balance - Math.abs(a.freeze))
//       ),
//     loading: !Boolean(coins) || loading || priceLoading,
//     mainCurrency,
//     nativeCurrency,
//     nativePrice,
//   };
// };

export type coinsWallet = Hooks.Main.UseCoin.coin &
  Hooks.User.UseCoinBalance.userWallet;
