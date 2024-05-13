import * as ApexChart from "apexcharts";

export const CandleOptions: ApexChart.ApexOptions = {
  chart: {
    height: 450,
    type: "candlestick",
    stacked: true,
  },
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    opposite: true,
    tooltip: {
      enabled: true,
    },
  },
};
