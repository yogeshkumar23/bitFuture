import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Formik from "formik";
import * as Assets from "src/assets";
import * as Component from "src/app/components";

export const RemoveProfile = () => {
  const { setFieldValue } = Formik.useFormikContext();
  const navigate = Router.useNavigate();
  const { state } = Router.useLocation() as {
    state: { newPassword: string; removeProfile: string };
  };
  const handleDelete = () => {
    setFieldValue("profileImage", "");
    navigate("..", { state: { ...state, removeProfile: true } });
  };

  return state ? (
    <Component.Global.Dialog fullScreen={false} icon>
      <Mui.Stack
        component={Mui.DialogContent}
        spacing={3}
        alignItems="center"
        sx={{ p: 7 }}
      >
        <Mui.CardMedia
          component="img"
          src={Assets.DeletePhoto}
          sx={{ height: "auto", width: 50 }}
        />
        <Mui.Typography variant="h5" textAlign="center">
          Delete Photo
        </Mui.Typography>
        <Mui.Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
        >
          Are you sure you want to delete the profile picture?
        </Mui.Typography>
        <Mui.Stack direction="row" spacing={2}>
          <Mui.Button variant="contained" onClick={handleDelete}>
            <Mui.Typography variant="h6">Yes, Delete</Mui.Typography>
          </Mui.Button>
          <Mui.Button
            variant="outlined"
            color="secondary"
            component={Router.Link}
            to=".."
          >
            <Mui.Typography variant="h6">Discard</Mui.Typography>
          </Mui.Button>
        </Mui.Stack>
      </Mui.Stack>
    </Component.Global.Dialog>
  ) : (
    <Router.Navigate to=".." />
  );
};
