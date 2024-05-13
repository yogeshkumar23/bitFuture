import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";

export const SecurityDetails = () => {
  const user = React.useContext(Contexts.UserContext);

  const disableTwoStep = async () => {
    await Api.Server.Request("enableTwoStepVerification", { status: "false" });
    user?.update();
  };

  return (
    <Components.Global.Container
      direction="column"
      justifyContent="start"
      spacing={2}
    >
      <Mui.Typography variant="h5">Security Details</Mui.Typography>
      <Mui.Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Mui.Typography variant="body1">
          Two-Factor Authentication
        </Mui.Typography>
        {!user?.enableTwoFactor ? (
          <Mui.Button
            variant="contained"
            component={Router.Link}
            to="two-factor"
          >
            Enable
          </Mui.Button>
        ) : (
          <Mui.Button
            color="secondary"
            variant="outlined"
            onClick={disableTwoStep}
          >
            Disable
          </Mui.Button>
        )}
      </Mui.Stack>
    </Components.Global.Container>
  );
};
