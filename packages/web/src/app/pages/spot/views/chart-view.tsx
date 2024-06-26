// import * as ApexChart from "apexcharts";
// import Chart from "react-apexcharts";
// import * as Mui from "@mui/material";
// import * as MuiIcons from "@mui/icons-material";
// import React from "react";
// import * as Components from "src/app/components";
// import * as Hooks from "src/app/hooks";

// export const ChartView = React.memo((coin: Hooks.Main.UseCoin.coin) => {
//   const theme = Mui.useTheme();
//   const [range, setRange] = React.useState(24 * 60 * 60 * 1000 * 30);
//   const isMobile = Mui.useMediaQuery(theme.breakpoints.down("sm"));
//   const { data, yMax, yMin } = Hooks.Main.useBinanceTradeChart(
//     coin?.coinId as string,
//     range,
//     coin?.bot_status
//   );

//   const handleChange = React.useCallback(
//     (_: React.SyntheticEvent<Element, Event>, newValue: number) =>
//       setRange(newValue),
//     []
//   );

//   const CandleOptions: ApexChart.ApexOptions = React.useMemo(
//     () => ({
//       chart: {
//         redrawOnParentResize: true,
//         redrawOnWindowResize: true,
//         foreColor: theme.palette.text.primary,
//         type: "candlestick",
//         stacked: true,
//         width: "100%",
//         // toolbar: {
//         //   // show: false,
//         //   tools: {
//         //     pan: false,
//         //     // download: `<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 -3 24 24" data-testid="CameraAltOutlinedIcon"><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"></path></svg>`,
//         //   },
//         // },
//       },
//       xaxis: {
//         min: range ? new Date().getTime() - range : undefined,
//         max: new Date().getTime(),
//         type: "datetime",
//         labels: {
//           datetimeUTC: false,
//         },
//       },
//       yaxis: {
//         min: yMin - (yMax - yMin) / 2,
//         max: yMax + (yMax - yMin) / 2,
//         opposite: true,
//         tooltip: {
//           enabled: true,
//         },
//       },
//       tooltip: {
//         x: {
//           format: "dd MMM yyyy HH:mm",
//         },
//       },
//       // annotations: {
//       //   yaxis: [yAxisLabel],
//       // },
//     }),
//     [yMax, yMin, theme.palette.text.primary]
//   );

//   React.useLayoutEffect(() => {
//     setTimeout(() => {
//       setRange(24 * 60 * 60 * 1000);
//     }, 500);
//   }, []);

//   return (
//     <Components.Global.Container
//       direction="column"
//       id="chartContainer"
//       sx={{
//         minWidth: { xs: "100%" },
//         maxWidth: 600,
//         height: "100%",
//         maxHeight: 440,
//         "& .apexcharts-toolbar": {
//           top: "-20px !important",
//           "& svg": {
//             fill: (theme) =>
//               theme.palette.mode === "dark" ? "#fff" : undefined,
//           },
//         },
//         "& .apexcharts-tooltip": {
//           color: "#000",
//         },
//         "& .apexcharts-menu": {
//           color: "#000",
//         },
//       }}
//     >
//       <Mui.Stack
//         direction="row"
//         justifyContent="space-between"
//         // sx={{ width: "100%" }}
//       >
//         <Mui.Tabs
//           value={range}
//           onChange={handleChange}
//           variant="scrollable"
//           scrollButtons="auto"
//           {...{
//             sx: {
//               mb: -1,
//               px: 1,
//               // maxWidth: 500,
//               width: "fit-content",
//               border: (theme) => `1px solid ${theme.palette.divider}`,
//               borderRadius: 30,
//               minHeight: "unset",
//               "& .MuiTab-root": {
//                 color: (theme) => theme.palette.text.secondary,
//                 borderRadius: 30,
//                 minHeight: "unset",
//                 py: 1,
//                 px: 1.5,
//                 minWidth: "fit-content",
//                 textTransform: "lowercase",
//               },
//             },
//           }}
//         >
//           <Mui.Tab value={24 * 60 * 60 * 1000} label="24h" />
//           <Mui.Tab value={24 * 60 * 60 * 1000 * 30} label="1m" />
//           <Mui.Tab value={24 * 60 * 60 * 1000 * 30 * 3} label="3m" />
//           <Mui.Tab value={24 * 60 * 60 * 1000 * 30 * 6} label="6m" />
//           <Mui.Tab value={24 * 60 * 60 * 1000 * 30 * 12} label="1y" />
//           <Mui.Tab value={24 * 60 * 60 * 1000 * 30 * 12 * 3} label="max" />
//         </Mui.Tabs>
//         <Mui.Tabs
//           variant="scrollable"
//           scrollButtons="auto"
//           {...{
//             sx: {
//               display: "none",
//               mb: -1,
//               maxWidth: 500,
//               width: "fit-content",
//               border: (theme) => `1px solid ${theme.palette.divider}`,
//               borderRadius: 30,
//               minHeight: "unset",
//               "& .MuiTab-root": {
//                 color: (theme) => theme.palette.text.secondary,
//                 borderRadius: 30,
//                 minHeight: "unset",
//                 p: 1,
//                 minWidth: "fit-content",
//                 textTransform: "lowercase",
//               },
//             },
//           }}
//         >
//           <Mui.Tab icon={<MuiIcons.SettingsOutlined fontSize="small" />} />
//           <Mui.Tab icon={<MuiIcons.CameraAltOutlined fontSize="small" />} />
//           <Mui.Tab icon={<MuiIcons.Fullscreen fontSize="small" />} />
//         </Mui.Tabs>
//       </Mui.Stack>
//       <Chart
//         options={CandleOptions}
//         series={[
//           {
//             name: "candlestick",
//             data: data as any,
//           },
//         ]}
//         type="candlestick"
//         height={isMobile ? 330 : 370}
//       />
//     </Components.Global.Container>
//   );
// });

