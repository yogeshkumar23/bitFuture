// import * as FirebaseFirestore from "firebase/firestore";
import * as Formik from "formik";
import React from "react";
import * as ReactQuery from "react-query";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";
import * as Validations from "src/app/validations";

export const useUserUpdate = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { user, update: userUpdate } = React.useContext(Contexts.UserContext);
  const fileConvertor = Hooks.Utils.useDataURLFile;
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const queryClient = ReactQuery.useQueryClient();

  // const { add, query } = Hooks.Firebase.useFirestore(true);
  const { loading, userKYC } = Hooks.User.useUserKYC(false);

  React.useEffect(
    () =>
      setActiveStep(
        userKYC?.userKyc?.addressProofPhoto &&
          !Boolean(userKYC?.userKyc?.reason)
          ? 3
          : 0
      ),
    [loading]
  );

  const validation = React.useMemo(
    () =>
      ({
        0: Validations.validateKYC1,
        1: Validations.validateKYC1.concat(Validations.validateKYC2),
        2: Validations.validateKYC1
          .concat(Validations.validateKYC2)
          .concat(Validations.validateKYC3),
      }[activeStep]),
    [activeStep]
  );

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
      signature: user?.signature,
      metaMaskWallet: user?.metaMaskWallet,
    };

    var bodyData = new FormData();
    Object.entries(fileValues).map(([key, value]) =>
      bodyData.append(key, value as string | Blob)
    );
    await Api.Server.Request("editProfile", bodyData)
      .then((res) => {
        userUpdate();
        navigate(`${Constants.API_CONFIG.base}profile`);
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
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
          await Api.Server.Request("editProfile", bodyData)
            .then((_) => {
              userUpdate();
              navigate(`${Constants.API_CONFIG.base}profile`);
            })
            .finally(() => {
              setSubmitting(false);
              resetForm();
            });
        }
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  const submitKyc = async (
    values: Hooks.User.UseUserKYC.User,
    { setSubmitting }: Formik.FormikHelpers<Hooks.User.UseUserKYC.User>
  ) => {
    if (activeStep === 3) {
      const fileValues = {
        ...values,
        documentPhotoFront: fileConvertor(
          values.documentPhotoFront,
          `${values.documentType}_front`
        ),
        documentPhotoBack: fileConvertor(
          values.documentPhotoBack,
          `${values.documentType}_back`
        ),
        userPicture: "",
        addressProofPhoto: fileConvertor(
          values.addressProofPhoto,
          `${values.addressDocumentType}_address`
        ),
        isResubmitted: 0,
        reason: "",
        type: values?.reason ? "" : "NEW",
      };
      var bodyData = new FormData();
      Object.entries(fileValues).map(([key, value]) =>
        bodyData.append(key, value as string | Blob)
      );
      await Api.Server.Request("updateKYC", bodyData).then((res) => {
        res?.error &&
          handler({
            message: res.message,
            variant: "error",
          });
      });
      queryClient.invalidateQueries("userKYC");
    }
    setActiveStep((prev) => (prev > 3 ? prev : prev + 1));
    setSubmitting(false);
  };

  return {
    activeStep,
    loading,
    userKYC,
    validation,
    update,
    changePassword,
    submitKyc,
  };
};

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
