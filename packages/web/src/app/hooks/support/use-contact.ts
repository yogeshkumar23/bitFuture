import * as Formik from "formik";
import * as Router from "react-router-dom";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const useContact = () => {
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const { add } = Hooks.Firebase.useFirestore(true);
  // Get Touch
  const getTouch = async (
    values: UseContact.getTouch,
    { setSubmitting, resetForm }: Formik.FormikHelpers<UseContact.getTouch>
  ) => {
    await add("contacts", values)
      .then(() => {
        handler({ message: "Your message submitted", variant: "success" });
        navigate("..");
      })
      .catch(() =>
        handler({
          message: "Something went wrong, Please try again",
          variant: "error",
        })
      )
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  const subscribe = async (
    values: UseContact.subscribe,
    { setSubmitting, resetForm }: Formik.FormikHelpers<UseContact.subscribe>
  ) => {
    await add("subscribers", values)
      .then(() => {
        handler({ message: "Subscribed", variant: "success" });
      })
      .catch(() =>
        handler({
          message: "Something went wrong, Please try again",
          variant: "error",
        })
      )
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  return { getTouch, subscribe };
};

export declare namespace UseContact {
  export interface getTouch {
    name: string;
    email: string;
    message: string;
  }

  export interface subscribe {
    email: string;
  }
}