import * as ApexChart from "apexcharts";
import Chart from "react-apexcharts";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const ChartView = React.memo((coin: Hooks.Main.UseCoin.coin) => {
  const theme = Mui.useTheme();
  const [range, setRange] = React.useState(24 * 60 * 60 * 1000 * 30);
  const isMobile = Mui.useMediaQuery(theme.breakpoints.down("sm"));
  const { data, yMax, yMin } = Hooks.Main.useBinanceTradeChart(
    coin?.coinId as string,
    range,
    coin?.bot_status
  );

  const handleChange = React.useCallback(
    (_: React.SyntheticEvent<Element, Event>, newValue: number) =>
      setRange(newValue),
    []
  );

  const CandleOptions: ApexChart.ApexOptions = React.useMemo(
    () => ({
      chart: {
        redrawOnParentResize: true,
        redrawOnWindowResize: true,
        foreColor: theme.palette.text.primary,
        type: "candlestick",
        stacked: true,
        width: "100%",
        // toolbar: {
        //   // show: false,
        //   tools: {
        //     pan: false,
        //     // download: `<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 -3 24 24" data-testid="CameraAltOutlinedIcon"><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"></path></svg>`,
        //   },
        // },
      },
      xaxis: {
        min: range ? new Date().getTime() - range : undefined,
        max: new Date().getTime(),
        type: "datetime",
        labels: {
          datetimeUTC: false,
        },
      },
      yaxis: {
        min: yMin - (yMax - yMin) / 2,
        max: yMax + (yMax - yMin) / 2,
        opposite: true,
        tooltip: {
          enabled: true,
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy HH:mm",
        },
      },
      // annotations: {
      //   yaxis: [yAxisLabel],
      // },
    }),
    [yMax, yMin, theme.palette.text.primary]
  );

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setRange(24 * 60 * 60 * 1000);
    }, 500);
  }, []);

  return (
    <Components.Global.Container
      direction="column"
      id="chartContainer"
      sx={{
        minWidth: { xs: "100%" },
        maxWidth: 600,
        height: "100%",
        maxHeight: 440,
        "& .apexcharts-toolbar": {
          top: "-20px !important",
          "& svg": {
            fill: (theme) =>
              theme.palette.mode === "dark" ? "#fff" : undefined,
          },
        },
        "& .apexcharts-tooltip": {
          color: "#000",
        },
        "& .apexcharts-menu": {
          color: "#000",
        },
      }}
    >
      <Mui.Stack
        direction="row"
        justifyContent="space-between"
        // sx={{ width: "100%" }}
      >
        <Mui.Tabs
          value={range}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          {...{
            sx: {
              mb: -1,
              px: 1,
              // maxWidth: 500,
              width: "fit-content",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 30,
              minHeight: "unset",
              "& .MuiTab-root": {
                color: (theme) => theme.palette.text.secondary,
                borderRadius: 30,
                minHeight: "unset",
                py: 1,
                px: 1.5,
                minWidth: "fit-content",
                textTransform: "lowercase",
              },
            },
          }}
        >
          <Mui.Tab value={24 * 60 * 60 * 1000} label="24h" />
          <Mui.Tab value={24 * 60 * 60 * 1000 * 30} label="1m" />
          <Mui.Tab value={24 * 60 * 60 * 1000 * 30 * 3} label="3m" />
          <Mui.Tab value={24 * 60 * 60 * 1000 * 30 * 6} label="6m" />
          <Mui.Tab value={24 * 60 * 60 * 1000 * 30 * 12} label="1y" />
          <Mui.Tab value={24 * 60 * 60 * 1000 * 30 * 12 * 3} label="max" />
        </Mui.Tabs>
        <Mui.Tabs
          variant="scrollable"
          scrollButtons="auto"
          {...{
            sx: {
              display: "none",
              mb: -1,
              maxWidth: 500,
              width: "fit-content",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 30,
              minHeight: "unset",
              "& .MuiTab-root": {
                color: (theme) => theme.palette.text.secondary,
                borderRadius: 30,
                minHeight: "unset",
                p: 1,
                minWidth: "fit-content",
                textTransform: "lowercase",
              },
            },
          }}
        >
          <Mui.Tab icon={<MuiIcons.SettingsOutlined fontSize="small" />} />
          <Mui.Tab icon={<MuiIcons.CameraAltOutlined fontSize="small" />} />
          <Mui.Tab icon={<MuiIcons.Fullscreen fontSize="small" />} />
        </Mui.Tabs>
      </Mui.Stack>
      <Chart
        options={CandleOptions}
        series={[
          {
            name: "candlestick",
            data: data as any,
          },
        ]}
        type="candlestick"
        height={isMobile ? 330 : 370}
      />
    </Components.Global.Container>
  );
});


// {
//   "symbol": "ADAUSDT",
//   "lastPrice": "0.4323",
//   "highPrice24h": "0.4445",
//   "lowPrice24h": "0.4239",
//   "prevPrice24h": "0.4247",
//   "volume24h": "57428266.67",
//   "turnover24h": "24999975.20357",
//   "price24hPcnt": "0.0179",
//   "usdIndexPrice": ""
// }