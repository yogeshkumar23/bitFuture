import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const PayTransactions = () => {
  const [filter, setFilter] = React.useState("");
  const {
    payTransactions: transactions,
    loading,
    payPageNo,
    handlePayPageNo,
  } = Hooks.Admin.usePayTransactions();
  const { contentCopy } = Hooks.User.useUtils();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const data = transactions?.transferList
    ? transactions.transferList
        .filter((transaction) =>
          `${transaction.transferId} ${transaction.type} ${transaction.typeId} ${transaction.quantity} ${transaction.senderFirstName} ${transaction.senderLastName} ${transaction.receiverFirstName} ${transaction.receiverLastName} ${transaction.senderEmail} ${transaction.receiverEmail} ${transaction.status}}`
            .toLowerCase()
            .includes(filter)
        )
        .map((transaction) => ({
          date: transaction.createdAt,
          sender: (
            <Mui.Typography variant="inherit">
              {transaction.senderFirstName} {transaction.senderLastName} (
              {transaction.senderEmail})
            </Mui.Typography>
          ),
          receiver: (
            <Mui.Typography variant="inherit">
              {transaction.receiverFirstName} {transaction.receiverLastName} (
              {transaction.receiverEmail})
            </Mui.Typography>
          ),
          type: transaction.type,
          asset:
            transaction.type === "NFT"
              ? `#${transaction.typeId.split("_")?.[0]}`
              : transaction.typeId,
          quantity: transaction.quantity,
          message: (
            <Mui.Tooltip title={transaction.message}>
              <Mui.Typography variant="inherit" width={200} noWrap>
                {transaction.message || "-"}
              </Mui.Typography>
            </Mui.Tooltip>
          ),
          transactionRef: (
            <Mui.Stack direction="row" alignItems="center">
              <Mui.Typography variant="inherit" width={200} noWrap>
                {transaction.transferId}{" "}
              </Mui.Typography>
              <Mui.IconButton
                size="small"
                onClick={() => contentCopy(transaction.transferId)}
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
      <Mui.Typography variant="h5">BitFuture Pay Transactions</Mui.Typography>
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
          id="Users TITAPay Transaction"
          titles={[
            "Date",
            "Sender",
            "Receiver",
            "Type",
            "Asset",
            "Quantity",
            "Message",
            "Transaction REF",
            "Status",
          ]}
          data={data}
          count={transactions?.totalListCount || 0}
          pageNo={payPageNo}
          setPageNo={handlePayPageNo}
        />
      </Components.Global.Container>
    </Mui.Stack>
  );
};
