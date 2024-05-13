import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";

export const OrderBox = ({
  coinWalletDetails,
}: {
  coinWalletDetails: Hooks.User.coinsWallet[];
}) => {
  const navigate = Router.useNavigate();
  const { verified } = Hooks.User.useUserKYC(false);
  const { coin, type } = Router.useParams();
  const handleNavigate = () => {
    navigate(
      verified
        ? `${Constants.API_CONFIG.base}p2p/${coin}/${type}/new-order`
        : `${Constants.API_CONFIG.base}kyc/warning`,
      {
        state: coinWalletDetails,
      }
    );
  };
  return (
    <Components.Global.Container
      direction="column"
      spacing={3}
      sx={{ py: 4, height: "100%" }}
    >
      <Mui.Typography variant="h5" fontWeight={900}>
        P2P: Buy/Sell Your Asset Locally
      </Mui.Typography>
      <Mui.Typography variant="body1">
        Peer-to-peer exchange (or P2P exchange) is a marketplace where people
        can trade asset directly with each other on their own terms, in
        virtually any country.
      </Mui.Typography>
      <Mui.Stack direction="row" spacing={2}>
        <Mui.Button
          id="postOrder"
          startIcon={<MuiIcons.Add />}
          variant="contained"
          onClick={handleNavigate}
          size="large"
          sx={{
            width: 150,
            fontWeight: 900,
            borderWidth: 2,
            "&:hover": { borderWidth: 2 },
          }}
        >
          <Mui.Typography variant="body1">New Order</Mui.Typography>
        </Mui.Button>

        <Mui.Button
          id="myads"
          component={Router.Link}
          variant="outlined"
          to="my-orders"
          size="large"
          sx={{
            width: 150,
            fontWeight: 900,
            borderWidth: 2,
            "&:hover": { borderWidth: 2 },
          }}
        >
          <Mui.Typography variant="body1">My Orders</Mui.Typography>
        </Mui.Button>
      </Mui.Stack>
    </Components.Global.Container>
  );
};
