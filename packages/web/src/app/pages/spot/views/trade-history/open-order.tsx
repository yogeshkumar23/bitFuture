// import * as Mui from "@mui/material";
// import * as MuiIcons from "@mui/icons-material";
// import * as Components from "src/app/components";
// import * as Constants from "src/constants";
// import * as Hooks from "src/app/hooks";
// import * as Pages from "src/app/pages";

// export const OpenOrder = ({
//   trades,
//   uid,
//   botStatus,
// }: {
//   trades: (allOrder & tradeBook)[] | undefined;
//   uid: string;
//   botStatus: "binance" | "kucoin" | "off";
// }) => {
//   const { cancel } = Hooks.Main.useSpotTrade(uid, botStatus);
//   const { contentCopy } = Hooks.User.useUtils();

//   const data = trades
//     ? trades
//         .sort(
//           (a, b) =>
//             new Date(b.orderPlacedTime || b.placedAt).getTime() -
//             new Date(a.orderPlacedTime || a.placedAt).getTime()
//         )
//         .map((trade) => ({
//           id: (
//             <Mui.Stack direction="row" alignItems="center">
//               <Mui.Typography variant="inherit" width={100} noWrap>
//                 {trade.tradeId}{" "}
//               </Mui.Typography>
//               <Mui.IconButton
//                 size="small"
//                 onClick={() => contentCopy(trade.tradeId)}
//               >
//                 <MuiIcons.CopyAll fontSize="inherit" color="primary" />
//               </Mui.IconButton>
//             </Mui.Stack>
//           ),
//           date: trade?.orderPlacedTime || trade?.placedAt,
//           pair: Constants.ORDERTYPE[(trade.orderTypeId || trade.orderType) - 1]
//             ?.toUpperCase()
//             ?.includes("BUY")
//             ? trade.baseAsset
//             : trade?.quoteAsset,
//           type: Constants.ORDERTYPE[
//             (trade?.orderType || trade?.orderTypeId) - 1
//           ]
//             .split(" ")
//             .slice(0, -1)
//             .join(" "),
//           side: (
//             <Mui.Typography
//               variant="inherit"
//               color={
//                 Constants.ORDERTYPE[
//                   (trade?.orderType || trade?.orderTypeId) - 1
//                 ].includes("Buy")
//                   ? "success.main"
//                   : "error.main"
//               }
//             >
//               {
//                 Constants.ORDERTYPE[
//                   (trade?.orderType || trade?.orderTypeId) - 1
//                 ]
//                   .split(" ")
//                   .slice(-1)[0]
//               }
//             </Mui.Typography>
//           ),
//           quantity: (
//             <Components.Global.Format
//               number={trade.noOfCoins}
//               type="coin"
//               coin={trade?.baseAsset}
//             />
//           ),
//           price: (
//             <Components.Global.Format
//               number={
//                 [2, 3, 5, 6].includes(trade?.orderType || trade?.orderTypeId) &&
//                 trade.status !== "done"
//                   ? trade?.limitPrice
//                   : trade?.marketPrice ||
//                     trade?.filledPrice ||
//                     trade?.limitPrice
//               }
//               type="coin"
//               coin={trade?.quoteAsset}
//             />
//           ),
//           amount: (
//             <Components.Global.Format
//               number={trade.noOfCoins}
//               type="coin"
//               coin={trade?.quoteAsset}
//             />
//           ),
//           // filled: (
//           //   <Components.Global.Format
//           //     number={trade?.filledPrice || trade?.limitPrice}
//           //     type="coin"
//           //     coin={trade.currency}
//           //   />
//           // ),
//           // total: (
//           //   <Components.Global.Format
//           //     number={trade.orderTotalAmount}
//           //     type="coin"
//           //     coin={trade.currency}
//           //   />
//           // ),
//           trigger: (
//             <Mui.Typography
//               color={
//                 {
//                   cancelled: "error.main",
//                   canceled: "error.main",
//                   dispute: "error.main",
//                   pending: "warning.main",
//                   open: "warning.main",
//                   failed: "warning.main",
//                   partiallyPending: "error.main",
//                   declined: "error.main",
//                   expired: "warning.main",
//                   confirm: "success.main",
//                   confirmed: "success.main",
//                   completed: "success.main",
//                   done: "success.main",
//                   filled: "success.main",
//                 }[trade?.status.toLowerCase()]
//               }
//               variant="inherit"
//               sx={{ textTransform: "capitalize" }}
//             >
//               {["FILLED", "done"].includes(trade.status)
//                 ? "Completed"
//                 : ["NEW", "open"].includes(trade.status)
//                 ? "Pending"
//                 : ["CANCELED", "canceled"].includes(trade.status)
//                 ? "Cancelled"
//                 : trade.status}
//             </Mui.Typography>
//           ),
//           delete: (
//             <Mui.IconButton
//               size="small"
//               sx={{
//                 display: [1, 4].includes(trade?.orderType || trade?.orderTypeId)
//                   ? "none"
//                   : "flex",
//               }}
//               onClick={async () =>
//                 await cancel(
//                   trade.orderId || trade.tradeId,
//                   trade.coinId || trade.coin
//                 )
//               }
//             >
//               <MuiIcons.DeleteOutline color="error" fontSize="inherit" />
//             </Mui.IconButton>
//           ),
//         }))
//     : [];

