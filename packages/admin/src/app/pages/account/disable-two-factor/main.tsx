import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Contexts from "src/app/contexts";
import * as Pages from "src/app/pages";

export const Main = () => {
  const user = React.useContext(Contexts.UserContext);
  const navigate = Router.useNavigate();
  const handleClick = () => navigate(-1);
  return (
    <>
      <Mui.CardContent
        component={Mui.Stack}
        spacing={2}
        sx={{ height: "90vh", justifyContent: "center", mx: { sm: 6 } }}
      >
        <Mui.Typography variant="h5">
          Disable Two Factor Authentication
        </Mui.Typography>
        {/* <Mui.Typography variant="subtitle1">
          Give a valid email address for setting up a safe and secure account.
          Entering OTP will confirm your email for further verifications.
        </Mui.Typography> */}
        <Pages.Account.DisableTowFactor.Views.DisableTwoFactor />
        <Mui.Typography
          textAlign="center"
          sx={{
            display: Boolean(user?.enableTwoFactor) ? "none" : undefined,
          }}
        >
          <Mui.Link
            color="text.secondary"
            component={Mui.Button}
            onClick={handleClick}
          >
            Remind me later
          </Mui.Link>
        </Mui.Typography>
      </Mui.CardContent>
      <Router.Outlet />
    </>
  );
};
