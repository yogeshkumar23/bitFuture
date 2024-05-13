import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const OrderHistory = ({
  trades,
  type,
}: {
  trades: (allOrder & tradeBook)[] | undefined;
  type: "orders" | "trades";
}) => {
  const { contentCopy } = Hooks.User.useUtils();
  const { pathname } = Router.useLocation();

  const data = trades
    ? trades
        .sort(
          (a, b) =>
            new Date(b.orderPlacedTime || b.placedAt).getTime() -
            new Date(a.orderPlacedTime || a.placedAt).getTime()
        )
        .map((trade) => ({
          id: (
            <Mui.Stack direction="row" alignItems="center">
              <Mui.Typography variant="inherit" width={100} noWrap>
                {trade.tradeId}{" "}
              </Mui.Typography>
              <Mui.IconButton
                size="small"
                onClick={() => contentCopy(trade.tradeId)}
              >
                <MuiIcons.CopyAll fontSize="inherit" color="primary" />
              </Mui.IconButton>
            </Mui.Stack>
          ),
          date: trade?.orderPlacedTime || trade?.placedAt,
          ...(pathname?.includes("dashboard")
            ? {
                pair: `${trade.baseAsset}/${trade?.quoteAsset}`,
              }
            : {}),
          type: Constants.ORDERTYPE[
            (trade?.orderType || trade?.orderTypeId) - 1
          ]
            .split(" ")
            .slice(0, -1)
            .join(" "),
          side: (
            <Mui.Typography
              variant="inherit"
              color={
                Constants.ORDERTYPE[
                  (trade?.orderType || trade?.orderTypeId) - 1
                ].includes("Buy")
                  ? "success.main"
                  : "error.main"
              }
            >
              {
                Constants.ORDERTYPE[
                  (trade?.orderType || trade?.orderTypeId) - 1
                ]
                  .split(" ")
                  .slice(-1)[0]
              }
            </Mui.Typography>
          ),
          price: (
            <Components.Global.Format
              number={
                [2, 3, 5, 6].includes(trade?.orderType || trade?.orderTypeId) &&
                trade.status !== "done"
                  ? trade?.limitPrice
                  : trade?.marketPrice ||
                    trade?.filledPrice ||
                    trade?.limitPrice
              }
              type="coin"
              coin={trade?.quoteAsset}
            />
          ),
          quantity: (
            <Components.Global.Format
              number={trade.noOfCoins}
              type="coin"
              coin={trade?.baseAsset}
            />
          ),
          // remaining: (
          //   <Components.Global.Format
          //     number={trade.noOfCoins - trade.tradedCoins}
          //     type="coin"
          //     coin={trade.coin}
          //   />
          // ),
          amount: (
            <Components.Global.Format
              number={trade.orderAmount}
              type="coin"
              coin={trade?.quoteAsset}
            />
          ),
          ...(type === "trades"
            ? {
                commission: (
                  <Components.Global.Format
                    number={
                      (trade?.commisionAmount || trade?.commission) +
                      (trade?.fee || 0)
                    }
                    type="coin"
                    coin={
                      Constants.ORDERTYPE[
                        (trade.orderTypeId || trade.orderType) - 1
                      ]
                        ?.toUpperCase()
                        ?.includes("BUY")
                        ? trade.baseAsset
                        : trade?.quoteAsset
                    }
                  />
                ),
              }
            : {}),
          // total: (
          //   <Components.Global.Format
          //     number={trade.orderTotalAmount}
          //     type="coin"
          //     coin={trade.currency}
          //
          //   />
          // ),
          // trigger: trade.description,
          ...(pathname?.includes("spot")
            ? {
                status: (
                  <Mui.Typography
                    color={
                      {
                        cancelled: "error.main",
                        canceled: "error.main",
                        dispute: "error.main",
                        pending: "warning.main",
                        open: "warning.main",
                        failed: "warning.main",
                        partiallyPending: "error.main",
                        declined: "error.main",
                        expired: "warning.main",
                        confirm: "success.main",
                        confirmed: "success.main",
                        completed: "success.main",
                        done: "success.main",
                        filled: "success.main",
                      }[trade?.status.toLowerCase()]
                    }
                    variant="inherit"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {["FILLED", "done"].includes(trade.status)
                      ? "Completed"
                      : ["NEW", "open"].includes(trade.status)
                      ? "Pending"
                      : ["CANCELED", "canceled"].includes(trade.status)
                      ? "Cancelled"
                      : trade.status.toLowerCase()}
                  </Mui.Typography>
                ),
              }
            : {}),
        }))
    : [];

  return pathname?.includes("dashboard") ? (
    <Components.Global.ResponsiveTable
      titles={[
        "Trade ID",
        "Date",
        "Pair",
        "Type",
        "Side",
        "Price",
        "Quantity",
        // "Remaining",
        "Amount",
        "Commission",
        // "Total",
        // "Trigger Conditions",
        // "Status",
      ]}
      data={data}
    />
  ) : (
    <Pages.Spot.Views.Table
      titles={[
        "Trade ID",
        "Date",
        // "Pair",
        "Type",
        "Side",
        "Price",
        "Quantity",
        // "Remaining",
        "Amount",
        ...(type === "trades" ? ["Commission"] : []),
        // "Total",
        // "Trigger Conditions",
        "Status",
      ]}
      data={data}
    />
  );
};
