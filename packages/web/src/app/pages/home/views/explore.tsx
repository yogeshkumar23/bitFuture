import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Assets from "src/assets";

export const Explore = () => (
  <Mui.Grid
    item
    container
    sx={{
      height: { xs: "150vh", md: "106vh" },
      position: "relative",
      overflow: "hidden",
      backgroundImage: `url('${Assets.Explore}')`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      objectFit: "fill",
      px: { xs: 1, md: 10 },
      pt: { xs: 25, md: 20 },
    }}
    xs={12}
    alignItems="center"
    justifyContent="center"
  >
    <Mui.Grid
      item
      xs={12}
      md={6}
      sx={{
        p: 1,
        color: "#fff",
      }}
    >
      <Mui.Typography
        sx={{
          fontWeight: "700",
          lineHeight: "4rem",
          paddingBottom: "1rem",
        }}
        variant="h3"
      >
        Explore Our App
      </Mui.Typography>
      <Mui.Typography
        sx={{
          paddingBottom: "3rem",
        }}
        variant="body1"
      >
        Do you want to explore the gains of a digital Assets universe? Let’s
        show you the way! Take advantage of your advanced tools and the
        following leverages,
      </Mui.Typography>
      <Mui.Typography
        sx={{
          paddingBottom: "1rem",
          display: "flex",
          alignItems: "center",
        }}
        variant="body1"
      >
        <MuiIcons.CheckCircle sx={{ color: "info.light", mx: 1 }} />
        Non-stop uptime
      </Mui.Typography>
      <Mui.Typography
        sx={{
          paddingBottom: "1rem",
          display: "flex",
          alignItems: "center",
        }}
        variant="body1"
      >
        <MuiIcons.CheckCircle sx={{ color: "info.light", mx: 1 }} />
        Streamlined exchange platform
      </Mui.Typography>
      <Mui.Typography
        sx={{
          paddingBottom: "1rem",
          display: "flex",
          alignItems: "center",
        }}
        variant="body1"
      >
        <MuiIcons.CheckCircle sx={{ color: "info.light", mx: 1 }} />
        Transactions that are both fast and safe
      </Mui.Typography>
    </Mui.Grid>
    <Mui.Grid item xs={12} md={6}>
      <Mui.CardMedia component="img" src={Assets.IMac} sx={{ width: "100%" }} />
    </Mui.Grid>
  </Mui.Grid>
);
