// import * as Mui from "@mui/material";
// import * as MuiIcons from "@mui/icons-material";
// import React from "react";
// import * as Components from "src/app/components";
// import * as Hooks from "src/app/hooks";

// export const Main = () => {
//   const [filter, setFilter] = React.useState("");
//   const { transactions, loading } = Hooks.Admin.useTransactions();
//   const { contentCopy } = Hooks.User.useUtils();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setFilter(e.target.value);

//   const data = transactions?.transactions
//     ? transactions.transactions
//         .filter((transaction) =>
//           ` ${transaction.firstName} ${transaction.lastName} ${transaction.email} ${transaction.transactionId} ${transaction.hash} ${transaction.amount}`.includes(
//             filter
//           )
//         )
//         .map((transaction) => ({
//           date: transaction.createdAt,
//           username: `${transaction.firstName} ${transaction.lastName}`,
//           email: transaction.email,
//           type: (
//             <Mui.Typography
//               sx={{
//                 bgcolor: (theme) =>
//                   `${
//                     {
//                       completed: theme.palette.success.main,
//                       success: theme.palette.success.main,
//                       failed: theme.palette.error.main,
//                       pending: theme.palette.warning.main,
//                     }[transaction.status]
//                   }30`,
//                 p: 1,
//                 borderRadius: 1,
//               }}
//               color={
//                 {
//                   completed: "success.light",
//                   success: "success.light",
//                   failed: "error.light",
//                   pending: "warning.main",
//                 }[transaction.status]
//               }
//               variant="inherit"
//               align="center"
//             >
//               {transaction.type}
//             </Mui.Typography>
//           ),
//           symbol: transaction.currency,
//           amount: (
//             <Components.Global.Format
//               type="number"
//               number={transaction.amount}
//             />
//           ),
//           transactionId: (
//             <Mui.Stack direction="row" alignItems="center">
//               <Mui.Typography variant="inherit" width={200} noWrap>
//                 {transaction.transactionId}{" "}
//               </Mui.Typography>
//               <Mui.IconButton
//                 size="small"
//                 onClick={() => contentCopy(transaction.transactionId)}
//               >
//                 <MuiIcons.CopyAll fontSize="inherit" color="primary" />
//               </Mui.IconButton>
//             </Mui.Stack>
//           ),
//           hash: (
//             <Mui.Stack direction="row" alignItems="center">
//               <Mui.Typography variant="inherit" width={200} noWrap>
//                 {transaction.hash || "-"}
//               </Mui.Typography>
//               <Mui.IconButton
//                 size="small"
//                 onClick={() => contentCopy(transaction.hash)}
//               >
//                 <MuiIcons.CopyAll fontSize="inherit" color="primary" />
//               </Mui.IconButton>
//             </Mui.Stack>
//           ),
//           status: (
//             <Mui.Typography
//               color={
//                 {
//                   completed: "success.light",
//                   success: "success.light",
//                   failed: "error.light",
//                   pending: "warning.main",
//                 }[transaction.status]
//               }
//               textTransform="capitalize"
//               variant="inherit"
//             >
//               <MuiIcons.Lens sx={{ fontSize: 8 }} /> {transaction.status}
//             </Mui.Typography>
//           ),
//         }))
//     : [];

//   return loading ? (
//     <Components.Global.GlobalLoader />
//   ) : (
//     <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
//       <Mui.Typography variant="h5">Wallet Transactions</Mui.Typography>
//       <Components.Global.Container direction="column" spacing={2}>
//         <Mui.Stack
//           direction={{ sm: "column", md: "row" }}
//           justifyContent="flex-end"
//           spacing={2}
//         >
//           <Mui.TextField
//             variant="outlined"
//             size="small"
//             placeholder="Filter records..."
//             onChange={handleChange}
//             value={filter}
//           />
//         </Mui.Stack>
//         <Components.Global.ResponsiveTable
//           id="Users Transaction"
//           titles={[
//             "DATE",
//             "USERNAME",
//             "EMAIL",
//             "TYPE",
//             "SYMBOL",
//             "AMOUNT",
//             "TRANSACTION REF",
//             "HASH",
//             "STATUS",
//           ]}
//           data={data}
//         />
//       </Components.Global.Container>
//     </Mui.Stack>
//   );
// };


