// import * as Mui from "@mui/material";
// import * as MuiIcons from "@mui/icons-material";
// import * as Hooks from "src/app/hooks";

// export const HeaderCard = () => {
//   const { users } = Hooks.Admin.useUserList();
//   const {
//     spotTradeCount,
//     spotTradeSuccessCount,
//     p2pTradeCount,
//     p2pTradeSuccessCount,
//     disputeTradeCount,
//     disputeTradeSuccessCount,
//   } = Hooks.Admin.useDashboardTradeData();

//   return (
//     <Mui.Grid item container xs={12} spacing={1}>
//       <Mui.Grid item xs={12} md={3}>
//         <Mui.Card
//           component={Mui.Stack}
//           justifyContent="center"
//           sx={{
//             minHeight: "100%",
//             px: 2,
//             borderRadius: 3,
//             bgcolor: "warning.light",
//             color: "#fff",
//           }}
//         >
//           <Mui.CardContent component={Mui.Stack} spacing={2}>
//             <Mui.Typography variant="body1">Users</Mui.Typography>
//             <Mui.Typography
//               variant="h6"
//               component={Mui.Stack}
//               direction="row"
//               alignItems="center"
//             >
//               <MuiIcons.Verified />
//               {
//                 users?.userList?.filter(({ email_verified }) =>
//                   Boolean(email_verified)
//                 )?.length
//               }
//               /{users?.userList?.length}
//             </Mui.Typography>
//           </Mui.CardContent>
//         </Mui.Card>
//       </Mui.Grid>
//       <Mui.Grid item xs={12} md={3}>
//         <Mui.Card
//           component={Mui.Stack}
//           justifyContent="center"
//           sx={{
//             minHeight: "100%",
//             px: 2,
//             borderRadius: 3,
//             bgcolor: "error.light",
//             color: "#fff",
//           }}
//         >
//           <Mui.CardContent component={Mui.Stack} spacing={2}>
//             <Mui.Typography variant="body1">Enquiries</Mui.Typography>
//             <Mui.Typography
//               variant="h6"
//               component={Mui.Stack}
//               direction="row"
//               alignItems="center"
//             >
//               <MuiIcons.Task />
//               {disputeTradeSuccessCount}/{disputeTradeCount}
//             </Mui.Typography>
//           </Mui.CardContent>
//         </Mui.Card>
//       </Mui.Grid>
//       <Mui.Grid item xs={12} md={3}>
//         <Mui.Card
//           component={Mui.Stack}
//           justifyContent="center"
//           sx={{
//             minHeight: "100%",
//             px: 2,
//             borderRadius: 3,
//             bgcolor: "info.light",
//             color: "#fff",
//           }}
//         >
//           <Mui.CardContent component={Mui.Stack} spacing={2}>
//             <Mui.Typography variant="body1">P2P Trades/Orders</Mui.Typography>
//             <Mui.Typography
//               variant="h6"
//               component={Mui.Stack}
//               direction="row"
//               alignItems="center"
//             >
//               {p2pTradeSuccessCount}/{p2pTradeCount}
//             </Mui.Typography>
//           </Mui.CardContent>
//         </Mui.Card>
//       </Mui.Grid>
//       <Mui.Grid item xs={12} md={3}>
//         <Mui.Card
//           component={Mui.Stack}
//           justifyContent="center"
//           sx={{
//             minHeight: "100%",
//             px: 2,
//             borderRadius: 3,
//             bgcolor: "success.light",
//             color: "#fff",
//           }}
//         >
//           <Mui.CardContent component={Mui.Stack} spacing={2}>
//             <Mui.Typography variant="body1">Spot Trades/Orders</Mui.Typography>
//             <Mui.Typography
//               variant="h6"
//               component={Mui.Stack}
//               direction="row"
//               alignItems="center"
//             >
//               {spotTradeSuccessCount}/{spotTradeCount}
//             </Mui.Typography>
//           </Mui.CardContent>
//         </Mui.Card>
//       </Mui.Grid>
//     </Mui.Grid>
//   );
// };

import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Hooks from "src/app/hooks";

export const HeaderCard = () => {
  const { users } = Hooks.Admin.useUserList();
  const {
    spotTradeCount,
    spotTradeSuccessCount,
    p2pTradeCount,
    p2pTradeSuccessCount,
    disputeTradeCount,
    disputeTradeSuccessCount,
  } = Hooks.Admin.useDashboardTradeData();

  return (
    <Mui.Grid item container xs={12} spacing={1}>
      <Mui.Grid item xs={12} md={3}>
        <Mui.Card
          component={Mui.Stack}
          justifyContent="center"
          sx={{
            minHeight: "100%",
            px: 2,
            borderRadius: 3,
            bgcolor: "warning.light",
            color: "#fff",
          }}
        >
          <Mui.CardContent component={Mui.Stack} spacing={2}>
            <Mui.Typography variant="body1">Users</Mui.Typography>
            <Mui.Typography
              variant="h6"
              component={Mui.Stack}
              direction="row"
              alignItems="center"
            >
              <MuiIcons.Verified />
              {
                users?.userList?.filter(({ email_verified }) =>
                  Boolean(email_verified)
                )?.length
              }
              /{users?.userList?.length}
            </Mui.Typography>
          </Mui.CardContent>
        </Mui.Card>
      </Mui.Grid>
      <Mui.Grid item xs={12} md={3}>
        <Mui.Card
          component={Mui.Stack}
          justifyContent="center"
          sx={{
            minHeight: "100%",
            px: 2,
            borderRadius: 3,
            bgcolor: "error.light",
            color: "#fff",
          }}
        >
          <Mui.CardContent component={Mui.Stack} spacing={2}>
            <Mui.Typography variant="body1">Enquiries</Mui.Typography>
            <Mui.Typography
              variant="h6"
              component={Mui.Stack}
              direction="row"
              alignItems="center"
            >
              <MuiIcons.Task />
              {disputeTradeSuccessCount}/{disputeTradeCount}
            </Mui.Typography>
          </Mui.CardContent>
        </Mui.Card>
      </Mui.Grid>
      <Mui.Grid item xs={12} md={3}>
        <Mui.Card
          component={Mui.Stack}
          justifyContent="center"
          sx={{
            minHeight: "100%",
            px: 2,
            borderRadius: 3,
            bgcolor: "info.light",
            color: "#fff",
          }}
        >
          <Mui.CardContent component={Mui.Stack} spacing={2}>
            <Mui.Typography variant="body1">P2P Trades/Orders</Mui.Typography>
            <Mui.Typography
              variant="h6"
              component={Mui.Stack}
              direction="row"
              alignItems="center"
            >
              {p2pTradeSuccessCount}/{p2pTradeCount}
            </Mui.Typography>
          </Mui.CardContent>
        </Mui.Card>
      </Mui.Grid>
      <Mui.Grid item xs={12} md={3}>
        <Mui.Card
          component={Mui.Stack}
          justifyContent="center"
          sx={{
            minHeight: "100%",
            px: 2,
            borderRadius: 3,
            bgcolor: "success.light",
            color: "#fff",
          }}
        >
          <Mui.CardContent component={Mui.Stack} spacing={2}>
            <Mui.Typography variant="body1">Spot Trades/Orders</Mui.Typography>
            <Mui.Typography
              variant="h6"
              component={Mui.Stack}
              direction="row"
              alignItems="center"
            >
              {spotTradeSuccessCount}/{spotTradeCount}
            </Mui.Typography>
          </Mui.CardContent>
        </Mui.Card>
      </Mui.Grid>
    </Mui.Grid>
  );
};
