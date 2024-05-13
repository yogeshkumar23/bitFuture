import Chart from "react-apexcharts";
import * as Mui from "@mui/material";
import * as Hooks from "src/app/hooks";

export const SmallChart = ({ coin }: { coin: Hooks.Main.UseCoin.coin }) => {
  const theme = Mui.useTheme();
  const { data } = Hooks.Main.useBinanceTradeChart(
    coin?.coinId as string,
    24 * 60 * 60 * 1000,
    coin?.bot_status
  );
  return (
    <Chart
      options={{
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: [
          0 <= coin.price24hChange
            ? theme.palette.success.main
            : theme.palette.error.main,
        ],
        stroke: {
          width: [1.5, 1.5],
          // curve: "smooth",
        },
      }}
      series={[
        {
          name: coin.coinName,
          data: data?.filter((_, index) => Boolean(index % 12)) as any,
        },
      ]}
      type="line"
      height={50}
      width={100}
    />
  );
};
