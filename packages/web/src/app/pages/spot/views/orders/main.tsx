import * as Mui from "@mui/material";
import React from "react";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Main = ({
  coin,
  CoinBalance,
  loading,
}: {
  coin: Hooks.Main.UseCoin.coin;
  CoinBalance: Contexts.userContext.coinsWallet[];
  loading: boolean;
}) => {
  const [index, setIndex] = React.useState(1);

  const amountBalance = React.useMemo(() => {
    const amountBalanceInfo = CoinBalance?.find(
      ({ typeId }) => typeId === coin.currency
    ) || { balance: 0, freeze: 0 };
    return amountBalanceInfo.balance - Math.abs(amountBalanceInfo.freeze);
  }, [coin.coinId, loading]);
  const coinBalance = React.useMemo(() => {
    const coinBalanceInfo = CoinBalance?.find(
      ({ typeId }) => typeId === coin.coin
    ) || {
      balance: 0,
      freeze: 0,
    };
    return coinBalanceInfo.balance - Math.abs(coinBalanceInfo.freeze);
  }, [coin.coinId, loading]);
  const handleClick = (i: number) => setIndex(i);

  return (
    <Components.Global.Container
      justifyContent="flex-start"
      spacing={1}
      sx={{
        width: "100%",
        minHeight: "100%",
      }}
      customTitle={
        <Mui.Typography
          variant="subtitle1"
          color="primary.main"
          fontWeight="bold"
        >
          Spot
        </Mui.Typography>
      }
    >
      <Mui.Stack spacing={1.5} sx={{ pt: 2, height: "100%" }}>
        <Mui.Stack direction="row" justifyContent="space-between">
          {["limit", "market", "stop-limit"].map((text, i) => (
            <Mui.Button
              size="small"
              key={i}
              id={text}
              variant={index === i ? "contained" : "outlined"}
              onClick={() => handleClick(i)}
              // disabled={text !== "market" && coin.bot_status === "binance"}
              sx={{
                textTransform: "capitalize",
                color: index === i ? undefined : "text.secondary",
                borderColor: index === i ? "primary.main" : "text.secondary",
              }}
            >
              <Mui.Typography noWrap fontSize="inherit" color="inherit">
                {text}
              </Mui.Typography>
            </Mui.Button>
          ))}
        </Mui.Stack>
        <Pages.Spot.Views.Orders.Balance
          amountBalance={amountBalance}
          coinBalance={coinBalance}
          coin={coin}
        />
      </Mui.Stack>
      {
        {
          0: (
            <Pages.Spot.Views.Orders.Limit
              amountBalance={amountBalance}
              coinBalance={coinBalance}
              coin={coin}
            />
          ),
          1: (
            <Pages.Spot.Views.Orders.Market
              amountBalance={amountBalance}
              coinBalance={coinBalance}
              coin={coin}
            />
          ),
          2: (
            <Pages.Spot.Views.Orders.StopLimit
              amountBalance={amountBalance}
              coinBalance={coinBalance}
              coin={coin}
            />
          ),
        }[index]
      }
    </Components.Global.Container>
  );
};
