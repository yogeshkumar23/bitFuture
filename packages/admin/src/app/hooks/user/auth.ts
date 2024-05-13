import * as Formik from "formik";
import React from "react";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Contexts from "src/app/contexts";
import * as Constants from "src/constants";
import * as Providers from "src/app/providers";

export const useAuth = () => {
  const navigate = Router.useNavigate();
  const { referal } = Router.useParams();
  const dataLocation = Router.useLocation().search;
  const token = new URLSearchParams(dataLocation).get("token");
  const handler = Providers.useCustomHandler;
  const user = React.useContext(Contexts.UserContext);

  const login = async (
    values: Auth.login,
    { setSubmitting, resetForm }: Formik.FormikHelpers<Auth.login>
  ) => {
    await Api.Server.Request("login", values)
      .then((res) => {
        res?.error
          ? [
              "Account Suspended",
              "Your account banned",
              "Your account suspended",
            ].includes(res?.message)
            ? navigate("blocked", { state: { message: res?.message } })
            : handler({
                message: res.message,
                variant: "error",
              })
          : Boolean(res.user)
          ? setTimeout(
              () => navigate(`${Constants.API_CONFIG.base}account/two-factor`),
              1000
            )
          : handler({
              message: "Only admin accounts allowed!",
              variant: "error",
            });
        if (!res?.error) {
          user?.update();
        }
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  const forgot = async (
    values: Auth.email,
    { setSubmitting, resetForm }: Formik.FormikHelpers<Auth.email>
  ) => {
    await Api.Server.Request("resetUserEmail", values)
      .then((res) => {
        res?.error
          ? handler({
              message: res.message,
              variant: "error",
            })
          : navigate("success");
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  const reset = async (
    values: Auth.reset,
    { setSubmitting, resetForm }: Formik.FormikHelpers<Auth.reset>
  ) => {
    await Api.Server.Request("changePassword", { ...values, token })
      .then((res) => {
        res?.error
          ? handler({
              message: res.message,
              variant: "error",
            })
          : navigate("success");
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  const sendMail = async () => await Api.Server.Request("twoStepVerification");

  const verify = async (otp: string) => {
    const VerifyOtp = await Api.Server.Request("verifyEmail", { otp });
    if (!VerifyOtp.error) {
      await Api.Server.Request("enableTwoStepVerification", { status: "true" });
      user?.update();
      navigate("success");
    } else
      handler({
        message: VerifyOtp.message,
        variant: "error",
      });
  };

  return { login, forgot, reset, sendMail, verify, referal };
};

export declare namespace Auth {
  export interface email {
    email: string;
  }
  export interface password {
    password: string;
  }

  export interface confirmPassword {
    confirmPassword: string;
  }

  export interface registerRemains {
    firstName: string;
    lastName: string;
    referalCode: string;
    termsOfService: boolean;
  }
  export type login = email & password;
  export type register = registerRemains & email & password;
  export type reset = password & confirmPassword;
}
