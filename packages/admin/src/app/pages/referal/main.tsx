import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Main = () => {
  const [filter, setFilter] = React.useState("");
  const { users, loading } = Hooks.Admin.useUserList();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);
  const filteredUsers = users?.userList
    ? users.userList
        // .filter((user) => Boolean(user?.referredCount))
        .filter((user) =>
          `${user.firstName} ${user.lastName} ${user.email}`
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase())
        )
    : [];

  const data = filteredUsers.map((user) => ({
    userName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    count: (
      <Components.Global.Format type="number" number={user.referredCount} />
    ),
    action: (
      <Mui.Button
        component={Router.Link}
        to={user.uid}
        variant="contained"
        size="small"
      >
        Referrals
      </Mui.Button>
    ),
  }));

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">Referrals</Mui.Typography>
      <Components.Global.Container spacing={1} direction="column">
        <Mui.Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          justifyContent="flex-end"
        >
          <Mui.TextField
            variant="outlined"
            size="small"
            placeholder="Search by Username (or) Email"
            onChange={handleChange}
            value={filter}
          />
        </Mui.Stack>
        <Components.Global.ResponsiveTable
          id="Users referral"
          titles={["Username", "Email", "Referred User Count", "Action"]}
          data={data}
        />
      </Components.Global.Container>
      <Router.Outlet />
    </Mui.Stack>
  );
};
