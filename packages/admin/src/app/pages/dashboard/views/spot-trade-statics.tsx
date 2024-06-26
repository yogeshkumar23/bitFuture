// import * as Mui from "@mui/material";
// import * as Hooks from "src/app/hooks";

// export const SpotTradeStatics = () => {
//   const { data: trades } = Hooks.Firebase.useFireSnapshot<p2pTrade>(
//     "collectionGroup",
//     `trade_book`
//   ).collectionSnapshot([]);
//   return (
//     <Mui.Card sx={{ minHeight: "100%" }}>
//       <Mui.CardContent component={Mui.Stack} spacing={2} sx={{ p: 5 }}>
//         <Mui.Typography variant="h5" color="primary">
//           Trade Statistics
//         </Mui.Typography>
//         <Mui.Divider />
//         <Mui.Typography variant="h6">Total Deposits</Mui.Typography>
//         <Mui.Typography variant="h4" color="success.light">
//           0
//         </Mui.Typography>
//         <Mui.Typography variant="h6">Total Withdraw</Mui.Typography>
//         <Mui.Typography variant="h4" color="success.light">
//           0
//         </Mui.Typography>
//         <Mui.Typography variant="h6">Spot Trades/Orders</Mui.Typography>

//         <Mui.Typography
//           variant="h4"
//           component={Mui.Stack}
//           direction="row"
//           alignItems="center"
//           color="success.light"
//         >
//           {trades?.filter(({ status }) => status === "completed")?.length}/
//           {trades?.length}
//         </Mui.Typography>
//       </Mui.CardContent>
//     </Mui.Card>
//   );
// };

import * as Mui from "@mui/material";
import * as Hooks from "src/app/hooks";

export const SpotTradeStatics = () => {
  const { data: trades } = Hooks.Firebase.useFireSnapshot<p2pTrade>(
    "collectionGroup",
    `trade_book`
  ).collectionSnapshot([]);
  return (
    <Mui.Card sx={{ minHeight: "100%" }}>
      <Mui.CardContent component={Mui.Stack} spacing={2} sx={{ p: 5 }}>
        <Mui.Typography variant="h5" color="primary">
          Trade Statistics
        </Mui.Typography>
        <Mui.Divider />
        <Mui.Typography variant="h6">Total Deposits</Mui.Typography>
        <Mui.Typography variant="h4" color="success.light">
          0
        </Mui.Typography>
        <Mui.Typography variant="h6">Total Withdraw</Mui.Typography>
        <Mui.Typography variant="h4" color="success.light">
          0
        </Mui.Typography>
        <Mui.Typography variant="h6">Spot Trades/Orders</Mui.Typography>

        <Mui.Typography
          variant="h4"
          component={Mui.Stack}
          direction="row"
          alignItems="center"
          color="success.light"
        >
          {trades?.filter(({ status }) => status === "completed")?.length}/
          {trades?.length}
        </Mui.Typography>
      </Mui.CardContent>
    </Mui.Card>
  );
};
