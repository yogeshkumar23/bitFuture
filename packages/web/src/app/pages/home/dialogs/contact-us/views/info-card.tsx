import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Assets from "src/assets";

export const InfoCard = () => (
  <Mui.Stack
    component={Mui.CardContent}
    direction="column"
    spacing={3}
    sx={{
      bgcolor: "primary.main",
      height: 320,
      borderRadius: 2,
      color: "#fff",
      p: { sm: 5 },
    }}
  >
    {/* <Mui.Stack direction="row">
      <Mui.CardMedia
        component="img"
        src={Assets.Phone}
        sx={{ objectFit: "contain", height: 25, width: 25, mx: 1 }}
      />
      <Mui.Typography variant="body1" color="inherit">
        +221-0000 0000
      </Mui.Typography>
    </Mui.Stack> */}
    <Mui.Stack direction="row">
      <Mui.CardMedia
        component="img"
        src={Assets.Mail}
        sx={{ objectFit: "contain", height: 25, width: 25, mx: 1 }}
      />
      <Mui.Typography variant="body1" color="inherit">
        hello@dooworld.com
      </Mui.Typography>
    </Mui.Stack>
    <Mui.Stack direction="row">
      <Mui.CardMedia
        component="img"
        src={Assets.Mail}
        sx={{ objectFit: "contain", height: 25, width: 25, mx: 1 }}
      />
      <Mui.Typography variant="body1" color="inherit">
        support@dooworld.com
      </Mui.Typography>
    </Mui.Stack>
    <Mui.Box flexGrow={1} />
    {/* <Mui.Stack direction="row">
      <Mui.CardMedia
        component="img"
        src={Assets.Location}
        sx={{ objectFit: "contain", height: 25, width: 25, mx: 1 }}
      />
      <Mui.Stack spacing={1}>
        <Mui.Typography variant="body1" color="inherit">
          Ap #867-859 Sit Rd.
        </Mui.Typography>
        <Mui.Typography variant="body1" color="inherit">
          Azusa New York 39531
        </Mui.Typography>
        <Mui.Typography variant="body1" color="inherit">
          (793) 151-6230
        </Mui.Typography>
      </Mui.Stack>
    </Mui.Stack> */}
    <Mui.Stack
      direction="row"
      spacing={1}
      sx={{
        bgcolor: "primary.dark",
        borderRadius: 10,
        color: "inherit",
        p: 1,
      }}
      justifyContent="center"
    >
      <Mui.IconButton
        component="a"
        target="_blank"
        href=""
      >
        <MuiIcons.Twitter sx={{ color: "#57C7F3" }} />
      </Mui.IconButton>
      <Mui.IconButton
        component="a"
        target="_blank"
        href=""
      >
        <MuiIcons.Facebook sx={{ color: "#57C7F3" }} />
      </Mui.IconButton>
      <Mui.IconButton
        component="a"
        target="_blank"
        href=""
      >
        <MuiIcons.Instagram sx={{ color: "#57C7F3" }} />
      </Mui.IconButton>
      <Mui.IconButton
        component="a"
        target="_blank"
        href="https://t.me/joinchat/G-HplkaTMCvs9Xv-NrilaQ"
      >
        <MuiIcons.Telegram sx={{ color: "#57C7F3" }} />
      </Mui.IconButton>
    </Mui.Stack>
  </Mui.Stack>
);
