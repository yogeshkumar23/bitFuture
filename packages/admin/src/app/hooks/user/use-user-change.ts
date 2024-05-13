import * as Formik from "formik";
import React from "react";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const useUserUpdate = () => {
  const user = React.useContext(Contexts.UserContext);
  const fileConvertor = Hooks.Utils.useDataURLFile;
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const { state } = Router.useLocation() as {
    state: { removeProfile: string };
  };

  const update = async (
    values: Partial<Hooks.User.UseUser.User>,
    {
      setSubmitting,
      resetForm,
    }: Formik.FormikHelpers<Partial<Hooks.User.UseUser.User>>
  ) => {
    const fileValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      password: "",
      profileImage: values?.profileImage?.includes("base64")
        ? fileConvertor(
            values.profileImage as string,
            `${values.firstName}_${values.lastName}_profile`
          )
        : "",
      removeProfileImage: !Boolean(values?.profileImage),
    };

    var bodyData = new FormData();
    Object.entries(fileValues).map(([key, value]) =>
      bodyData.append(key, value as string | Blob)
    );
    await Api.Server.Request("editProfile", bodyData)
      .then((res) => {
        user?.update();
        navigate(`${Constants.API_CONFIG.base}profile`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const changePassword = async (
    values: ChangePassword,
    { setSubmitting, resetForm }: Formik.FormikHelpers<ChangePassword>
  ) => {
    await Api.Server.Request("checkPassword", {
      password: values.currentPassword,
    })
      .then(async (res) => {
        if (res.error) handler({ message: res.message, variant: "error" });
        else {
          const userData = {
            ...user,
            password: values.newPassword,
            profileImage: "",
            removeProfileImage: false,
          };
          var bodyData = new FormData();
          Object.entries(userData).map(([key, value]) =>
            bodyData.append(key, value as string | Blob)
          );
          await Api.Server.Request("editProfile", bodyData).then((_) => {
            user?.update();
            navigate(`${Constants.API_CONFIG.base}profile`);
          });
        }
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  return {
    update,
    changePassword,
  };
};

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
