import * as Formik from "formik";
import * as Router from "react-router-dom";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Validations from "src/app/validations";

export const Main = () => {
  const { forgot } = Hooks.User.useAuth();

  return (
    <>
      <Formik.Formik
        initialValues={{ email: "" }}
        validationSchema={Validations.email}
        onSubmit={forgot}
      >
        {() => (
          <Formik.Form>
            <Pages.Account.Forgot.Views.Content />
          </Formik.Form>
        )}
      </Formik.Formik>
      <Router.Outlet />
    </>
  );
};
