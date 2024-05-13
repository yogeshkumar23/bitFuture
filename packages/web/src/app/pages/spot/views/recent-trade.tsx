import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const RecentTrade = ({
  coin,
  recentTrade,
}: {
  coin: Hooks.Main.UseCoin.coin;
  recentTrade: Hooks.Main.BinanceResponse.trade[] | undefined;
}) => {
  const data = recentTrade
    ? recentTrade.slice(0, 15).map((trade) => ({
        price: (
          <Mui.Typography
            variant="inherit"
            color={trade.isBuyerMaker ? "success.main" : "error.main"}
          >
            <Components.Global.Format number={trade.price} type="number" />
          </Mui.Typography>
        ),
        amount: <Components.Global.Format number={trade.qty} type="number" />,
        date: trade.time,
      }))
    : [];
  return (
    <Components.Global.Container
      id="recentTrades"
      justifyContent="flex-start"
      sx={{ width: "100%", height: 440 }}
      customTitle={
        <Mui.Typography variant="subtitle1" fontWeight="bold">
          Recent Trade
        </Mui.Typography>
      }
    >
      <Pages.Spot.Views.Table
        titles={[`Price(${coin?.currency})`, `Amount(${coin?.coin})`, "Time"]}
        data={data}
      />
    </Components.Global.Container>
  );
};
