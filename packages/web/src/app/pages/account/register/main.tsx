import * as Formik from "formik";
import * as Router from "react-router-dom";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Validations from "src/app/validations";

export const Main = () => {
  const { register, referal } = Hooks.User.useAuth();

  return (
    <>
      <Formik.Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          referalCode: referal || "",
          termsOfService: false,
        }}
        validationSchema={Validations.register}
        onSubmit={register}
      >
        {() => (
          <Formik.Form>
            <Pages.Account.Register.Views.Content />
          </Formik.Form>
        )}
      </Formik.Formik>
      <Router.Outlet />
    </>
  );
};
