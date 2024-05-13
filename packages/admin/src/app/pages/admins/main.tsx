import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";

export const Main = () => {
  const navigate = Router.useNavigate();
  const user = React.useContext(Contexts.UserContext);
  const [filter, setFilter] = React.useState("");
  const { adminUsers, loading } = Hooks.Admin.useAdminUserList();

  const filteredUsers = adminUsers?.adminList
    ? adminUsers?.adminList
        ?.filter(({ uid }) => uid !== user?.uid)
        ?.filter((user) =>
          `${user.firstName} ${user.lastName} ${user.email}`
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase())
        )
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const data = filteredUsers?.map((user, index) => ({
    name: `${user.firstName} ${user.lastName}`,
    email: (
      <Mui.Stack direction="row" alignItems="center" key={index}>
        {Boolean(user.email_verified) && (
          <MuiIcons.Verified sx={{ color: "success.dark", mr: 1 }} />
        )}
        {user.email}
      </Mui.Stack>
    ),
    "2FA": (
      <Mui.Stack direction="row" spacing={1} alignItems="center" key={index}>
        {user.enableTwoFactor ? (
          <Mui.Button
            size="small"
            disabled={!Boolean(user.enableTwoFactor)}
            onClick={() => navigate("disable", { state: user })}
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
    actions: (
      <Mui.Stack direction="row" spacing={2} key={index}>
        <Mui.Button
          size="small"
          onClick={() => navigate(`${user?.uid}/view`, { state: user })}
          variant="contained"
        >
          Edit
        </Mui.Button>
      </Mui.Stack>
    ),
  }));

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, sm: 2 } }}>
      <Mui.Stack
        spacing={1}
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Mui.Typography variant="h5">Admin Management</Mui.Typography>
        <Mui.Button
          startIcon={<MuiIcons.Add />}
          variant="contained"
          component={Router.Link}
          to="create-account"
        >
          Create Account
        </Mui.Button>
      </Mui.Stack>
      <Components.Global.Container spacing={2} direction="column">
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
          id="Admin Users"
          titles={["Username", "Email", "Two FA", "Actions"]}
          data={data}
        />
      </Components.Global.Container>
      <Router.Outlet />
    </Mui.Stack>
  );
};
