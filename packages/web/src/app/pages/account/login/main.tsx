import * as Formik from "formik";
import * as Router from "react-router-dom";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Validations from "src/app/validations";

export const Main = () => {
  const { login } = Hooks.User.useAuth();
  return (
    <>
      <Formik.Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Validations.login}
        onSubmit={login}
      >
        {({ values }) => (
          <Formik.Form>
            <Pages.Account.Login.Views.Content userData={values.email} />
          </Formik.Form>
        )}
      </Formik.Formik>
      <Router.Outlet />
    </>
  );
};

