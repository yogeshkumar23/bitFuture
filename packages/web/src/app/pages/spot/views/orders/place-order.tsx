import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";

export const PlaceOrder = (props: MuiLab.LoadingButtonProps) => {
  const { verified } = Hooks.User.useUserKYC(false);
  return (
    <Mui.Stack
      id="placeOrder"
      sx={{ mt: { lg: "auto !important" }, mb: { lg: 0 } }}
    >
      {verified ? (
        <MuiLab.LoadingButton
          {...props}
          size="small"
          variant="contained"
          fullWidth
        >
          Place a Order
        </MuiLab.LoadingButton>
      ) : (
        <MuiLab.LoadingButton
          component={Router.Link}
          to={`${Constants.API_CONFIG.base}kyc/warning`}
          size="small"
          variant="contained"
          fullWidth
        >
          Place a Order
        </MuiLab.LoadingButton>
      )}
    </Mui.Stack>
  );
};
