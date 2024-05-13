import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const UserBalance = () => {
  const { users, loading } = Hooks.Admin.useUserList();
  const [filter, setFilter] = React.useState("");
  const [coinName, setCoinName] = React.useState("all");
  const { data: coins } =
    Hooks.Firebase.useFireSnapshot<Hooks.Main.UseCoin.coin>(
      "collection",
      "coins"
    ).collectionSnapshot();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const filteredUsers = users?.userList
    ? users.userList?.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
    : [];

  const data = filteredUsers
    .map((user) => user.wallet)
    .flat()
    .filter(({ typeId }) => (coinName === "all" ? true : typeId === coinName))
    .map((wallet) => ({
      name: `${
        filteredUsers.filter((user) => user.uid === wallet.uid)[0].firstName
      } ${filteredUsers.filter((user) => user.uid === wallet.uid)[0].lastName}`,
      uid: `${wallet.uid}`,
      currency: <Mui.Typography>{wallet.typeId}</Mui.Typography>,
      spot: (
        <Mui.Typography>
          {wallet.type === "COIN" ? wallet.balance : 0}
        </Mui.Typography>
      ),
      p2p: `${wallet.type === "AMOUNT" ? wallet.balance : 0}`,
    }));

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">User Balance</Mui.Typography>
      <Components.Global.Container>
        <Mui.Grid container spacing={1}>
          <Mui.Grid item xs={12}>
            <Mui.Stack
              spacing={1}
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              sx={{ width: "100%", mb: 1 }}
            >
              <Mui.Select
                size="small"
                onChange={(event) =>
                  setCoinName(event.target.value.replace(/\/.*/g, ""))
                }
                name="coin"
                sx={{
                  minWidth: 200,
                  "& #mui-component-select-coin": {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  "& .MuiListItemIcon-root": {
                    minWidth: "fit-content",
                    mr: 1,
                  },
                }}
                defaultValue={coinName}
              >
                <Mui.MenuItem value="all">
                  <Mui.Typography variant="body1">All Coins</Mui.Typography>
                </Mui.MenuItem>
                {[
                  ...new Map(
                    coins?.map((coin) => [coin["coin"], coin])
                  ).values(),
                ]?.map((coin, index) => (
                  <Mui.MenuItem key={index} value={coin.coin}>
                    <Mui.ListItemIcon>
                      <Mui.Avatar
                        src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                          import.meta.env.VITE_API_IP
                        }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
                        sx={{ height: 30, width: 30 }}
                      />
                    </Mui.ListItemIcon>
                    <Mui.Typography variant="body2">{coin.coin}</Mui.Typography>
                  </Mui.MenuItem>
                ))}
              </Mui.Select>
              <Mui.TextField
                variant="outlined"
                size="small"
                placeholder="Search by Username"
                onChange={handleChange}
                value={filter}
              />
            </Mui.Stack>
          </Mui.Grid>

          <Mui.Grid item xs={12}>
            <Components.Global.ResponsiveTable
              id="User Balance"
              titles={["Username", "UID", "Currency", "Spot", "P2P"]}
              data={data}
            />
          </Mui.Grid>
        </Mui.Grid>
      </Components.Global.Container>
      <Router.Outlet />
    </Mui.Stack>
  );
};
