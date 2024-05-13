import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Main = () => {
  const navigate = Router.useNavigate();
  const [status, setStatus] = React.useState("all");
  const [filter, setFilter] = React.useState("");
  const { userKYCList, loading } = Hooks.Admin.useUserKycList();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);
  const handleStatusChange = (e: Mui.SelectChangeEvent) =>
    setStatus(e.target.value);
  const filteredUsers = userKYCList?.userKycList
    ? userKYCList.userKycList
        .filter(
          (user: Hooks.Admin.useUserKyc.kyc) =>
            ({
              all: true,
              notSubmitted: !Boolean(user.addressProofPhoto),
              completed: user.idProof_verified && user.addressProof_verified,
              pending:
                !(user.idProof_verified && user.addressProof_verified) &&
                Boolean(user.addressProofPhoto),
            }[status])
        )
        .filter((user: Hooks.Admin.useUserKyc.kyc) =>
          `${user.firstName} ${user.lastName} ${user.email}`
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase())
        )
    : [];

  const data = filteredUsers.map((user: Hooks.Admin.useUserKyc.kyc) => ({
    name: `${user.firstName} ${user.lastName}`,
    email: (
      <Mui.Stack direction="row" alignItems="center">
        {Boolean(user.email_verified) && (
          <MuiIcons.Verified sx={{ color: "success.dark", mr: 1 }} />
        )}
        {user.email}
      </Mui.Stack>
    ),
    status:
      user.idProof_verified === 1 && user.addressProof_verified === 1 ? (
        <Mui.Typography color="success.dark">Completed</Mui.Typography>
      ) : (
        <Mui.Typography color="warning.dark">Pending</Mui.Typography>
      ),
    action: (
      <Mui.Stack direction="row" spacing={2}>
        {Boolean(user.addressProofPhoto) ? (
          <Mui.Button
            size="small"
            onClick={() => navigate("details", { state: user })}
            color="info"
            variant="contained"
          >
            View Details
          </Mui.Button>
        ) : (
          <Mui.Typography color="text.secondary">Not Submitted</Mui.Typography>
        )}
      </Mui.Stack>
    ),
  }));

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">KYC Verification</Mui.Typography>
      <Components.Global.Container spacing={2} direction="column">
        <Mui.Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Mui.Select
            size="small"
            value={status}
            onChange={handleStatusChange}
            sx={{ width: 150 }}
          >
            <Mui.MenuItem value="all">All Status</Mui.MenuItem>
            <Mui.MenuItem value="notSubmitted">Not Submitted</Mui.MenuItem>
            <Mui.MenuItem value="pending">Pending</Mui.MenuItem>
            <Mui.MenuItem value="completed">Completed</Mui.MenuItem>
          </Mui.Select>
          <Mui.Box flexGrow={1} />
          <Mui.TextField
            variant="outlined"
            size="small"
            placeholder="Search by Username (or) Email"
            onChange={handleChange}
            value={filter}
          />
        </Mui.Stack>
        <Components.Global.ResponsiveTable
          id="Users KYC"
          titles={["Username", "Email", "Status", "Actions"]}
          data={data}
        />
      </Components.Global.Container>
      <Router.Outlet />
    </Mui.Stack>
  );
};
