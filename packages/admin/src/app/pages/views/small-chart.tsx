import Chart from "react-apexcharts";

export const SmallChart = ({ series }: { series: any[] }) => (
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
      stroke: {
        curve: "smooth",
      },
    }}
    series={series}
    type="line"
    height={50}
    width={100}
  />
);