import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as MuiLab from "@mui/lab";
import React from "react";
import * as ReactQuery from "react-query";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Main = () => {
  const queryClient = ReactQuery.useQueryClient();
  const [filter, setFilter] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [tab, setTab] = React.useState<"DEPOSIT" | "WITHDRAW">("DEPOSIT");
  // console.log(tab, 'tab check')
  const { transactions, loading: transactionLoading } =
    Hooks.Admin.useTransactions();
  const { contentCopy } = Hooks.User.useUtils();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const handleTabChange = (_: any, value: "DEPOSIT" | "WITHDRAW") => {
    setTab(value);
  };

  const handleSubmit = async (
    transactionId: string,
    status: "Approved" | "Declined"
  ) => {
    setLoading(true);
    await Api.Server.Request("updateUserTransaction", {
      transactionId,
      status,
    }).then(() => {
      queryClient.invalidateQueries("getUserTransactions");
      setLoading(false);
    });
  };

  console.log(transactions, 'transaction data');

  const data = transactions?.transactions
    ? transactions.transactions
        .filter((transaction) =>
          ` ${transaction.firstName} ${transaction.lastName} ${transaction.email} ${transaction.transactionId} ${transaction.hash} ${transaction.amount}`.includes(
            filter
          )
        )
        .map((transaction) => ({
          date: transaction.createdAt,
          username: `${transaction.firstName} ${transaction.lastName}`,
          email: transaction.email,
          type: (
            <Mui.Typography
              sx={{
                bgcolor: (theme) =>
                  `${
                    {
                      completed: theme.palette.success.main,
                      success: theme.palette.success.main,
                      approved: theme.palette.success.main,
                      failed: theme.palette.error.main,
                      declined: theme.palette.error.main,
                      pending: theme.palette.warning.main,
                    }[transaction.status.toLowerCase()]
                  }30`,
                p: 1,
                borderRadius: 1,
              }}
              color={
                {
                  completed: "success.light",
                  success: "success.light",
                  failed: "error.light",
                  approved: "success.light",
                  declined: "error.light",
                  pending: "warning.main",
                }[transaction.status.toLowerCase()]
              }
              variant="inherit"
              align="center"
            >
              {transaction.type}
            </Mui.Typography>
          ),
          symbol: transaction.currency,
          amount: (
            <Components.Global.Format
              type="number"
              number={transaction.amount}
            />
          ),
          transactionId: (
            <Mui.Stack direction="row" alignItems="center">
              <Mui.Typography variant="inherit" width={200} noWrap>
                {transaction.transactionId}{" "}
              </Mui.Typography>
              <Mui.IconButton
                size="small"
                onClick={() => contentCopy(transaction.transactionId)}
              >
                <MuiIcons.CopyAll fontSize="inherit" color="primary" />
              </Mui.IconButton>
            </Mui.Stack>
          ),
          hash: (
            <Mui.Stack direction="row" alignItems="center">
              <Mui.Typography variant="inherit" width={200} noWrap>
                {transaction.hash || "-"}
              </Mui.Typography>
              <Mui.IconButton
                size="small"
                onClick={() => contentCopy(transaction.hash)}
              >
                <MuiIcons.CopyAll fontSize="inherit" color="primary" />
              </Mui.IconButton>
            </Mui.Stack>
          ),
          status: (
            <Mui.Typography
              color={
                {
                  completed: "success.light",
                  success: "success.light",
                  failed: "error.light",
                  approved: "success.light",
                  declined: "error.light",
                  pending: "warning.main",
                }[transaction.status.toLowerCase()]
              }
              textTransform="capitalize"
              variant="inherit"
            >
              <MuiIcons.Lens sx={{ fontSize: 8 }} /> {transaction.status}
            </Mui.Typography>
          ),
          actions:
             (
              <Mui.Stack direction="row" spacing={2}>
                <MuiLab.LoadingButton
                  loading={loading}
                  color="success"
                  variant="contained"
                  // fullWidth
                  disabled={transaction.status.toLowerCase() !== "pending"}
                  onClick={() =>
                    handleSubmit(transaction.transactionId, "Approved")
                  }
                >
                  Approve
                </MuiLab.LoadingButton>
                <MuiLab.LoadingButton
                  loading={loading}
                  color="error"
                  variant="contained"
                  // fullWidth
                  disabled={transaction.status.toLowerCase() !== "pending"}
                  onClick={() =>
                    handleSubmit(transaction.transactionId, "Declined")
                  }
                >
                  Decline
                </MuiLab.LoadingButton>
              </Mui.Stack>
            ),
        }))
    : [];

  return transactionLoading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">Wallet Transactions</Mui.Typography>
      <Mui.Tabs
        id="assetNavigation"
        variant="scrollable"
        allowScrollButtonsMobile
        value={tab}
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}
        onChange={handleTabChange}
        sx={{
          color: "info.main",
          width: "fit-content",
          borderBottom: (theme) => `1px solid ${theme.palette.grey[100]}`,
          "& button": {
            minWidth: 50,
          },
          "& .MuiTabs-indicator": {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
          },
          "& .MuiTabs-indicatorSpan": {
            width: "100%",
            backgroundColor: "info.main",
            borderRadius: 2,
          },
        }}
      >
        {/* {["DEPOSIT", "WITHDRAW"].map((coin) => (
          <Mui.Tab
            label={coin}
            value={coin}
            sx={{
              fontSize: 16,
              "&.Mui-selected": {
                color: "info.main",
              },
            }}
          />
        ))} */}
      </Mui.Tabs>
      <Components.Global.Container direction="column" spacing={2}>
        <Mui.Stack
          direction={{ sm: "column", md: "row" }}
          justifyContent="flex-end"
          spacing={2}
        >
          <Mui.TextField
            variant="outlined"
            size="small"
            placeholder="Filter records..."
            onChange={handleChange}
            value={filter}
          />
        </Mui.Stack>
        <Components.Global.ResponsiveTable
          id="Users Transaction"
          titles={[
            "DATE",
            "USERNAME",
            "EMAIL",
            "TYPE",
            "SYMBOL",
            "AMOUNT",
            "TRANSACTION REF",
            "HASH",
            "STATUS",
            "ACTIONS",
          ].filter(Boolean)}
          data={data}
        />
      </Components.Global.Container>
    </Mui.Stack>
  );
};
