import * as Mui from "@mui/material";

export const NFTInstall = () => (
  <Mui.Button
    variant="outlined"
    sx={{ borderRadius: 20, height: "fit-content" }}
    download
    href="https://metamask.io/download.html"
  >
    Install MetaMask
  </Mui.Button>
);
