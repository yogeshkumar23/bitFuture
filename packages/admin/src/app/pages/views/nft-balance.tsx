import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const NFTBalance = () => {
  const { account, balance, connect, authenticated, syncedAccount } =
    Hooks.Main.useNFT();

  return account ? (
    <Mui.Stack>
      <Mui.Typography variant="body2" noWrap>
        ID: {account}{" "}
      </Mui.Typography>
      <Mui.Typography variant="body2" color="primary">
        {authenticated ? (
          <>
            Balance:{" "}
            <Components.Global.Format number={balance} type="coin" coin="ETH" />
          </>
        ) : syncedAccount ? (
          "Account not synced with this user"
        ) : (
          ""
        )}
      </Mui.Typography>
    </Mui.Stack>
  ) : (
    <Mui.Button
      variant="outlined"
      sx={{ borderRadius: 20, height: "fit-content" }}
      onClick={connect}
    >
      Connect to Wallet
    </Mui.Button>
  );
};
