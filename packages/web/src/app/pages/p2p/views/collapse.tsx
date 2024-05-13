import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const CollapseData = (
  props: p2pTrade & {
    coinWalletDetails: Hooks.User.coinsWallet[];
  }
) => {
  const {
    coin,
    currency,
    noOfCoins,
    tradedCoins,
    pricePerCoin,
    quantityLimitFrom,
    quantityLimitTo,
    prefferedPayment,
    showPostTill,
  } = props;
  return (
    <Mui.Collapse in={true} timeout="auto" unmountOnExit>
      <Mui.Grid
        container
        component={Mui.Paper}
        sx={{
          width: "100%",
          p: { xs: 0, sm: 1.5 },
          boxShadow: (theme) => ({
            md: `0 0 5px ${theme.palette.text.primary}`,
          }),
        }}
        borderRadius={2}
      >
        <Mui.Grid
          item
          xs={12}
          md={8}
          container
          sx={{
            bgcolor: (theme) => `${theme.palette.error.light}20`,
            p: 3,
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.error.light}50`,
          }}
        >
          <Mui.Grid item xs={6} md={4}>
            <Components.Global.StackLabel
              medium
              title="Advertiser"
              titleColor="primary"
              label={props.userName}
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} md={4}>
            <Components.Global.StackLabel
              medium
              title="Traded coins" //"Orders completed"
              titleColor="primary"
              label={tradedCoins}
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} md={4}>
            <Components.Global.StackLabel
              medium
              title="Price/Coin"
              titleColor="primary"
              label={
                <Components.Global.Format
                  number={pricePerCoin}
                  type="coin"
                  coin={currency}
                />
              }
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} md={4}>
            <Components.Global.StackLabel
              medium
              title="Available"
              titleColor="primary"
              label={
                <Components.Global.Format
                  number={noOfCoins - (tradedCoins || 0)}
                  type="coin"
                  coin={coin}
                />
              }
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} md={4}>
            <Components.Global.StackLabel
              medium
              title="Preferred Payment"
              titleColor="primary"
              label={
                +prefferedPayment === 0 ? "All Payments" : prefferedPayment
              }
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} md={4}>
            <Components.Global.StackLabel
              medium
              title="Coin Trade Limit"
              titleColor="primary"
              label={`Min:${quantityLimitFrom || 0} - Max:${
                quantityLimitTo || 0
              }`}
              node
            />
          </Mui.Grid>
          {/* <Mui.Grid item xs={6} md={4}>
            <Components.Global.StackLabel
              medium
              title="Currency Trade Limit"
              titleColor="primary"
              label={`Min:${priceLimitFrom} - Max:${priceLimitTo}`}
              node
            />
          </Mui.Grid> */}
          <Mui.Grid item xs={12} md={4}>
            <Components.Global.StackLabel
              medium
              title="Order Expire At"
              titleColor="primary"
              label={
                <Components.Global.Timer
                  time={showPostTill}
                  variant="inherit"
                />
              }
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} md={4}>
            <Components.Global.StackLabel
              medium
              title="Payment Time Limit"
              titleColor="primary"
              label={"30 Minutes"}
              node
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={4} sx={{ p: 2 }}>
          <Pages.P2P.Views.CollapseForm {...props} />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Collapse>
  );
};
