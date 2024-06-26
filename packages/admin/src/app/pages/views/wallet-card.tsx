// import * as Mui from "@mui/material";
// import * as Router from "react-router-dom";
// import * as Components from "src/app/components";
// import * as Hooks from "src/app/hooks";
// import * as Pages from "src/app/pages";

// export const WalletCard = ({ coins }: { coins: Hooks.Main.UseCoin.coin[] }) => {
//   const {
//     prices,
//     nativeCurrency,
//     nativePrice,
//     mainCurrency,
//     loading: priceLoading,
//   } = Hooks.Main.useCoinPairPrices();
//   const { pathname } = Router.useLocation();
//   const { p2pcoinpair } = Hooks.Main.useP2PCoinList();
//   const { listWallet, loading } = Hooks.Admin.useUserWalletList();
//   const p2pCoins = p2pcoinpair?.coinList
//     ? [
//         ...new Set(
//           p2pcoinpair.coinList
//             .filter(({ p2p_active }) => Boolean(p2p_active))
//             .map(({ coin }) => coin)
//         ),
//       ]
//     : [];

//   return loading || priceLoading ? (
//     <Components.Global.GlobalLoader />
//   ) : (
//     <Mui.Stack spacing={2}>
//       <Components.Global.Container
//         direction="column"
//         justifyContent="initial"
//         spacing={1}
//         sx={{ height: "100%" }}
//         customTitle={
//           <Mui.Typography variant="h6" color="primary">
//             Escrow Wallets
//           </Mui.Typography>
//         }
//       >
//         <Mui.Box>
//           {p2pCoins.map((coin) => {
//             const coinDetail = coins?.find((_coin) => _coin.coin === coin);
//             return (
//               <Mui.Typography
//                 variant="h6"
//                 sx={{
//                   minWidth: 150,
//                   width: "fit-content",
//                   float: "left",
//                   m: 0.5,
//                 }}
//               >
//                 <Pages.Views.Coins
//                   key={coin}
//                   coin={coinDetail?.coinLogo as string}
//                   coinName={coin}
//                   balance={
//                     1 < (listWallet?.walletList?.length || 0)
//                       ? listWallet?.walletList
//                           ?.filter(({ typeId }) => typeId === coin)
//                           ?.map(({ freeze }) => Math.abs(freeze))
//                           .reduce((a, b) => a + b, 0) || 0
//                       : 0
//                   }
//                   amountType="amount"
//                   amount={
//                     (coinDetail?.bot_status === "binance"
//                       ? coin === mainCurrency
//                         ? prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${coin}_USD`.toUpperCase()
//                           )?.last || 1
//                         : (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${coin}_USDT`.toUpperCase()
//                           )?.last || 1) * nativePrice
//                       : (coinDetail?.current_price as number)) * nativePrice
//                   }
//                 />
//               </Mui.Typography>
//             );
//           })}
//         </Mui.Box>
//       </Components.Global.Container>
//       {/* <Components.Global.Container
//         direction="column"
//         justifyContent="initial"
//         spacing={1}
//         sx={{
//           height: "100%",
//           display: pathname.includes("wallet") ? "flex" : "none",
//         }}
//         customTitle={
//           <Mui.Stack
//             direction={{ xs: "column", md: "row" }}
//             justifyContent="space-between"
//             sx={{ width: "100%" }}
//           >
//             <Mui.Typography variant="h6" color="primary">
//               Coinbase Wallets
//             </Mui.Typography>
//             <Mui.Button variant="contained" disableRipple>
//               Total Balance :
//               <Components.Global.Format
//                 type={nativeCurrency}
//                 number={
//                   (listWallet?.coinBaseWallets
//                     ?.filter((wallet) =>
//                       [
//                         coins?.map((coin) => coin.coin),
//                         coins?.map((coin) => coin.currency),
//                       ]
//                         ?.flat()
//                         ?.includes(wallet.coin)
//                     )
//                     ?.map(({ balance, coin }) => {
//                       return coin === mainCurrency
//                         ? (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${coin}_USD`.toUpperCase()
//                           )?.last || 1) * balance
//                         : (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${coin}_USDT`.toUpperCase()
//                           )?.last || 1) * balance;
//                     })
//                     ?.reduce((a, b) => a + b, 0) || 0) * nativePrice
//                 }
//               />
//             </Mui.Button>
//           </Mui.Stack>
//         }
//       >
//         <Mui.Box>
//           {listWallet?.coinBaseWallets
//             ?.filter((wallet) =>
//               [
//                 coins?.map((coin) => coin.coin),
//                 coins?.map((coin) => coin.currency),
//               ]
//                 ?.flat()
//                 ?.includes(wallet.coin)
//             )
//             ?.sort((a, b) => b.balance - a.balance)
//             ?.map((wallet) => {
//               // const coinDetail = coins?.find(
//               //   (_coin) => _coin.coin === wallet.coin
//               // );
//               return (
//                 <Mui.Typography
//                   variant="h6"
//                   sx={{
//                     minWidth: 150,
//                     width: "fit-content",
//                     float: "left",
//                     border: (theme) => `1px solid ${theme.palette.grey[200]}`,
//                     m: 0.5,
//                     borderRadius: 2,
//                   }}
//                 >
//                   <Pages.Views.Coins
//                     key={wallet.coin}
//                     coin={`/coins/${wallet.coin.toLowerCase()}.png`}
//                     coinName={wallet.coin}
//                     balance={wallet.balance}
//                     amountType="amount"
//                     amount={
//                       wallet.coin === mainCurrency
//                         ? prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${wallet.coin}_USD`.toUpperCase()
//                           )?.last || 1
//                         : (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${wallet.coin}_USDT`.toUpperCase()
//                           )?.last || 1) * nativePrice
//                     }
//                   />
//                 </Mui.Typography>
//               );
//             })}
//         </Mui.Box>
//       </Components.Global.Container> */}
//       {/* <Components.Global.Container
//         direction="column"
//         justifyContent="initial"
//         spacing={1}
//         sx={{
//           height: "100%",
//           display: pathname.includes("wallet") ? "flex" : "none",
//         }}
//         customTitle={
//           <Mui.Stack
//             direction={{ xs: "column", md: "row" }}
//             justifyContent="space-between"
//             sx={{ width: "100%" }}
//           >
//             <Mui.Typography variant="h6" color="primary">
//               Binance Wallets
//             </Mui.Typography>
//             <Mui.Button variant="contained" disableRipple>
//               Total Balance :
//               <Components.Global.Format
//                 type={nativeCurrency}
//                 number={
//                   (listWallet?.binanceWallets
//                     ?.filter((wallet) =>
//                       [
//                         coins?.map((coin) => coin.coin),
//                         coins?.map((coin) => coin.currency),
//                       ]
//                         ?.flat()
//                         ?.includes(wallet.coin)
//                     )
//                     ?.map(({ available, coin }) => {
//                       return coin === mainCurrency
//                         ? (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${coin}_USD`.toUpperCase()
//                           )?.last || 1) * available
//                         : (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${coin}_USDT`.toUpperCase()
//                           )?.last || 1) * available;
//                     })
//                     ?.reduce((a, b) => a + b, 0) || 0) * nativePrice
//                 }
//               />
//             </Mui.Button>
//           </Mui.Stack>
//         }
//       >
//         <Mui.Box>
//           {listWallet?.binanceWallets
//             ?.filter((wallet) =>
//               [
//                 coins?.map((coin) => coin.coin),
//                 coins?.map((coin) => coin.currency),
//               ]
//                 ?.flat()
//                 ?.includes(wallet.coin)
//             )
//             ?.sort((a, b) => b.available - a.available)
//             ?.map((wallet) => {
//               // const coinDetail = coins?.find(
//               //   (_coin) => _coin.coin === wallet.coin
//               // );
//               return (
//                 <Mui.Typography
//                   variant="h6"
//                   sx={{
//                     minWidth: 150,
//                     width: "fit-content",
//                     float: "left",
//                     border: (theme) => `1px solid ${theme.palette.grey[200]}`,
//                     m: 0.5,
//                     borderRadius: 2,
//                   }}
//                 >
//                   <Pages.Views.Coins
//                     key={wallet.coin}
//                     coin={`/coins/${wallet.coin.toLowerCase()}.png`}
//                     coinName={wallet.coin}
//                     balance={wallet.available}
//                     amountType="amount"
//                     onOrder={wallet.onOrder}
//                     amount={
//                       wallet.coin === mainCurrency
//                         ? prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${wallet.coin}_USD`.toUpperCase()
//                           )?.last || 1
//                         : (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${wallet.coin}_USDT`.toUpperCase()
//                           )?.last || 1) * nativePrice
//                     }
//                   />
//                 </Mui.Typography>
//               );
//             })}
//         </Mui.Box>
//       </Components.Global.Container> */}
//       {/* <Components.Global.Container
//         direction="column"
//         justifyContent="initial"
//         spacing={1}
//         sx={{
//           height: "100%",
//           display: pathname.includes("wallet") ? "flex" : "none",
//         }}
//         customTitle={
//           <Mui.Stack
//             direction={{ xs: "column", md: "row" }}
//             justifyContent="space-between"
//             sx={{ width: "100%" }}
//           >
//             <Mui.Typography variant="h6" color="primary">
//               Kucoin Wallets
//             </Mui.Typography>
//             <Mui.Button variant="contained" disableRipple>
//               Total Balance :
//               <Components.Global.Format
//                 type={nativeCurrency}
//                 number={
//                   (listWallet?.kucoinWallets
//                     ?.filter((wallet) =>
//                       [
//                         coins?.map((coin) => coin.coin),
//                         coins?.map((coin) => coin.currency),
//                       ]
//                         ?.flat()
//                         ?.includes(wallet.currency)
//                     )
//                     ?.map(({ available, currency }) => {
//                       return currency === mainCurrency
//                         ? (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${currency}_USD`.toUpperCase()
//                           )?.last || 1) * available
//                         : (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${currency}_USDT`.toUpperCase()
//                           )?.last || 1) * available;
//                     })
//                     ?.reduce((a, b) => a + b, 0) || 0) * nativePrice
//                 }
//               />
//             </Mui.Button>
//           </Mui.Stack>
//         }
//       >
//         <Mui.Box>
//           {listWallet?.kucoinWallets
//             ?.filter(
//               (wallet) =>
//                 [
//                   coins?.map((coin) => coin.coin),
//                   coins?.map((coin) => coin.currency),
//                 ]
//                   ?.flat()
//                   ?.includes(wallet.currency) && wallet.type === "trade"
//             )
//             ?.sort((a, b) => b.available - a.available)
//             ?.map((wallet) => {
//               // const coinDetail = coins?.find(
//               //   (_coin) => _coin.coin === wallet.coin
//               // );
//               return (
//                 <Mui.Typography
//                   variant="h6"
//                   sx={{
//                     minWidth: 150,
//                     width: "fit-content",
//                     float: "left",
//                     border: (theme) => `1px solid ${theme.palette.grey[200]}`,
//                     m: 0.5,
//                     borderRadius: 2,
//                   }}
//                 >
//                   <Pages.Views.Coins
//                     key={wallet.currency}
//                     coin={`/coins/${wallet.currency.toLowerCase()}.png`}
//                     coinName={wallet.currency}
//                     balance={wallet.available}
//                     amountType="amount"
//                     onOrder={wallet.holds}
//                     amount={
//                       wallet.currency === mainCurrency
//                         ? prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${wallet.currency}_USD`.toUpperCase()
//                           )?.last || 1
//                         : (prices.find(
//                             (coinPrice) =>
//                               coinPrice.currency_pair ===
//                               `${wallet.currency}_USDT`.toUpperCase()
//                           )?.last || 1) * nativePrice
//                     }
//                   />
//                 </Mui.Typography>
//               );
//             })}
//         </Mui.Box>
//       </Components.Global.Container> */}
//     </Mui.Stack>
//   );
// };

