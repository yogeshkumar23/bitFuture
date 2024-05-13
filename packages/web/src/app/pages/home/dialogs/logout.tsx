import * as Mui from "@mui/material";
import React from "react";
import * as Assets from "src/assets";
import * as Contexts from "src/app/contexts";
import * as Component from "src/app/components";

export const Logout = ({
  open,
  close,
}: {
  close: () => void;
  open?: boolean;
}) => {
  const { update } = React.useContext(Contexts.UserContext);
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    update();
  };
  return (
    <Component.Global.Dialog
      open={open}
      fullScreen={false}
      icon
      onClose={close}
    >
      <Mui.Stack component={Mui.DialogContent} spacing={3} alignItems="center">
        <Mui.CardMedia
          component="img"
          src={Assets.Logout}
          sx={{ height: "auto", width: 50 }}
        />
        <Mui.Typography variant="h5" textAlign="center">
          Logout
        </Mui.Typography>
        <Mui.Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
        >
          Are you sure you want to logout?
        </Mui.Typography>
        <Mui.Stack direction="row" spacing={2}>
          <Mui.Button size="small" variant="contained" onClick={handleLogout}>
            <Mui.Typography variant="h6">Yes, Logout</Mui.Typography>
          </Mui.Button>
          <Mui.Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={close}
          >
            <Mui.Typography variant="h6">Cancel</Mui.Typography>
          </Mui.Button>
        </Mui.Stack>
      </Mui.Stack>
    </Component.Global.Dialog>
  );
};
