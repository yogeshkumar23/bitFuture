import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Main = () => {
  const navigate = Router.useNavigate();
  const [filter, setFilter] = React.useState("");
  const { users, loading } = Hooks.Admin.useUserList();

  const filteredUsers = users?.userList
    ? users.userList?.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email}`
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
    : [];

  const handleNavigate = (path: string, values: Hooks.Admin.UseUser.User) =>
    navigate(path, { state: values });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const data = filteredUsers?.map((user) => ({
    name: (
      <Mui.Link
        title="See Review"
        component={Router.Link}
        to={`${Constants.API_CONFIG.base}users/details/${user.uid}/info`}
      >
        {user.firstName} {user.lastName}
        <MuiIcons.OpenInNew fontSize="inherit" />
      </Mui.Link>
    ),
    email: (
      <Mui.Stack direction="row" alignItems="center">
        {Boolean(user.email_verified) && (
          <MuiIcons.Verified sx={{ color: "success.dark", mr: 1 }} />
        )}
        {user.email}
      </Mui.Stack>
    ),
    status: user.is_Baned ? (
      <Mui.Typography variant="inherit" color="error.dark">
        Banned
      </Mui.Typography>
    ) : user.is_Suspended ? (
      <Mui.Typography variant="inherit" color="warning.dark">
        Suspend
      </Mui.Typography>
    ) : (
      <Mui.Typography variant="inherit" color="success.dark">
        Active
      </Mui.Typography>
    ),
    twoFA: (
      <Mui.Stack direction="row" spacing={1} alignItems="center">
        {user.enableTwoFactor ? (
          <Mui.Button
            size="small"
            disabled={!Boolean(user.enableTwoFactor)}
            onClick={() => handleNavigate("disable", user)}
            color="error"
            variant="contained"
            sx={{ display: Boolean(user.enableTwoFactor) ? "flex" : "none" }}
          >
            Disable
          </Mui.Button>
        ) : (
          <Mui.Typography variant="inherit" color="error.dark">
            Disabled
          </Mui.Typography>
        )}
      </Mui.Stack>
    ),
    action: (
      <Mui.Stack direction="row" spacing={2}>
        <Mui.Button
          size="small"
          disabled={!Boolean(user.is_Baned) && !Boolean(user.is_Suspended)}
          onClick={() => handleNavigate("activate", user)}
          color="success"
          variant="contained"
        >
          Activate
        </Mui.Button>
        <Mui.Button
          size="small"
          disabled={Boolean(user.is_Suspended)}
          onClick={() => handleNavigate("suspend", user)}
          color="warning"
          variant="contained"
        >
          Suspend
        </Mui.Button>
        <Mui.Button
          size="small"
          disabled={Boolean(user.is_Baned)}
          onClick={() => handleNavigate("ban", user)}
          color="error"
          variant="contained"
        >
          Ban User
        </Mui.Button>
      </Mui.Stack>
    ),
  }));

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">User Mangement</Mui.Typography>
      <Components.Global.Container spacing={1} direction="column">
        <Mui.Stack
          direction={{ sm: "column", md: "row" }}
          justifyContent="flex-end"
          spacing={2}
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
          id="Users Details"
          titles={["Username", "Email", "Status", "Two FA", "Actions"]}
          data={data}
        />
      </Components.Global.Container>
      <Router.Outlet />
    </Mui.Stack>
  );
};
