import * as Mui from "@mui/material";
import * as Assets from "src/assets";
import * as Components from "src/app/components";

export const Invest = () => (
  <Mui.Grid
    item
    sx={{
      height: { xs: "fit-content", md: "100vh" },
      position: "relative",
      overflow: "hidden",
      backgroundImage: `url('${Assets.InvestCrypto}')`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: 0,
    }}
    xs={12}
  >
    <Mui.Stack
      sx={{
        py: 2,
        height: "89%",
        backgroundImage: `url('${Assets.WhyBg}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      alignItems="center"
      justifyContent="center"
      spacing={3}
    >
      <Mui.Typography
        variant="h4"
        textAlign="center"
        fontWeight={900}
        sx={{
          color: "#fff",
          pt: 5,
        }}
      >
        Why Doo World?
      </Mui.Typography>
      <Mui.Typography
        variant="h6"
        textAlign="center"
        sx={{
          color: "#fff",
          py: 1,
        }}
      >
        The World’s Digital assets market alone is valued above $3 Trillion, but
        with so much limitation to access these different asset classes; Doo
        World provides a tremendous gateway to a whole new dimension where you
        can explore the gains of these Universal Assets.
      </Mui.Typography>

      <Mui.Stack
        spacing={2}
        justifyContent="space-around"
        sx={{
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-end" },
        }}
      >
        <Components.Global.InfoCard
          image={Assets.Universal}
          title="Universal Access"
          content="You can access your virtual assets at any time and from anywhere on the globe using our platform-compatible and easy-to-use exchange solution."
        />
        <Components.Global.InfoCard
          image={Assets.SecureStorage}
          title="Secure Storage"
          content="Our exchange platform, which is powered by blockchain technology, tends to offer you unprecedented levels of security."
        />
        <Components.Global.InfoCard
          image={Assets.SecureTransfer}
          title="Rapid Transactions"
          content="Assets are securely transferred to the destination in seconds, regardless of their size or location."
        />
      </Mui.Stack>
    </Mui.Stack>
  </Mui.Grid>
);
