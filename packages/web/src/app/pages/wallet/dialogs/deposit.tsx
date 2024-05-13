import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import QRCode from "react-qr-code";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Deposit = () => {
  const { state } = Router.useLocation() as {
    state: Hooks.User.coinsWallet;
  };
  const { contentCopy } = Hooks.User.useUtils();
  const { walletDetail, loading } = Hooks.User.useWalletAddress(
    state?.coinId as string,
    state?.type
  );

  return state ? (
    loading && state?.walletAddress === "" ? (
      <Components.Global.GlobalLoader />
    ) : (
      <Components.Global.Dialog maxWidth="xs" icon>
        <Mui.DialogTitle>
          <Mui.Stack direction="row">
            <Mui.Typography variant="h6">Deposit</Mui.Typography>
            <Mui.Typography
              sx={{ mt: 0.5 }}
              variant="subtitle1"
              color="text.secondary"
            >
              ({state?.typeId})
            </Mui.Typography>
          </Mui.Stack>
          <Mui.Divider sx={{ mt: 1 }} />
        </Mui.DialogTitle>
        <Mui.Stack
          component={Mui.DialogContent}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Mui.Stack
            sx={{
              p: 3,
              width: "auto",
              bgcolor: (theme) => `${theme.palette.warning.light}20`,
              borderRadius: 2,
              border: (theme) => `0px solid ${theme.palette.warning.light}50`,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCode
              value={`${walletDetail?.userWallet?.[0]?.network}:${walletDetail?.userWallet?.[0]?.walletAddress}`}
              size={160}
            />
            <Mui.Typography align="center">
              Scan this QR code to deposit
            </Mui.Typography>
          </Mui.Stack>
          <Mui.Typography align="center" textTransform="capitalize">
            Network : {walletDetail?.userWallet?.[0]?.network}
          </Mui.Typography>
          <Mui.TextField
            variant="outlined"
            size="small"
            value={`${
              walletDetail?.userWallet?.[0]?.walletAddress ||
              "Unable to fetch wallet address, Please Try Again Later"
            }`}
            sx={{
              borderRadius: 1,
              bgcolor: "primary.main",
              "& fieldset": {
                borderWidth: 0,
              },
              "& input": {
                color: "#fff",
              },
            }}
            InputProps={{
              endAdornment: (
                <Mui.InputAdornment
                  position="end"
                  component={Mui.IconButton}
                  onClick={() =>
                    contentCopy(
                      `${
                        walletDetail?.userWallet?.[0]?.walletAddress ||
                        "Unable to fetch wallet address, Please try again later"
                      }`
                    )
                  }
                >
                  <MuiIcons.ContentCopy sx={{ color: "#fff" }} />
                </Mui.InputAdornment>
              ),
            }}
            contentEditable={false}
            fullWidth
          />
          <Mui.Alert severity="info" icon={false}>
            <Mui.Typography variant="subtitle1" noWrap>
              Note:
            </Mui.Typography>
            <Mui.Typography variant="caption">
              Scan this QR code to deposit the required amount in your wallet.
              Please verify your account details before initiating the
              transaction.
            </Mui.Typography>
            <Mui.Typography variant="caption" fontWeight="bold">
              {JSON.stringify(
                JSON.parse(
                  walletDetail?.userWallet?.[0]?.additionalAddressInfo || "{}"
                ),
                null,
                4
              ).replaceAll(/([\{\}\,\"\:]|title|details)/g, "")}
            </Mui.Typography>
          </Mui.Alert>
        </Mui.Stack>
      </Components.Global.Dialog>
    )
  ) : (
    <Router.Navigate to=".." />
  );
};
