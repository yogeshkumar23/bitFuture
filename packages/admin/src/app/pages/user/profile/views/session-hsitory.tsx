import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const SessionHistory = () => {
  const { sessions, loading } = Hooks.User.useSession();
  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Components.Global.Container
      direction="column"
      justifyContent="start"
      spacing={2}
      sx={{ height: "80vh" }}
    >
      <Mui.Typography variant="h5">Session History</Mui.Typography>
      <Mui.Stack spacing={2} sx={{ mineight: "100%", overflowY: "auto" }}>
        {sessions?.userDetails
          ?.slice()
          ?.reverse()
          ?.map((session, index) => (
            <React.Fragment key={index}>
              <Mui.Stack>
                <Mui.Typography
                  color={
                    session.status == "Complete"
                      ? "success.light"
                      : "error.light"
                  }
                  variant="body2"
                  sx={{ mb: -2 }}
                >
                  <MuiIcons.Lens sx={{ fontSize: 6 }} /> {session.status}
                </Mui.Typography>
              </Mui.Stack>
              <Mui.Stack direction="row" justifyContent="space-between">
                <Mui.Typography noWrap variant="body2">
                  {session.device == "" ? "---" : session.device}
                  <Mui.Typography noWrap variant="body2">
                    {session.ipAddress}
                  </Mui.Typography>
                </Mui.Typography>
                <Mui.Typography noWrap variant="body2" color="text.secondary">
                  {session.OS == "" ? "---" : session.OS}
                  <Mui.Typography noWrap variant="body2" color="text.secondary">
                    {Components.Global.timeFn(
                      session.created_At as unknown as string
                    )}
                  </Mui.Typography>
                </Mui.Typography>
              </Mui.Stack>
              <Mui.Divider />
            </React.Fragment>
          ))}
      </Mui.Stack>
    </Components.Global.Container>
  );
};