import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const WalletCard = ({
  coins,
  prices,
  nativeCurrency,
  mainCurrency,
  nativePrice,
}: {
  coins: Hooks.Main.UseCoin.coin[];
  prices: {
    currency_pair: string;
    last: number;
  }[];
  nativeCurrency: string;
  mainCurrency: string;
  nativePrice: number;
}) => {
  const { pathname } = Router.useLocation();
  const { p2pcoinpair } = Hooks.Main.useP2PCoinList();
  const { listWallet, loading } = Hooks.Admin.useUserWalletList();
  const p2pCoins = p2pcoinpair?.coinList
    ? [
        ...new Set(
          p2pcoinpair.coinList
            .filter(({ p2p_active }) => Boolean(p2p_active))
            .map(({ coin }) => coin)
        ),
      ]
    : [];

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={2}>
      <Components.Global.Container
        direction="column"
        justifyContent="initial"
        spacing={1}
        sx={{ height: "100%" }}
        customTitle={
          <Mui.Typography variant="h6" color="primary">
            Escrow Wallets
          </Mui.Typography>
        }
      >
        <Mui.Box>
          {p2pCoins.map((coin) => {
            const coinDetail = coins?.find((_coin) => _coin.coin === coin);
            return (
              <Mui.Typography
                variant="h6"
                sx={{
                  minWidth: 150,
                  width: "fit-content",
                  float: "left",
                  m: 0.5,
                }}
              >
                <Pages.Views.Coins
                  key={coin}
                  coin={coinDetail?.coinLogo as string}
                  coinName={coin}
                  balance={
                    1 < (listWallet?.walletList?.length || 0)
                      ? listWallet?.walletList
                          ?.filter(({ typeId }) => typeId === coin)
                          ?.map(({ freeze }) => Math.abs(freeze))
                          .reduce((a, b) => a + b, 0) || 0
                      : 0
                  }
                  amountType="amount"
                  amount={
                    (coinDetail?.bot_status === "binance"
                      ? coin === mainCurrency
                        ? prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${coin}_USD`.toUpperCase()
                          )?.last || 1
                        : (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${coin}_USDT`.toUpperCase()
                          )?.last || 1) * nativePrice
                      : (coinDetail?.current_price as number)) * nativePrice
                  }
                />
              </Mui.Typography>
            );
          })}
        </Mui.Box>
      </Components.Global.Container>
      <Components.Global.Container
        direction="column"
        justifyContent="initial"
        spacing={1}
        sx={{
          height: "100%",
          display: pathname.includes("wallet") ? "flex" : "none",
        }}
        customTitle={
          <Mui.Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Mui.Typography variant="h6" color="primary">
              Coinbase Wallets
            </Mui.Typography>
            <Mui.Button variant="contained" disableRipple>
              Total Balance :
              <Components.Global.Format
                type={nativeCurrency}
                number={
                  (listWallet?.coinBaseWallets
                    ?.filter((wallet) =>
                      [
                        coins?.map((coin) => coin.coin),
                        coins?.map((coin) => coin.currency),
                      ]
                        ?.flat()
                        ?.includes(wallet.coin)
                    )
                    ?.map(({ balance, coin }) => {
                      return coin === mainCurrency
                        ? (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${coin}_USD`.toUpperCase()
                          )?.last || 1) * balance
                        : (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${coin}_USDT`.toUpperCase()
                          )?.last || 1) * balance;
                    })
                    ?.reduce((a, b) => a + b, 0) || 0) * nativePrice
                }
              />
            </Mui.Button>
          </Mui.Stack>
        }
      >
        <Mui.Box>
          {listWallet?.coinBaseWallets
            ?.filter((wallet) =>
              [
                coins?.map((coin) => coin.coin),
                coins?.map((coin) => coin.currency),
              ]
                ?.flat()
                ?.includes(wallet.coin)
            )
            ?.sort((a, b) => b.balance - a.balance)
            ?.map((wallet) => {
              // const coinDetail = coins?.find(
              //   (_coin) => _coin.coin === wallet.coin
              // );
              return (
                <Mui.Typography
                  variant="h6"
                  sx={{
                    minWidth: 150,
                    width: "fit-content",
                    float: "left",
                    border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                    m: 0.5,
                    borderRadius: 2,
                  }}
                >
                  <Pages.Views.Coins
                    key={wallet.coin}
                    coin={`/coins/${wallet.coin.toLowerCase()}.png`}
                    coinName={wallet.coin}
                    balance={wallet.balance}
                    amountType="amount"
                    amount={
                      wallet.coin === mainCurrency
                        ? prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${wallet.coin}_USD`.toUpperCase()
                          )?.last || 1
                        : (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${wallet.coin}_USDT`.toUpperCase()
                          )?.last || 1) * nativePrice
                    }
                  />
                </Mui.Typography>
              );
            })}
        </Mui.Box>
      </Components.Global.Container>
      {/* <Components.Global.Container
        direction="column"
        justifyContent="initial"
        spacing={1}
        sx={{
          height: "100%",
          display: pathname.includes("wallet") ? "flex" : "none",
        }}
        customTitle={
          <Mui.Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Mui.Typography variant="h6" color="primary">
              Binance Wallets
            </Mui.Typography>
            <Mui.Button variant="contained" disableRipple>
              Total Balance :
              <Components.Global.Format
                type={nativeCurrency}
                number={
                  (listWallet?.binanceWallets
                    ?.filter((wallet) =>
                      [
                        coins?.map((coin) => coin.coin),
                        coins?.map((coin) => coin.currency),
                      ]
                        ?.flat()
                        ?.includes(wallet.coin)
                    )
                    ?.map(({ available, coin }) => {
                      return coin === mainCurrency
                        ? (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${coin}_USD`.toUpperCase()
                          )?.last || 1) * available
                        : (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${coin}_USDT`.toUpperCase()
                          )?.last || 1) * available;
                    })
                    ?.reduce((a, b) => a + b, 0) || 0) * nativePrice
                }
              />
            </Mui.Button>
          </Mui.Stack>
        }
      >
        <Mui.Box>
          {listWallet?.binanceWallets
            ?.filter((wallet) =>
              [
                coins?.map((coin) => coin.coin),
                coins?.map((coin) => coin.currency),
              ]
                ?.flat()
                ?.includes(wallet.coin)
            )
            ?.sort((a, b) => b.available - a.available)
            ?.map((wallet) => {
              // const coinDetail = coins?.find(
              //   (_coin) => _coin.coin === wallet.coin
              // );
              return (
                <Mui.Typography
                  variant="h6"
                  sx={{
                    minWidth: 150,
                    width: "fit-content",
                    float: "left",
                    border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                    m: 0.5,
                    borderRadius: 2,
                  }}
                >
                  <Pages.Views.Coins
                    key={wallet.coin}
                    coin={`/coins/${wallet.coin.toLowerCase()}.png`}
                    coinName={wallet.coin}
                    balance={wallet.available}
                    amountType="amount"
                    onOrder={wallet.onOrder}
                    amount={
                      wallet.coin === mainCurrency
                        ? prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${wallet.coin}_USD`.toUpperCase()
                          )?.last || 1
                        : (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${wallet.coin}_USDT`.toUpperCase()
                          )?.last || 1) * nativePrice
                    }
                  />
                </Mui.Typography>
              );
            })}
        </Mui.Box>
      </Components.Global.Container> */}
      <Components.Global.Container
        direction="column"
        justifyContent="initial"
        spacing={1}
        sx={{
          height: "100%",
          display: pathname.includes("wallet") ? "flex" : "none",
        }}
        customTitle={
          <Mui.Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Mui.Typography variant="h6" color="primary">
              Kucoin Wallets
            </Mui.Typography>
            <Mui.Button variant="contained" disableRipple>
              Total Balance :
              <Components.Global.Format
                type={nativeCurrency}
                number={
                  (listWallet?.kucoinWallets
                    ?.filter((wallet) =>
                      [
                        coins?.map((coin) => coin.coin),
                        coins?.map((coin) => coin.currency),
                      ]
                        ?.flat()
                        ?.includes(wallet.currency)
                    )
                    ?.map(({ available, currency }) => {
                      return currency === mainCurrency
                        ? (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${currency}_USD`.toUpperCase()
                          )?.last || 1) * available
                        : (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${currency}_USDT`.toUpperCase()
                          )?.last || 1) * available;
                    })
                    ?.reduce((a, b) => a + b, 0) || 0) * nativePrice
                }
              />
            </Mui.Button>
          </Mui.Stack>
        }
      >
        <Mui.Box>
          {listWallet?.kucoinWallets
            ?.filter(
              (wallet) =>
                [
                  coins?.map((coin) => coin.coin),
                  coins?.map((coin) => coin.currency),
                ]
                  ?.flat()
                  ?.includes(wallet.currency) && wallet.type === "trade"
            )
            ?.sort((a, b) => b.available - a.available)
            ?.map((wallet) => {
              // const coinDetail = coins?.find(
              //   (_coin) => _coin.coin === wallet.coin
              // );
              return (
                <Mui.Typography
                  variant="h6"
                  sx={{
                    minWidth: 150,
                    width: "fit-content",
                    float: "left",
                    border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                    m: 0.5,
                    borderRadius: 2,
                  }}
                >
                  <Pages.Views.Coins
                    key={wallet.currency}
                    coin={`/coins/${wallet.currency.toLowerCase()}.png`}
                    coinName={wallet.currency}
                    balance={wallet.available}
                    amountType="amount"
                    onOrder={wallet.holds}
                    amount={
                      wallet.currency === mainCurrency
                        ? prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${wallet.currency}_USD`.toUpperCase()
                          )?.last || 1
                        : (prices.find(
                            (coinPrice) =>
                              coinPrice.currency_pair ===
                              `${wallet.currency}_USDT`.toUpperCase()
                          )?.last || 1) * nativePrice
                    }
                  />
                </Mui.Typography>
              );
            })}
        </Mui.Box>
      </Components.Global.Container>
    </Mui.Stack>
  );
};
