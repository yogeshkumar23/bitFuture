import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Components from "src/app/components";

export const ConnectWallet = () => (
  <Components.Global.Dialog fullScreen={false} icon maxWidth="xs">
    <Mui.Stack component={Mui.DialogContent} spacing={2} alignItems="left">
      <Mui.Typography variant="h5">Connect To A Wallet</Mui.Typography>
      <Mui.Typography variant="body2">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore.
      </Mui.Typography>
      <Mui.Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        component={Router.Link}
        to="../choose-nft-coin"
        sx={{
          p: 1,
          px: 2,
          bgcolor: (theme) => `${theme.palette.error.light}20`,
          borderRadius: 3,
          border: (theme) => `1px solid ${theme.palette.error.light}50`,
          textDecoration: "none",
        }}
      >
        <Mui.Typography variant="body1" color="text.primary">
          Metamask
        </Mui.Typography>
        <Mui.Avatar src={Assets.Bitcoin} alt="NFT" />
      </Mui.Stack>
      <Mui.Typography variant="body2">
        By connecting your wallet, you agree to our Terms & Conditions
      </Mui.Typography>
    </Mui.Stack>
  </Components.Global.Dialog>
);
