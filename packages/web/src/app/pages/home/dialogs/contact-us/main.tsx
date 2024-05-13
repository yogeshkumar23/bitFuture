import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as Yup from "yup";
import * as Pages from "src/app/pages";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

const contactValidate = Yup.object().shape({
  name: Yup.string().required("No Name provided"),
  email: Yup.string().required("No Email provided").email(),
  message: Yup.string().required("No Message content provided"),
});

export const Main = () => {
  const { getTouch } = Hooks.Support.useContact();
  return (
    <Components.Global.Dialog icon maxWidth="md">
      <Mui.Grid container component={Mui.DialogContent} spacing={2}>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h5">Get In Touch</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Formik.Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={contactValidate}
            onSubmit={getTouch}
          >
            {() => (
              <Mui.Stack spacing={2} component={Formik.Form}>
                <Pages.Home.Dialogs.ContactUs.Views.Content />
              </Mui.Stack>
            )}
          </Formik.Formik>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Pages.Home.Dialogs.ContactUs.Views.InfoCard />
        </Mui.Grid>
      </Mui.Grid>
    </Components.Global.Dialog>
  );
};
