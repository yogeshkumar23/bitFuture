import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";


export const MyOrders = ({ trades }: { trades: p2pTrade[] }) => {
  const navigate = Router.useNavigate();
  const handleEdit = (trade: p2pTrade) =>
    navigate("edit", { state: { trade } });
  const handleDelete = (trade: p2pTrade) =>
    navigate("delete", { state: { trade } });

  const {t} = useTranslation();


  const data = trades.map((trade) => ({
    id: trade.tradeId,
    date: trade.showPostTill,
    type: (
      <Mui.Typography
        sx={{
          bgcolor: (theme) =>
            trade.orderType.toLowerCase() === "buy"
              ? `${theme.palette.success.light}30`
              : `${theme.palette.error.light}30`,
          py: 0.5,
          px: 2,
          borderRadius: 1,
          width: "fit-content",
          textTransform: "capitalize",
        }}
        color={
          trade.orderType.toLowerCase() === "buy"
            ? "success.light"
            : "error.light"
        }
        variant="inherit"
      >
        {trade.orderType}
      </Mui.Typography>
    ),
    pair: `${trade.coin}-${trade.currency}`,
    coinLimit: `${trade.quantityLimitFrom || 0}-${trade.quantityLimitTo || 0}`,
    // currencyLimit: `${trade.priceLimitFrom}-${trade.priceLimitTo}`,
    quantity: (
      <Components.Global.Format
        number={trade.noOfCoins}
        type="coin"
        coin={trade.coin}
      />
    ),
    tradedCoins: (
      <Components.Global.Format
        number={trade.tradedCoins}
        type="coin"
        coin={trade.coin}
      />
    ),
    paymentType:
      +trade.prefferedPayment === 0 ? "All Payments" : trade.prefferedPayment,
    action:
      trade.status === "pending" ? (
        <Mui.Stack direction="row" justifyContent="space-between">
          <Mui.IconButton onClick={() => handleEdit(trade)}>
            <MuiIcons.EditOutlined color="primary" />
          </Mui.IconButton>
          <Mui.IconButton onClick={() => handleDelete(trade)}>
            <MuiIcons.DeleteOutlined color="error" />
          </Mui.IconButton>
        </Mui.Stack>
      ) : (
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
              }[trade?.status] as color
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
              }[trade?.status]
            }
            variant="body2"
            sx={{ textTransform: "capitalize" }}
          >
            {trade.status}
          </Mui.Typography>
        </Mui.Stack>
      ),
  }));
  return (
    <Components.Global.Container direction="column" spacing={2}>
      <Mui.Typography variant="h5" fontWeight={900}>
      {t('myOrders')}
      </Mui.Typography>
      <Components.Global.ResponsiveTable
        titles={[
          `${t('post')} ID`,
          `${t('date')}`,
          `AD ${t('type')}`,
          `${t('trade')}  ${t('pair')}`,
          `Coin ${t('limit')}`,
          `${t('quantity')}`,
          `${t('tradedCoins')}`,
          `${t('payment')}  ${t('type')}`,
          // "Actions/Status",      
          `${t('actions')}/${t('status')}`,

        ]}
        data={data}
      />
    </Components.Global.Container>
  );
};
