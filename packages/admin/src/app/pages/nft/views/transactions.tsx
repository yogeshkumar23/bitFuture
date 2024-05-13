import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Transactions = ({
  logs,
  elements,
  users,
}: {
  logs: logger[];
  elements: React.ReactNode;
  users: Hooks.Admin.UseUser.User[];
}) => {
  const [filter, setFilter] = React.useState("");
  const { contentCopy } = Hooks.User.useUtils();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const data = logs
    ? logs
        .filter(({ from, to, contract, tokenId, price }) =>
          `${from.toLowerCase()} ${to.toLowerCase()} ${contract.toLowerCase()} ${tokenId} ${price}`.includes(
            filter.toLowerCase()
          )
        )
        .sort((a, b) => b.time - a.time)
        .map((log) => {
          const fromUserDeatil =
            log.from.toLowerCase() ===
            Constants.NFT.contractAddress.toLowerCase()
              ? { firstName: "DooWorld", lastName: "MarketPlace", email: "" }
              : users?.find(
                  ({ metaMaskWallet }) =>
                    metaMaskWallet?.toLowerCase() === log.from.toLowerCase()
                ) || { firstName: "Not", lastName: "Set", email: "" };
          const toUserDeatil =
            log.to.toLowerCase() === Constants.NFT.contractAddress.toLowerCase()
              ? { firstName: "DooWorld", lastName: "MarketPlace", email: "" }
              : users?.find(
                  ({ metaMaskWallet }) =>
                    metaMaskWallet?.toLowerCase() === log.to.toLowerCase()
                ) || { firstName: "Not", lastName: "Set", email: "" };
          return {
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
            from: (
              <Mui.Stack>
                <Mui.Typography variant="inherit">{`${fromUserDeatil?.firstName} ${fromUserDeatil?.lastName}`}</Mui.Typography>
                <Mui.Typography variant="inherit">
                  {fromUserDeatil?.email}
                </Mui.Typography>
                <Mui.Stack direction="row" alignItems="center">
                  <Mui.Typography variant="inherit" width={100} noWrap>
                    {log.from}{" "}
                  </Mui.Typography>
                  <Mui.IconButton
                    size="small"
                    onClick={() => contentCopy(log.from)}
                  >
                    <MuiIcons.CopyAll fontSize="inherit" color="primary" />
                  </Mui.IconButton>
                </Mui.Stack>
              </Mui.Stack>
            ),
            to: (
              <Mui.Stack>
                <Mui.Typography variant="inherit">{`${toUserDeatil?.firstName} ${toUserDeatil?.lastName}`}</Mui.Typography>
                <Mui.Typography variant="inherit">
                  {toUserDeatil?.email}
                </Mui.Typography>
                <Mui.Stack direction="row" alignItems="center">
                  <Mui.Typography variant="inherit" width={100} noWrap>
                    {log.to}{" "}
                  </Mui.Typography>
                  <Mui.IconButton
                    size="small"
                    onClick={() => contentCopy(log.to)}
                  >
                    <MuiIcons.CopyAll fontSize="inherit" color="primary" />
                  </Mui.IconButton>
                </Mui.Stack>
              </Mui.Stack>
            ),
            price: (
              <Components.Global.Format
                type="coin"
                number={log.price}
                coin="ETH"
              />
            ),
            gasFee: (
              <Components.Global.Format
                type="coin"
                number={log.fee}
                coin="ETH"
              />
            ),
            // enteredQuantity: (
            //   <Components.Global.Format
            //     type="coin"
            //     number={log.enteredQuantity}
            //     coin="ETH"
            //   />
            // ),
          };
        })
    : [];

  return (
    <>
      <Mui.Stack
        direction={{ sm: "column", md: "row" }}
        justifyContent="flex-end"
        spacing={2}
      >
        {elements}
        <Mui.TextField
          variant="outlined"
          size="small"
          placeholder="Filter records..."
          onChange={handleFilterChange}
          value={filter}
        />
      </Mui.Stack>
      <Components.Global.ResponsiveTable
        id="NFT Transactions"
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
        data={data}
      />
    </>
  );
};
