import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";
import * as Api from "src/api";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const SpotTable = ({
  prices,
  nativePrice,
  nativeCurrency,
  mainCurrency,
  coinList,
  user,
}: {
  prices: {
    currency_pair: string;
    last: number;
  }[];
  nativePrice: number;
  nativeCurrency: string;
  mainCurrency: string;
  coinList: Hooks.Main.UseCoin.coin[];
  user: Contexts.userContext.User | undefined;
}) => {
  const [statics, setStatics] = React.useState<
    { symbol: string; priceChange: number; priceChangePercent: number }[]
  >([]);
  React.useEffect(() => {
    Api.Server.Client.get(
      `${Constants.API_CONFIG.binanceAPI}/ticker/24hr`
    ).then((res) => setStatics(res.data));
  }, []);
  return (
    <>
      <Mui.Table
        stickyHeader
        component={Mui.Paper}
        elevation={0}
        sx={{
          borderRadius: 3,
          display: { xs: "none", sm: "table" },
          bgcolor: "transparent",
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
            <Mui.TableCell>Last Price</Mui.TableCell>
            <Mui.TableCell>24h Change</Mui.TableCell>
            <Mui.TableCell>Market</Mui.TableCell>
            <Mui.TableCell></Mui.TableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        {coinList
          ?.filter(
            ({ active, currency }) =>
              Boolean(active) && currency === mainCurrency
          )
          ?.slice(0, 10)
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
                        : prices?.find(
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
                                detail.symbol === `${coin.coin}${coin.currency}`
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
                                detail.symbol === `${coin.coin}${coin.currency}`
                            )?.priceChangePercent
                      }`.replace("%", "")
                    )}
                    negative
                  />
                </Mui.Typography>
              </Mui.TableCell>
              <Mui.TableCell>
                <Pages.Home.Views.SmallChart
                  coin={{
                    ...coin,
                    price24hChange: parseFloat(
                      `${
                        coin?.bot_status === "off"
                          ? coin?.price24hChange
                          : statics?.find(
                              (detail) =>
                                detail.symbol === `${coin.coin}${coin.currency}`
                            )?.priceChangePercent
                      }`.replace("%", "")
                    ),
                  }}
                />
              </Mui.TableCell>
              <Mui.TableCell align="right">
                <Mui.Button
                  id="buyCoins"
                  variant="contained"
                  sx={{ width: 80, borderRadius: 10 }}
                  component={Router.Link}
                  to={
                    !Boolean(user?.email)
                      ? `${Constants.API_CONFIG.base}account/login`
                      : `spot/${coin.coin}_${coin.currency}`
                  }
                >
                  Buy
                </Mui.Button>
              </Mui.TableCell>
            </Mui.TableRow>
          ))}
      </Mui.Table>
      <Mui.Box sx={{ display: { xs: "block", sm: "none" } }}>
        {coinList
          ?.filter(
            ({ active, currency }) =>
              Boolean(active) && currency === mainCurrency
          )
          ?.slice(0, 10)
          ?.map((coin, index) => (
            <Mui.Card
              key={index}
              elevation={3}
              sx={{
                p: 2,
                m: { xs: 1, md: 3 },
                borderRadius: 3,
                display: { xs: "block", sm: "none" },
              }}
            >
              <Mui.Grid container spacing={2}>
                <Mui.Grid item xs={12}>
                  <Mui.Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
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
                    <Mui.Typography variant="h6">
                      <Components.Global.Format
                        number={
                          (coin.bot_status === "off"
                            ? coin.current_price
                            : prices?.find(
                                (coinPrice) =>
                                  coinPrice.currency_pair ===
                                  `${coin.coin}_${coin.currency}`.toUpperCase()
                              )?.last || 0) * nativePrice
                        }
                        type={nativeCurrency}
                      />
                    </Mui.Typography>
                  </Mui.Stack>
                </Mui.Grid>
                <Mui.Grid item xs={12}>
                  <Mui.Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Components.Global.StackLabel
                      title="24h Change"
                      labelColor={
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
                          ? "success"
                          : "error"
                      }
                      label={
                        <Mui.Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          {0 <=
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
                        </Mui.Stack>
                      }
                      node
                    />
                    <Pages.Home.Views.SmallChart
                      coin={{
                        ...coin,
                        price24hChange: parseFloat(
                          `${
                            coin?.bot_status === "off"
                              ? coin?.price24hChange
                              : statics?.find(
                                  (detail) =>
                                    detail.symbol ===
                                    `${coin.coin}${coin.currency}`
                                )?.priceChangePercent
                          }`.replace("%", "")
                        ),
                      }}
                    />
                    <Mui.Button
                      variant="contained"
                      component={Router.Link}
                      to={
                        !Boolean(user?.email)
                          ? `${Constants.API_CONFIG.base}account/login`
                          : `spot/${coin.coin}_${coin.currency}`
                      }
                      sx={{ borderRadius: 10 }}
                    >
                      Buy
                    </Mui.Button>
                  </Mui.Stack>
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Card>
          ))}
      </Mui.Box>
    </>
  );
};
