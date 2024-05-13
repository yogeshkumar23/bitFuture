import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as Router from "react-router-dom";
import React from "react";
import * as Pages from "src/app/pages";
import * as Hooks from "src/app/hooks";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Providers from "src/app/providers";
import * as Validations from "src/app/validations";

export const Main = () => {
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const { user } = React.useContext(Contexts.UserContext);
  const [previousComment, setPreviousComment] = React.useState<review.Form>();
  const { state } = Router.useLocation() as { state: Hooks.User.UseUser.User };
  const { get, set } = Hooks.Firebase.useFirestore();
  const Submit = async (
    values: review.Form,
    { setSubmitting, resetForm }: Formik.FormikHelpers<review.Form>
  ) => {
    await set(`users/${state?.id}/reviews`, user?.uid as string, {
      ...values,
      uid: state?.id,
      username: `${user?.firstName} ${user?.lastName}`,
      profile: user?.profileImage,
      time: new Date().getTime(),
    })
      .then(() => {
        handler({
          message: "Comment posted successfully!",
          variant: "success",
        });
        navigate("..");
      })
      .catch((e) =>
        handler({
          message: e.message,
          variant: "error",
        })
      )
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  React.useEffect(() => {
    get(`users/${state?.id}/reviews`, user?.uid as string).then((doc) =>
      setPreviousComment(
        (doc.data() || { comment: "", rating: 0 }) as review.Form
      )
    );
  }, [state?.id]);
  return previousComment === undefined ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Components.Global.Dialog icon>
      <Mui.DialogTitle>
        <Mui.Stack direction="row" spacing={2} alignItems="center">
          <Mui.Avatar
            src={
              state?.profileImage
                ? `${import.meta.env.VITE_API_ENCRYPTION}://${
                    import.meta.env.VITE_API_IP
                  }${import.meta.env.VITE_ASSETS_PATH}${state?.profileImage}`
                : `https://avatars.dicebear.com/api/initials/${state?.firstName}_${state?.lastName}.svg`
            }
          />
          <Mui.Typography variant="body1">
            {`${state?.firstName} ${state?.lastName}`}
          </Mui.Typography>
        </Mui.Stack>
      </Mui.DialogTitle>
      <Formik.Formik
        initialValues={previousComment}
        validationSchema={Validations.reviewValidation}
        onSubmit={Submit}
      >
        {() => (
          <Mui.Stack component={Formik.Form} sx={{ overflowY: "auto" }}>
            <Pages.P2P.Dialogs.Review.Views.Content />
          </Mui.Stack>
        )}
      </Formik.Formik>
    </Components.Global.Dialog>
  );
};

export declare namespace review {
  export interface Form {
    comment: string;
    rating: number;
  }
}
