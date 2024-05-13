import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Validations from "src/app/validations";

export const Subscribe = () => {
  const { subscribe } = Hooks.Support.useContact();
  return (
    <Formik.Formik
      initialValues={{ email: "" }}
      validationSchema={Validations.email}
      onSubmit={subscribe}
    >
      {() => (
        <Mui.Stack component={Formik.Form} spacing={2}>
          <Components.Form.FormField
            size="medium"
            name="email"
            placeholder="Enter your email"
          />
          <Components.Form.SubmitButton
            size="large"
            sx={{
              width: "fit-content",
              height: "fit-content",
              fontWeight: 900,
            }}
          >
            Subscribe
          </Components.Form.SubmitButton>
        </Mui.Stack>
      )}
    </Formik.Formik>
  );
};
