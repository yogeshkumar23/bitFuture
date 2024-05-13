import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export const PreviewNotification = () => {
  const { state } = Router.useLocation() as {
    state: generalNotification;
  };

  return (
    <Components.Global.Dialog icon>
      <Mui.DialogTitle sx={{ m: 3 }}>
        <Mui.Typography variant="h5" textAlign="center">
          Notification Preview
        </Mui.Typography>
      </Mui.DialogTitle>
      <Mui.DialogContent>
        <Mui.Stack spacing={3}>
          <Pages.User.Notifications.Views.General {...state} preview />
        </Mui.Stack>
      </Mui.DialogContent>
    </Components.Global.Dialog>
  );
};
