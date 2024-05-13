import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import QRcode from "react-qr-code";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";

export const ScanNFT = () => (
  <Components.Global.Dialog maxWidth="xs" icon>
    <Mui.DialogTitle>
      <Mui.Stack direction="row">
        <Mui.Typography variant="h6">Scan Code</Mui.Typography>
      </Mui.Stack>
      <Mui.Divider />
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
        spacing={2}
      >
        <QRcode value="https://www.google.com" size={160} />
        <Mui.Typography align="center">
          Scan this QR code to to connect your wallet
        </Mui.Typography>
      </Mui.Stack>
      <Mui.TextField
        variant="outlined"
        size="small"
        value="TITA876575hb7i9"
        sx={{
          textAlign: "center",
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
              component={Router.Link}
              to="../select-nft"
            >
              <MuiIcons.ContentCopy sx={{ color: "#fff" }} />
            </Mui.InputAdornment>
          ),
        }}
        contentEditable={false}
        fullWidth
      />
    </Mui.Stack>
  </Components.Global.Dialog>
);