//   return (
//     <Pages.Spot.Views.Table
//       titles={[
//         "Trade ID",
//         "Date",
//         "Pair",
//         "Type",
//         "Side",
//         "Quantity",
//         "Price",
//         "Amount",
//         // "Filled",
//         // "Total",
//         "Trigger Conditions",
//         "",
//       ]}
//       data={data}
//     />
//   );
// };

import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const OpenOrder = ({
  trades,
  uid,
  botStatus,
}: {
  trades: (allOrder & tradeBook)[] | undefined;
  uid: string;
  botStatus: "binance" | "kucoin" | "off" | "bybit";
  // botStatus: "binance" | "kucoin" | "off"
}) => {
  const { cancel } = Hooks.Main.useSpotTrade(uid, botStatus);
  const { contentCopy } = Hooks.User.useUtils();

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
          pair: Constants.ORDERTYPE[(trade.orderTypeId || trade.orderType) - 1]
            ?.toUpperCase()
            ?.includes("BUY")
            ? trade.baseAsset
            : trade?.quoteAsset,
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
          quantity: (
            <Components.Global.Format
              number={
                trade.noOfCoins
                  ? trade.noOfCoins
                  : Constants.ORDERTYPE[
                      (trade?.orderType || trade?.orderTypeId) - 1
                    ].includes("Sell")
                  ? trade.enteredQuantity
                  : 0
              }
              type="coin"
              coin={trade?.baseAsset}
            />
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
          amount: (
            <Components.Global.Format
              number={
                trade.amount
                  ? trade.amount
                  : Constants.ORDERTYPE[
                      (trade?.orderType || trade?.orderTypeId) - 1
                    ].includes("Buy")
                  ? trade.enteredQuantity
                  : 0
              }
              type="coin"
              coin={trade?.quoteAsset}
            />
          ),
          // filled: (
          //   <Components.Global.Format
          //     number={trade?.filledPrice || trade?.limitPrice}
          //     type="coin"
          //     coin={trade.currency}
          //   />
          // ),
          // total: (
          //   <Components.Global.Format
          //     number={trade.orderTotalAmount}
          //     type="coin"
          //     coin={trade.currency}
          //   />
          // ),
          trigger: (
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
              {["FILLED", "Filled", "done"].includes(trade.status)
                ? "Completed"
                : ["NEW", "New", "open"].includes(trade.status)
                ? "Pending"
                : ["CANCELED", "canceled"].includes(trade.status)
                ? "Cancelled"
                : trade.status}
            </Mui.Typography>
          ),
          delete: (
            <Mui.IconButton
              size="small"
              sx={{
                display: [1, 4].includes(trade?.orderType || trade?.orderTypeId)
                  ? "none"
                  : "flex",
              }}
              onClick={async () =>
                await cancel(
                  trade.orderId || trade.tradeId,
                  trade.coinId || trade.coin
                )
              }
            >
              <MuiIcons.DeleteOutline color="error" fontSize="inherit" />
            </Mui.IconButton>
          ),
        }))
    : [];

  return (
    <Pages.Spot.Views.Table
      titles={[
        "Trade ID",
        "Date",
        "Pair",
        "Type",
        "Side",
        "Quantity",
        "Price",
        "Amount",
        // "Filled",
        // "Total",
        "Trigger Conditions",
        "",
      ]}
      data={data}
    />
  );
};
