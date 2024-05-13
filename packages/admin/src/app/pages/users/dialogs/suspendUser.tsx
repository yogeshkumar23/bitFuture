import * as Mui from "@mui/material";
import * as Query from "react-query";
import * as Router from "react-router-dom";
import * as Yup from "yup";
import * as Formik from "formik";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

const validateNewOrder = Yup.object().shape({
  suspendUntil: Yup.string().nullable(),
});

export const SuspendUser = () => {
  const { state } = Router.useLocation() as {
    state: Hooks.User.UseUser.User;
  };
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const queryClient = Query.useQueryClient();

  const onSubmit = (values: suspend.Form) => {
    let totaldate = new Date(values.suspendUntil as Date);
    let year = totaldate.getFullYear().toString();
    let date = totaldate.getDate().toString();
    let month = totaldate.getMonth() + 1;
    Api.Server.Request("userAction", {
      type: "suspend",
      action: "1",
      uid: state.uid,
      date: `${year}'-'${month}'-'${date}`,
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
      <Mui.Stack spacing={2} component={Mui.DialogContent} alignItems="center">
        <Formik.Formik
          initialValues={{ suspendUntil: new Date() }}
          validationSchema={validateNewOrder}
          onSubmit={onSubmit}
        >
          {() => (
            <Mui.Stack
              component={Formik.Form}
              alignItems="center"
              spacing={2}
              sx={{ width: 300 }}
            >
              <Mui.Typography variant="h5" align="center">
                Suspend {`${state?.firstName} ${state?.lastName}`}
              </Mui.Typography>
              <Mui.Avatar
                src={
                  state?.profileImage
                    ? `${import.meta.env.VITE_API_ENCRYPTION}://${
                        import.meta.env.VITE_API_IP
                      }${import.meta.env.VITE_ASSETS_PATH}${
                        state?.profileImage
                      }`
                    : `https://avatars.dicebear.com/api/initials/${state?.firstName}_${state?.lastName}.svg`
                }
                sx={{ height: 50, width: 50 }}
              />
              <Mui.Typography variant="body2">{state?.email}</Mui.Typography>

              <Mui.Box sx={{ mt: 2 }}>
                <Components.Form.DateTimePicker
                  disablePast
                  dateOnly
                  inputFormat="yyyy/MM/dd"
                  size="small"
                  label="Suspend Until"
                  name="suspendUntil"
                />
              </Mui.Box>
              <Mui.Stack
                direction="row"
                justifyContent="center"
                component={Mui.DialogActions}
              >
                <Mui.Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  sx={{ marginTop: 2 }}
                >
                  Suspend
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
          )}
        </Formik.Formik>
      </Mui.Stack>
    </Components.Global.Dialog>
  );
};

export declare namespace suspend {
  export interface Form {
    suspendUntil: Date | number;
  }
}
