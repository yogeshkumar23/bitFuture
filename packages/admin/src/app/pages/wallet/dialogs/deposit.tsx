import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import QRCode from "react-qr-code";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Deposit = () => {
  const { state } = Router.useLocation() as {
    state: Hooks.User.coinWallet;
  };
  const { contentCopy } = Hooks.User.useUtils();

  return (
    <Components.Global.Dialog maxWidth="xs" icon>
      <Mui.DialogTitle>
        <Mui.Stack direction="row">
          <Mui.Typography variant="h6">Deposit</Mui.Typography>
          <Mui.Typography
            sx={{ mt: 0.5 }}
            variant="subtitle1"
            color="text.secondary"
          >
            (ETH)
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
            value={`${state?.network}:${state?.walletAddress}`}
            size={160}
          />
          <Mui.Typography align="center">
            Scan this QR code to deposit
          </Mui.Typography>
        </Mui.Stack>
        <Mui.Typography align="center" textTransform="capitalize">
          Network : {state?.network}
        </Mui.Typography>
        <Mui.TextField
          variant="outlined"
          size="small"
          value={`${state?.walletAddress}`}
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
                onClick={() => contentCopy(`${state?.walletAddress}`)}
              >
                <MuiIcons.ContentCopy sx={{ color: "#fff" }} />
              </Mui.InputAdornment>
            ),
          }}
          contentEditable={false}
          fullWidth
        />
        <Mui.Box>
          <Mui.Typography variant="subtitle1" noWrap>
            Note:
          </Mui.Typography>
          <Mui.Typography variant="caption">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </Mui.Typography>
        </Mui.Box>
      </Mui.Stack>
    </Components.Global.Dialog>
  );
};
