import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Main = () => {
  const [filter, setFilter] = React.useState("");
  const { transactions, loading } = Hooks.Admin.useTransactions();
  const { contentCopy } = Hooks.User.useUtils();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

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
                      failed: theme.palette.error.main,
                      pending: theme.palette.warning.main,
                    }[transaction.status]
                  }30`,
                p: 1,
                borderRadius: 1,
              }}
              color={
                {
                  completed: "success.light",
                  success: "success.light",
                  failed: "error.light",
                  pending: "warning.main",
                }[transaction.status]
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
                  pending: "warning.main",
                }[transaction.status]
              }
              textTransform="capitalize"
              variant="inherit"
            >
              <MuiIcons.Lens sx={{ fontSize: 8 }} /> {transaction.status}
            </Mui.Typography>
          ),
        }))
    : [];

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">Wallet Transactions</Mui.Typography>
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
          ]}
          data={data}
        />
      </Components.Global.Container>
    </Mui.Stack>
  );
};
