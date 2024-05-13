import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const NFTBalance = () => {
  const { account, balance, connect, authenticated, syncedAccount } =
    React.useContext(Contexts.UserContext);
  const { contentCopy } = Hooks.User.useUtils();

  return account ? (
    <>
      <Mui.Stack
        id="metamaskBalance"
        sx={{
          borderRadius: 5,
          border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          p: 1,
        }}
      >
        <Pages.Views.IntroJSConfig name="nftBalance" />
        <Mui.Stack direction="row" alignItems="center">
          <Mui.Typography variant="inherit" width={200} noWrap>
            ID: {account}{" "}
          </Mui.Typography>
          <Mui.IconButton size="small" onClick={() => contentCopy(account)}>
            <MuiIcons.CopyAll fontSize="inherit" color="primary" />
          </Mui.IconButton>
        </Mui.Stack>
        <Mui.Typography variant="body2" color="primary">
          {authenticated ? (
            <>
              Balance:{" "}
              <Components.Global.Format
                number={balance}
                type="coin"
                coin="ETH"
              />
            </>
          ) : syncedAccount ? (
            "Account not synced with this user"
          ) : (
            ""
          )}
        </Mui.Typography>
      </Mui.Stack>
    </>
  ) : (
    <Mui.Button
      id="connectMetamask"
      variant="outlined"
      sx={{ borderRadius: 20, width: "fit-content", height: "fit-content" }}
      onClick={connect}
    >
      <Pages.Views.IntroJSConfig name="nftConnect" />
      Connect to Wallet
    </Mui.Button>
  );
};
