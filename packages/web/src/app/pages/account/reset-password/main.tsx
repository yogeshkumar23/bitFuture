import * as Formik from "formik";
import * as Router from "react-router-dom";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Validations from "src/app/validations";

export const Main = () => {
  const { reset } = Hooks.User.useAuth();

  return (
    <>
      <Formik.Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Validations.resetPasword}
        onSubmit={reset}
      >
        {() => (
          <Formik.Form>
            <Pages.Account.Reset.Views.Content />
          </Formik.Form>
        )}
      </Formik.Formik>
      <Router.Outlet />
    </>
  );
};
