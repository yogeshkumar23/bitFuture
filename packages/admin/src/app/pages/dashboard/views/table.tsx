import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Api from "src/api";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Table = ({ coins }: { coins: Hooks.Main.UseCoin.coin[] }) => {
  const {
    prices,
    nativeCurrency,
    nativePrice,
    loading: priceLoading,
  } = Hooks.Main.useCoinPairPrices();
  const [statics, setStatics] = React.useState<
    { symbol: string; priceChange: number; priceChangePercent: number }[]
  >([]);
  React.useEffect(() => {
    Api.Server.Client.get(
      `${Constants.API_CONFIG.binanceAPI}/ticker/24hr`
    ).then((res) => setStatics(res.data));
  }, []);

  return priceLoading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Components.Global.Container direction="column">
      <Mui.Typography variant="h5" sx={{ pb: 3 }}>
        Coin Pairs
      </Mui.Typography>
      <Mui.TableContainer>
        <Mui.Table
          stickyHeader
          component={Mui.Paper}
          elevation={1}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            "& .MuiTableCell-root": {
              bgcolor: "transparent",
            },
          }}
        >
          <Mui.TableHead
            sx={{
              bgcolor: (theme) => `${theme.palette.primary.main}20`,
            }}
          >
            <Mui.TableRow>
              <Mui.TableCell>Name</Mui.TableCell>
              <Mui.TableCell>Current Price</Mui.TableCell>
              <Mui.TableCell>24h Change</Mui.TableCell>
              <Mui.TableCell>Status</Mui.TableCell>
              <Mui.TableCell>Bot Status</Mui.TableCell>
            </Mui.TableRow>
          </Mui.TableHead>
          {coins
            // ?.filter(({ active }) => Boolean(active))
            .map((coin, index) => (
              <Mui.TableRow key={index}>
                <Mui.TableCell>
                  <Mui.Stack direction="row" alignItems="center" spacing={2}>
                    <Mui.CardMedia
                      component="img"
                      src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                        import.meta.env.VITE_API_IP
                      }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
                      sx={{ width: 40, borderRadius: 20 }}
                    />
                    <Mui.Typography variant="h6" noWrap>
                      {coin.coinName}
                      <Mui.Typography variant="body2" color="text.secondary">
                        {coin.coin}
                      </Mui.Typography>
                    </Mui.Typography>
                  </Mui.Stack>
                </Mui.TableCell>
                <Mui.TableCell>
                  <Mui.Typography variant="body1">
                    <Components.Global.Format
                      number={
                        (coin.bot_status === "off"
                          ? coin.current_price
                          : prices.find(
                              (coinPrice) =>
                                coinPrice.currency_pair ===
                                `${coin.coin}_${coin.currency}`.toUpperCase()
                            )?.last || 0) * nativePrice
                      }
                      type={nativeCurrency}
                    />
                  </Mui.Typography>
                </Mui.TableCell>
                <Mui.TableCell>
                  <Mui.Typography
                    variant="body1"
                    color={
                      0 <=
                      parseFloat(
                        `${
                          coin?.bot_status === "off"
                            ? coin?.price24hChange
                            : statics?.find(
                                (detail) =>
                                  detail.symbol ===
                                  `${coin.coin}${coin.currency}`
                              )?.priceChangePercent
                        }`.replace("%", "")
                      )
                        ? "success.main"
                        : "error.main"
                    }
                    component={Mui.Stack}
                    direction="row"
                  >
                    {0 <=
                    parseFloat(
                      `${
                        coin?.bot_status === "off"
                          ? coin?.price24hChange
                          : statics?.find(
                              (detail) =>
                                detail.symbol === `${coin.coin}${coin.currency}`
                            )?.priceChangePercent
                      }`.replace("%", "")
                    ) ? (
                      <MuiIcons.ArrowDropUp color="success" />
                    ) : (
                      <MuiIcons.ArrowDropDown color="error" />
                    )}{" "}
                    <Components.Global.Format
                      type="percentage"
                      number={parseFloat(
                        `${
                          coin?.bot_status === "off"
                            ? coin?.price24hChange
                            : statics?.find(
                                (detail) =>
                                  detail.symbol ===
                                  `${coin.coin}${coin.currency}`
                              )?.priceChangePercent
                        }`.replace("%", "")
                      )}
                      negative
                    />
                  </Mui.Typography>
                </Mui.TableCell>
                <Mui.TableCell>
                  <Mui.Typography
                    variant="body1"
                    color={coin.active ? "success.main" : "error.main"}
                  >
                    {coin.active ? "Active" : "Inactive"}
                  </Mui.Typography>
                </Mui.TableCell>
                <Mui.TableCell>
                  <Mui.Typography variant="body1">
                    {coin.bot_status}
                  </Mui.Typography>
                </Mui.TableCell>
              </Mui.TableRow>
            ))}
        </Mui.Table>
      </Mui.TableContainer>
    </Components.Global.Container>
  );
};
