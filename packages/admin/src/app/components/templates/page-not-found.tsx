import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Assets from "src/assets";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export const PageNotFound = () => (
  <Mui.Stack
    alignItems="center"
    justifyContent="center"
    sx={{ height: "100vh", position: "relative", overflow: "hidden" }}
  >
    <Mui.CardMedia
      component="img"
      src={Assets.Banner}
      sx={{ zIndex: -1, position: "absolute", height: "100%" }}
    />
    {/* <Mui.CardMedia
      component="img"
      src={Assets.Logo}
      sx={{
        zIndex: -1,
        position: "absolute",
        height: 550,
        width: 500,
        top: "20%",
        left: "55%",
      }}
    /> */}
    <Components.Main.MainCenterLogoWHITE />
    <Mui.Typography
      variant="h4"
      textAlign="center"
      sx={{ display: "flex", alignItems: "center", color: "#fff" }}
    >
      <MuiIcons.Error fontSize="inherit" />
      Page Not Found
    </Mui.Typography>
    {/* <Mui.Stack
      sx={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: { xs: "100%", md: "40%" },
        height: "80%",
        padding: "8% 0%",
      }}
    >
      <Pages.Home.Views.CoinFloat
        src={Assets.CardanoSvg}
        sx={{
          top: "-10%",
          right: "30%",
          animationDelay: "1.5s",
        }}
      />
      <Pages.Home.Views.CoinFloat
        src={Assets.SolanaSvg}
        sx={{
          bottom: "0",
          right: "5%",
          animationDelay: "2.5s",
        }}
      />
    </Mui.Stack>
    <Mui.Stack
      sx={{
        position: "absolute",
        top: "10%",
        right: "1%",
        width: "60%",
        height: "80%",
        display: { xs: "none", md: "block" },
      }}
    >
      <Pages.Home.Views.CoinFloat
        src={Assets.EthereumSvg}
        sx={{
          top: "1%",
          left: "25%",
        }}
      />
      <Pages.Home.Views.CoinFloat
        src={Assets.DollarSvg}
        sx={{
          bottom: "15%",
          left: "35%",
          animationDelay: "1.5s",
        }}
      />
      <Pages.Home.Views.CoinFloat
        src={Assets.BitcoinSvg}
        sx={{
          top: "10%",
          right: "30%",
          animationDelay: "0.5s",
        }}
      />
      <Pages.Home.Views.CoinFloat
        src={Assets.YuanSvg}
        sx={{
          top: "50%",
          right: "10%",
          animationDelay: "2s",
        }}
      />
    </Mui.Stack> */}
  </Mui.Stack>
);
