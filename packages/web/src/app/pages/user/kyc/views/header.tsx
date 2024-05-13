import * as Mui from "@mui/material";
import * as Assets from "src/assets";

export const Header = () => (
  <Mui.Paper
    component={Mui.Stack}
    spacing={3}
    sx={{
      height: { sm: 350 },
      position: "relative",
      overflow: "hidden",
      backgroundImage: `url('${Assets.KycBg}')`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      objectFit: "fill",
      borderRadius: 4,
      p: 4,
    }}
    alignItems="start"
  >
    <Mui.Box sx={{ p: { md: 2 } }} />
    <Mui.Container maxWidth="sm" component={Mui.Stack} spacing={2}>
      <Mui.Typography variant="h5" sx={{ color: "#000" }}>
        Complete KYC registration steps to start Buy and Sell your Assets.
      </Mui.Typography>
      <Mui.Typography variant="body1" sx={{ color: "#000" }}>
        Enter the relevant KYC information on the following form to begin buying
        and selling assets in a few simple steps.
      </Mui.Typography>
    </Mui.Container>
  </Mui.Paper>
);
