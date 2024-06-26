// import * as Mui from "@mui/material";
// import React from "react";
// import * as Router from "react-router-dom";
// import * as Components from "src/app/components";
// import type * as Contexts from "src/app/contexts";
// import * as Hooks from "src/app/hooks";
// import * as Pages from "src/app/pages";

// export const Main = ({
//   coin,
//   trades,
//   user,
//   openOrderCount,
// }: {
//   coin: Hooks.Main.UseCoin.coin;
//   trades: (allOrder & tradeBook)[];
//   user: Contexts.userContext.User;
//   openOrderCount: number;
// }) => {
//   const [index, setIndex] = React.useState(0);
//   const handleClick = (i: number) => setIndex(i);

//   return (
//     <Components.Global.Container
//       direction="column"
//       justifyContent="flex-start"
//       sx={{ height: 450 }}
//     >
//       <Mui.Stack direction="row" spacing={1} justifyContent="space-between">
//         <Mui.ButtonGroup
//           id="spotTradeHistoryNavigation"
//           disableRipple
//           disableElevation
//           size="small"
//           sx={{
//             border: (theme) =>
//               `1px solid ${
//                 theme.palette.mode === "light"
//                   ? `${theme.palette.primary.light}40`
//                   : `${theme.palette.background.default}50`
//               }`,
//             width: "fit-content",
//             "& .MuiButtonGroup-grouped": {
//               borderRadius: "4px !important",
//             },
//           }}
//         >
//           {[
//             `Open orders(${openOrderCount})`,
//             "Order History",
//             "Trade History",
//           ].map((text, i) => (
//             <Mui.Button
//               key={i}
//               variant={index === i ? "contained" : "text"}
//               onClick={() => handleClick(i)}
//               sx={{
//                 bgcolor: (theme) =>
//                   index === i
//                     ? `${theme.palette.primary.main}50`
//                     : "background.paper",
//                 color: (theme) =>
//                   index === i ? theme.palette.primary.main : "text.primary",
//                 mx: { xs: 1, sm: 3 },
//                 fontWeight: "bolder",
//                 "&:hover": {
//                   bgcolor: "inherit",
//                 },
//               }}
//             >
//               <Mui.Typography noWrap fontSize="inherit" color="inherit">
//                 {text}
//               </Mui.Typography>
//             </Mui.Button>
//           ))}
//         </Mui.ButtonGroup>
//         <Mui.Button size="small" component={Router.Link} to="/dashboard">
//           view all
//         </Mui.Button>
//       </Mui.Stack>
//       {
//         {
//           0: (
//             <Pages.Spot.Views.TradeHistory.OpenOrder
//               trades={trades?.filter(({ status }) =>
//                 ["pending", "partiallyCompleted", "NEW", "open"].includes(
//                   status
//                 )
//               )}
//               uid={user?.uid as string}
//               botStatus={coin?.bot_status}
//             />
//           ),
//           1: (
//             <Pages.Spot.Views.TradeHistory.OrderHistory
//               trades={trades}
//               type="orders"
//             />
//           ),
//           2: (
//             <Pages.Spot.Views.TradeHistory.OrderHistory
//               trades={trades?.filter(({ status }) =>
//                 ["completed", "FILLED", "done"].includes(status)
//               )}
//               type="trades"
//             />
//           ),
//         }[index]
//       }
//     </Components.Global.Container>
//   );
// };

import * as Mui from "@mui/material";
import React from "react";
import * as Components from "src/app/components";
import type * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Main = ({
  coin,
  trades,
  user,
}: {
  coin: Hooks.Main.UseCoin.coin;
  trades: (allOrder & tradeBook)[];
  user: Contexts.userContext.User;
}) => {
  const [index, setIndex] = React.useState(0);
  const handleClick = (i: number) => setIndex(i);

  return (
    <Components.Global.Container
      direction="column"
      justifyContent="flex-start"
      sx={{ height: 450 }}
    >
      <Mui.ButtonGroup
        id="spotTradeHistoryNavigation"
        disableRipple
        disableElevation
        size="small"
        sx={{
          border: (theme) =>
            `1px solid ${
              theme.palette.mode === "light"
                ? `${theme.palette.primary.light}40`
                : `${theme.palette.background.default}50`
            }`,
          width: "fit-content",
          "& .MuiButtonGroup-grouped": {
            borderRadius: "4px !important",
          },
        }}
      >
        {[
          `Open orders(${
            trades?.filter(({ status }) =>
              ["pending", "partiallyCompleted", "NEW",'New', "open"].includes(status)
            )?.length || 0
          })`,
          "Order History",
          "Trade History",
        ].map((text, i) => (
          <Mui.Button
            key={i}
            variant={index === i ? "contained" : "text"}
            onClick={() => handleClick(i)}
            sx={{
              bgcolor: (theme) =>
                index === i
                  ? `${theme.palette.primary.main}50`
                  : "background.paper",
              color: (theme) =>
                index === i ? theme.palette.primary.main : "text.primary",
              mx: { xs: 1, sm: 3 },
              fontWeight: "bolder",
              "&:hover": {
                bgcolor: "inherit",
              },
            }}
          >
            <Mui.Typography noWrap fontSize="inherit" color="inherit">
              {text}
            </Mui.Typography>
          </Mui.Button>
        ))}
      </Mui.ButtonGroup>
      {
        {
          0: (
            <Pages.Spot.Views.TradeHistory.OpenOrder
              trades={trades?.filter(({ status }) =>
                [
                  "pending",
                  "partiallyCompleted",
                  "NEW",
                  "New",
                  "open",
                ].includes(status)
              )}
              uid={user?.uid as string}
              botStatus={coin?.bot_status}
            />
          ),
          1: (
            <Pages.Spot.Views.TradeHistory.OrderHistory
              trades={trades}
              type="orders"
            />
          ),
          2: (
            <Pages.Spot.Views.TradeHistory.OrderHistory
              trades={trades?.filter(({ status }) =>
                ["completed", "FILLED", "Filled", "done"].includes(status)
              )}
              type="trades"
            />
          ),
        }[index]
      }
    </Components.Global.Container>
  );
};
