import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";
import { useTranslation } from "react-i18next";


export const TradeHistory = ({
  account,
  trades,
  p2p_trades,
  logs,
  contentCopy,
}: {
  account: string | undefined;
  trades: (allOrder & tradeBook)[];
  p2p_trades: (p2pTrade & p2pTradeRequest)[] | undefined;
  logs: logger[] | undefined;
  contentCopy: (wid: string) => void;
}) => {
  const {t} = useTranslation();

  const { user } = React.useContext(Contexts.UserContext);
  const [value, setValue] = React.useState<"spot" | "p2p" | "token">("spot");
  const [filter, setFilter] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const p2p_data = p2p_trades
    ? p2p_trades
        .filter((trade) =>
          `${trade.coin} ${trade.currency} ${trade.noOfCoins} ${trade.pricePerCoin} ${trade.prefferedPayment} ${trade.status}`
            .toLowerCase()
            .includes(filter)
        )
        .map((trade) => {
          const buyer =
            Boolean(trade.orderType === "buy" && trade?.uid === user?.uid) ||
            Boolean(
              trade.orderType === "sell" && trade?.requestuid === user?.uid
            );

          return {
            id: (
              <Mui.Stack direction="row" alignItems="center">
                <Mui.Typography variant="inherit" width={100} noWrap>
                  {trade.tradeId}{" "}
                </Mui.Typography>
                <Mui.IconButton
                  size="small"
                  onClick={() => contentCopy(trade.tradeId as string)}
                >
                  <MuiIcons.CopyAll fontSize="inherit" color="primary" />
                </Mui.IconButton>
              </Mui.Stack>
            ),
            date: trade.showPostTill,
            type: (
              <Mui.Typography
                sx={{
                  bgcolor: (theme) =>
                    buyer
                      ? `${theme.palette.success.light}30`
                      : `${theme.palette.error.light}30`,
                  py: 0.5,
                  px: 2,
                  borderRadius: 1,
                  width: "fit-content",
                  textTransform: "capitalize",
                }}
                color={buyer ? "success.light" : "error.light"}
                variant="inherit"
              >
                {buyer ? "Buy" : "Sell"}
              </Mui.Typography>
            ),
            pair: `${trade.coin}-${trade.currency}`,
            limit: `${trade.quantityLimitFrom}-${trade.quantityLimitTo}`,
            quantity: trade.requestCoins,
            paymentType:
              +trade.prefferedPayment === 0
                ? "All Payments"
                : trade.prefferedPayment,
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
          };
        })
    : [];

  const tokenData = logs
    ? logs
        .sort((a, b) => b.time - a.time)
        .filter((log) =>
          `${log.tokenId} ${log.logType} ${log.from} ${log.to} ${log.price}`
            .toLowerCase()
            .includes(filter)
        )
        .map((log) => ({
          date: log.time,
          id: `# ${log.tokenId}`,
          contract: (
            <Mui.Stack direction="row" alignItems="center">
              <Mui.Typography variant="inherit" width={100} noWrap>
                {log.contract}{" "}
              </Mui.Typography>
              <Mui.IconButton
                size="small"
                onClick={() => contentCopy(log.contract)}
              >
                <MuiIcons.CopyAll fontSize="inherit" color="primary" />
              </Mui.IconButton>
            </Mui.Stack>
          ),
          logType: (
            <Mui.Typography variant="inherit" textTransform="capitalize">
              {log.logType}
            </Mui.Typography>
          ),
          from: log.from,
          to: log.to,
          price: (
            <Components.Global.Format
              type="coin"
              number={log.price}
              coin="ETH"
            />
          ),
          gasFee: (
            <Components.Global.Format type="coin" number={log.fee} coin="ETH" />
          ),
          // enteredQuantity: (
          //   <Components.Global.Format
          //     type="coin"
          //     number={log.enteredQuantity}
          //     coin="ETH"
          //   />
          // ),
        }))
    : [];

  return (
    <Components.Global.Container
      direction="column"
      spacing={2}
      customTitle={
        <Mui.Stack sx={{ width: "100%" }}>
          <Mui.Typography variant="h6" flexGrow={0} fontWeight={900}>
            {t('tradeHistory')}
          </Mui.Typography>
          <Mui.Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            spacing={1}
            sx={{ width: "100%" }}
          >
            <Mui.ButtonGroup
              id="tradeHistoryNavigations"
              sx={{
                // border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                // borderRadius: 20,
                overflow: "hidden",
                width: "fit-content",
                bgcolor: "background.default",
              }}
            >
              <Mui.Button
                variant="text"
                onClick={() => setValue("spot")}
                sx={{
                  color: value === "spot" ? "primary.main" : "text.secondary",
                  position: "relative",
                  px: 3,
                  fontWeight: "bold",
                }}
              >
                 {t('spot')}{" "}
                {trades?.filter(({ status }) =>
                  ["completed", "FILLED", "done"].includes(status)
                )?.length
                  ? `(${
                      trades?.filter(({ status }) =>
                        ["completed", "FILLED", "done"].includes(status)
                      )?.length
                    })`
                  : ``}
                {value === "spot" && (
                  <Mui.Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: 50,
                      borderRadius: 2,
                      borderBottom: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                    }}
                  />
                )}
              </Mui.Button>
              <Mui.Button
                variant="text"
                onClick={() => setValue("p2p")}
                sx={{
                  color: value === "p2p" ? "primary.main" : "text.secondary",
                  position: "relative",
                  px: 3,
                  fontWeight: "bold",
                }}
              >
                P2P {p2p_trades?.length ? `(${p2p_trades?.length})` : ``}
                {value === "p2p" && (
                  <Mui.Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: 50,
                      borderRadius: 2,
                      borderBottom: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                    }}
                  />
                )}
              </Mui.Button>
              {/* <Mui.Button
                variant="text"
                onClick={() => setValue("token")}
                sx={{
                  color: value === "token" ? "primary.main" : "text.secondary",
                  position: "relative",
                  px: 3,
                  fontWeight: "bold",
                }}
              >
                NFT {logs?.length ? `(${logs?.length})` : ``}
                {value === "token" && (
                  <Mui.Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: 50,
                      borderRadius: 2,
                      borderBottom: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                    }}
                  />
                )}
              </Mui.Button> */}
            </Mui.ButtonGroup>
            <Mui.Box flexGrow={1} />
            <Mui.TextField
              size="small"
              value={filter}
              onChange={handleChange}
              placeholder={`${t('filterRecords')}`}
            />
          </Mui.Stack>
        </Mui.Stack>
      }
    >
      {
        {
          spot: (
            <Pages.Spot.Views.TradeHistory.OrderHistory
              trades={trades
                .filter((trade) =>
                  `${trade.baseAsset} ${trade.quoteAsset} ${
                    Constants.ORDERTYPE[
                      (trade.orderType || trade.orderTypeId) - 1
                    ]
                  } ${trade.noOfCoins} ${
                    trade?.noOfCoinsAsset || trade?.coin
                  } ${
                    ["FILLED", "done"].includes(trade.status)
                      ? "completed"
                      : trade.status
                  }`
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                ?.filter(({ status }) =>
                  ["completed", "FILLED", "done"].includes(status)
                )}
              type="trades"
            />
          ),
          p2p: (
            <Components.Global.ResponsiveTable
              titles={[
                `${t('post')} ID`,
                `${t('date')}`,
                `AD ${t('type')}`,
                `${t('trade')}  ${t('pair')}`,
                `${t('limit')}`,
                `${t('quantity')}`,
                `${t('payment')}  ${t('type')}`,
                `${t('status')}`,
              ]}
              data={p2p_data}
            />
          ),
          token: account ? (
            <Components.Global.ResponsiveTable
              titles={[
                "Time",
                "Token ID",
                "Contract",
                "Log Type",
                "From",
                "To",
                "Price",
                "Gas Fee",
                // "Entered Quantity",
              ]}
              data={tokenData}
            />
          ) : (
            <Mui.Stack justifyContent="center" alignItems="center">
              {window.ethereum ? (
                <Pages.NFT.Views.NFTBalance />
              ) : (
                <Pages.NFT.Views.NFTInstall />
              )}
            </Mui.Stack>
          ),
        }[value]
      }
      <Mui.Box flexGrow={1} />
    </Components.Global.Container>
  );
};
