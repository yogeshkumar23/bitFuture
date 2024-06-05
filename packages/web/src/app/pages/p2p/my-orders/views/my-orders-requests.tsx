import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";


export const MyOrdersRequests = ({
  trades,
}: {
  trades: (p2pTrade & p2pTradeRequest)[];
}) => {
  const {t} = useTranslation();

  const navigate = Router.useNavigate();
  const requestedData = trades.map((trade) => ({
    uid: trade.requestUname,
    date: trade.requestPlacedTime,
    type: (
      <Mui.Typography
        sx={{
          bgcolor: (theme) =>
            trade.orderType === "buy"
              ? `${theme.palette.success.light}30`
              : `${theme.palette.error.light}30`,
          py: 0.5,
          px: 2,
          borderRadius: 1,
          width: "fit-content",
          textTransform: "capitalize",
        }}
        color={trade.orderType === "buy" ? "success.light" : "error.light"}
        variant="inherit"
      >
        {trade.orderType}
      </Mui.Typography>
    ),
    pair: `${trade.coin}-${trade.currency}`,
    quantity: (
      <Components.Global.Format
        number={trade.requestCoins}
        type="coin"
        coin={trade.coin}
      />
    ),
    paymentType:
      +trade.prefferedPayment === 0 ? "All Payments" : trade.prefferedPayment,
    status: (
      <Mui.Stack direction="row">
        <MuiIcons.FiberManualRecord
          color={
            {
              cancelled: "error",
              pending: "error",
              partiallyPending: "error",
              dispute: "error",
              declined: "error",
              expired: "warning",
              ongoing: "warning",
              confirm: "success",
              confirmed: "success",
              completed: "success",
              undefined: undefined,
            }[trade?.requestStatus] as color
          }
          sx={{ width: 8, mx: 0.5 }}
        />
        <Mui.Typography
          color={
            {
              cancelled: "error.main",
              dispute: "error.main",
              pending: "error.main",
              partiallyPending: "error.main",
              declined: "error.main",
              expired: "warning.main",
              ongoing: "warning.main",
              confirm: "success.main",
              confirmed: "success.main",
              completed: "success.main",
            }[trade?.requestStatus]
          }
          variant="body2"
          sx={{ textTransform: "capitalize" }}
        >
          {trade.requestStatus}
        </Mui.Typography>
      </Mui.Stack>
    ),
    action: (
      <Mui.Button
        size="small"
        variant="contained"
        onClick={() =>
          navigate(`../${trade.coin}/${trade.orderType}/${trade.tradeId}`, {
            state: trade,
          })
        }
      >
        View
      </Mui.Button>
    ),
  }));
  return (
    <Components.Global.Container direction="column" spacing={2}>
      <Mui.Typography variant="h5" fontWeight={900}>
      {t('incomingRequest')}
      </Mui.Typography>
      <Components.Global.ResponsiveTable
        titles={[
          `${t('name')}`.toUpperCase(),
          `REQUESTED ${t('date')}`.toUpperCase(),
          `AD ${t('type')}`,
          `${t('trade')}  ${t('pair')}`.toUpperCase(),
          `${t('quantity')}`.toUpperCase(),
          `${t('payment')}  ${t('type')}`.toUpperCase(),
          `${t('status')}`.toUpperCase(),
          `${t('actions')}`.toUpperCase(),

          
        ]}
        data={requestedData}
      />
    </Components.Global.Container>
  );
};
