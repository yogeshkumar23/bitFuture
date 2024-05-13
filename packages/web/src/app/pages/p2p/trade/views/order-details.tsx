import * as Mui from "@mui/material";
import React from "react";
import * as Components from "src/app/components";

export const OrderDetails = ({
  buyer,
  status,
  traderName,
  quantity,
  coin,
  currency,
  fiatAmount,
  completed,
  showPostTill,
  timer,
}: {
  buyer: boolean;
  status: string;
  traderName: string;
  quantity: number;
  coin: string;
  currency: string;
  fiatAmount: number;
  completed: boolean;
  showPostTill: number;
  timer: React.ReactNode;
}) => (
  <Mui.Stack spacing={1} component={Mui.CardContent}>
    <Mui.Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Mui.Typography variant="h6" fontWeight={900}>
        Order Details
        <Mui.Typography
          variant="body2"
          color={
            {
              cancelled: "error.main",
              dispute: "error.main",
              pending: "error.main",
              declined: "error.main",
              expired: "warning.main",
              confirm: "error.main",
              confirmed: "success.main",
              completed: "success.main",
              paid: "success.main",
              ongoing: "warning.main",
            }[status]
          }
          sx={{ textTransform: "capitalize" }}
        >
          (
          {
            {
              pending: "Request Pending",
              confirm: "Request Pending",
              confirmed: "Request Accepted",
              ongoing: "Payment Completed",
              paid: "Order Completed",
              completed: "Order Completed",
              dispute: "Dispute Raised",
              expired: "Request Expired",
              cancelled: "Request Cancelled",
            }[status]
          }
          )
        </Mui.Typography>
      </Mui.Typography>
      <Mui.Typography variant="body2" color="error.main">
        {timer}
      </Mui.Typography>
    </Mui.Stack>
    <Mui.Divider />
    <Mui.Grid container spacing={1}>
      <Mui.Grid item xs={6} md={3}>
        <Components.Global.StackLabel
          medium
          title="Quantity:"
          label={
            <Components.Global.Format
              number={quantity}
              type="coin"
              coin={coin}
            />
          }
          node
        />
      </Mui.Grid>
      <Mui.Grid item xs={6} md={3}>
        <Components.Global.StackLabel
          medium
          title="Fiat Amount:"
          label={
            <Components.Global.Format
              number={fiatAmount}
              type="coin"
              coin={currency}
            />
          }
          node
        />
      </Mui.Grid>
      <Mui.Grid item xs={6} md={3}>
        <Components.Global.StackLabel
          medium
          title={buyer ? "Seller" : "Buyer"}
          label={
            <Mui.Typography variant="inherit" textTransform="capitalize">
              {traderName}
            </Mui.Typography>
          }
          node
        />
      </Mui.Grid>
      <Mui.Grid item xs={6} md={3}>
        <Components.Global.StackLabel
          medium
          title="Show Post Till"
          label={
            completed ? (
              <>NA</>
            ) : (
              <Components.Global.Timer time={showPostTill} variant="inherit" />
            )
          }
          node
        />
      </Mui.Grid>
    </Mui.Grid>
  </Mui.Stack>
);
