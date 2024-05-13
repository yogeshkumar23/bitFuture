import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";

export const CancelOrder = () => {
  const { user } = React.useContext(Contexts.UserContext);
  const { loading, cancel } = Hooks.Main.useP2PTrade(user?.uid as string);
  const { state } = Router.useLocation() as { state: { trade: p2pTrade } };
  const navigate = Router.useNavigate();
  const handleCancel = async () => {
    await cancel(state?.trade?.tradeId as string);
    navigate(-1);
  };
  return (
    <Components.Global.Dialog fullScreen={false} icon>
      <Mui.Stack component={Mui.DialogContent} spacing={2} alignItems="center">
        <Mui.Typography variant="h5">Cancel Ad</Mui.Typography>
        <Mui.Typography>Are you sure you want to cancel the Ad?</Mui.Typography>
        <Mui.Grid
          container
          spacing={2}
          sx={{
            p: 2,
            width: "fit-content",
            bgcolor: (theme) => `${theme.palette.error.light}20`,
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.error.light}50`,
          }}
        >
          <Mui.Grid item xs={6} sm={4}>
            <Components.Global.StackLabel
              medium
              title="Type"
              label="Buy"
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={4}>
            <Components.Global.StackLabel
              medium
              title="Asset currency"
              label={state?.trade?.currency}
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={4}>
            <Components.Global.StackLabel
              medium
              title="Price"
              label={
                <Components.Global.Format
                  number={state?.trade?.pricePerCoin}
                  type="coin"
                  coin={state?.trade?.currency}
                />
              }
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={4}>
            <Components.Global.StackLabel
              medium
              title="Quantity"
              label={
                <Components.Global.Format
                  number={state?.trade?.noOfCoins}
                  type="coin"
                  coin={state?.trade?.coin}
                />
              }
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={4}>
            <Components.Global.StackLabel
              medium
              title="Limit"
              label={`${state?.trade?.priceLimitFrom} ${state?.trade?.currency} - ${state?.trade?.priceLimitTo} ${state?.trade?.currency}`}
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={4}>
            <Components.Global.StackLabel
              medium
              title="Payment Type"
              label={
                +state?.trade?.prefferedPayment === 0
                  ? "All Payments"
                  : state?.trade?.prefferedPayment
              }
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6}>
            <Components.Global.StackLabel
              medium
              title="Post Show Till"
              label={state?.trade?.showPostTill}
              time
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Stack direction="row" spacing={2} mt={2}>
          <MuiLab.LoadingButton
            variant="contained"
            size="large"
            color="error"
            loading={loading}
            onClick={handleCancel}
          >
            Yes, Delete
          </MuiLab.LoadingButton>
          <Mui.Button
            variant="outlined"
            size="large"
            component={Router.Link}
            to=".."
          >
            No, Cancel
          </Mui.Button>
        </Mui.Stack>
      </Mui.Stack>
    </Components.Global.Dialog>
  );
};
