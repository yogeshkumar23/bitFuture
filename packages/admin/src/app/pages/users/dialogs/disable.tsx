import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Providers from "src/app/providers";
import * as Query from "react-query";

export const Disable = () => {
  const { state } = Router.useLocation() as { state: Disable.Props };
  const queryClient = Query.useQueryClient();
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();

  const Submit = () => {
    Api.Server.Request("updateTwoFactorAuthentication", {
      action: "0",
      uid: state.uid,
    }).then((res) => {
      res?.errorCode === "0"
        ? handler({
            message: res?.message,
            variant: "success",
          })
        : "";
      queryClient.invalidateQueries("userList");
      res?.error
        ? handler({
            message: res?.message,
            variant: "error",
          })
        : navigate("..");
    });
  };

  return (
    <Components.Global.Dialog icon fullScreen={false}>
      <Mui.Stack
        spacing={3}
        component={Mui.DialogContent}
        alignItems="center"
        sx={{ minWidth: "100%" }}
      >
        <Mui.Typography variant="h5">Disable Admin Two FA</Mui.Typography>
        <Mui.Avatar
          src={
            state?.profileImage
              ? `${import.meta.env.VITE_API_ENCRYPTION}://${
                  import.meta.env.VITE_API_IP
                }${import.meta.env.VITE_ASSETS_PATH}${state?.profileImage}`
              : `https://avatars.dicebear.com/api/initials/${state?.firstName}_${state?.lastName}.svg`
          }
          sx={{ height: 50, width: 50 }}
        />
        <Mui.Typography variant="body2">{`${state?.firstName} ${state?.lastName}`}</Mui.Typography>
        <Mui.Typography variant="body2">{state?.email}</Mui.Typography>
        <Mui.Stack direction="row" component={Mui.DialogActions}>
          <Mui.Button
            onClick={Submit}
            variant="contained"
            color="error"
            sx={{ marginTop: 2 }}
          >
            Disable
          </Mui.Button>
          <Mui.Button
            component={Router.Link}
            to="../"
            variant="outlined"
            sx={{ marginTop: 2, ml: 2 }}
          >
            Cancel
          </Mui.Button>
        </Mui.Stack>
      </Mui.Stack>
    </Components.Global.Dialog>
  );
};

export declare namespace Disable {
  export interface Props {
    firstName: string;
    lastName: string;
    email: string;
    uid: string;
    profileImage: string;
  }
}
