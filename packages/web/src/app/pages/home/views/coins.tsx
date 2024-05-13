import * as Mui from "@mui/material";

export const CoinFloat = ({ sx, src }: Mui.CardMediaProps) => (
  <Mui.CardMedia
    component="img"
    src={src}
    sx={{
      position: "absolute",
      height: 50,
      width: 50,
      animation: "mymove 5s infinite",
      // opacity: ".4",
      background: "#0a2e7d",
      borderRadius: "50%",
      ...sx,
    }}
  />
);
