import * as Mui from "@mui/material";
import * as Query from "react-query";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const BanUser = () => {
  const { state } = Router.useLocation() as { state: Hooks.User.UseUser.User };
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const queryClient = Query.useQueryClient();

  const Submit = () => {
    Api.Server.Request("userAction", {
      type: "ban",
      action: "1",
      uid: state?.uid,
    })
      .then((res) => {
        if (res?.error) {
          handler({
            message: res?.message,
            variant: "error",
          });
        } else {
          handler({
            message: res?.message,
            variant: "success",
          });
          navigate("..");
        }
        queryClient.invalidateQueries("userList");
      })
      .catch((err) => {
        handler({
          message: err?.message,
          variant: "error",
        });
      });
  };

  return (
    <Components.Global.Dialog fullScreen={false} icon>
      <Mui.Stack
        spacing={2}
        component={Mui.DialogContent}
        alignItems="center"
        sx={{ width: 300 }}
      >
        <Mui.Typography variant="h5">
          Ban {`${state?.firstName} ${state?.lastName}`}
        </Mui.Typography>
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
        <Mui.Typography variant="body2">{state?.email}</Mui.Typography>
        <Mui.Stack direction="row" component={Mui.DialogActions}>
          <Mui.Button
            onClick={Submit}
            variant="contained"
            color="error"
            sx={{ marginTop: 2 }}
          >
            Ban
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
