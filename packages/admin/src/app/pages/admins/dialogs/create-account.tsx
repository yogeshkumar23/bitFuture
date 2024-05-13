import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Query from "react-query";
import * as Router from "react-router-dom";
import * as Yup from "yup";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Providers from "src/app/providers";

const signUpValidate = Yup.object().shape({
  firstName: Yup.string().nullable().required("No First Name provided"),
  lastName: Yup.string().nullable().required("No Last Name provided"),
  email: Yup.string().nullable().required("No email provided").email(),
  password: Yup.string()
    .nullable()
    .required("No password provided")
    .min(8, "Password too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};'`:"\\|,.<>\/?])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const CreateAccount = () => {
  const navigate = Router.useNavigate();
  const handler = Providers.useCustomHandler;
  const queryClient = Query.useQueryClient();

  const onSubmit = async (
    values: signup.Form,
    { setSubmitting, resetForm }: Formik.FormikHelpers<signup.Form>
  ) => {
    await Api.Server.Request("regsiter", values)
      .then((res) => {
        if (res?.errorCode === "0") {
          queryClient.invalidateQueries("adminList");
          handler({
            message: res.message,
            variant: "success",
          });
        }
        if (res?.error)
          handler({
            message: res.message,
            variant: "error",
          });
        else {
          navigate("..");
          resetForm();
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Components.Global.Dialog icon>
      <Formik.Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={signUpValidate}
        onSubmit={onSubmit}
      >
        {() => (
          <Formik.Form>
            <Mui.Stack component={Mui.DialogTitle}>
              <Mui.Typography variant="h5" align="center">
                Create New Account
              </Mui.Typography>
            </Mui.Stack>
            <Mui.Stack component={Mui.DialogContent} spacing={2}>
              <Components.Form.FormField name="firstName" label="First Name" />
              <Components.Form.FormField name="lastName" label="Last Name" />
              <Components.Form.FormField name="email" label="Email" />
              <Components.Form.FormField
                label="Password"
                name="password"
                type="password"
              />
            </Mui.Stack>
            <Mui.Stack
              component={Mui.DialogActions}
              direction="row"
              justifyContent="center"
            >
              <Components.Form.SubmitButton sx={{ width: "fit-content" }}>
                Submit
              </Components.Form.SubmitButton>
              <Mui.Button
                variant="outlined"
                size="small"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Mui.Button>
            </Mui.Stack>
          </Formik.Form>
        )}
      </Formik.Formik>
    </Components.Global.Dialog>
  );
};

export declare namespace signup {
  export interface Form {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
}
