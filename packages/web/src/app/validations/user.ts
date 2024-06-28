import * as Yup from "yup";
import * as Api from "src/api";

export const changePasswordValidate = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .nullable()
    .notOneOf(
      [Yup.ref("currentPassword"), null],
      "Don't match to Current password"
    )
    .required("Password is required")
    .min(8, "Password too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};'`:"\\|,.<>\/?])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref("newPassword"), null], "Password doesn't match")
    .required("Confirm password is required"),
});

export const validateKYC1 = Yup.object().shape({
  email: Yup.string().required("No email provided").email(),
  primaryPhoneNumber: Yup.string()
    .min(10, "PhoneNumber too short")
    .max(19, "PhoneNumber too large")
    .required("No Contact provided")
    .nullable(),
  secondaryPhoneNumber: Yup.string()
    .min(10, "PhoneNumber too short")
    .max(19, "PhoneNumber too large")
    .required("No Secondary Contact provided")
    .nullable(),
});

export const validateKYC2 = Yup.object().shape({
  documentType: Yup.string().notOneOf(["0"], "No Document Type provided"),
  documentNumber: Yup.string()
    .typeError("No Document number provided")
    .matches(/^[a-zA-Z0-9]+$/, "Please enter the valid document number")
    .required("No Document number provided")
    .when(
      "documentType",
      (documentType: string, field: Yup.StringSchema<string | undefined>) =>
        (documentType === "Passport"
          ? field.matches(
              /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
              "Please enter valid Passport number"
            )
          : field
          // .matches(
          //     /^[A-Z](?:\d[- ]*){14}$/,
          //     "Please enter valid Driving licence number"
          //   )
        ).test(
          "checkDocumentNumberunique",
          `${documentType} number already in use`,
          (documentNumber) =>
            new Promise((resolve) => {
              if (documentNumber) {
                Api.Server.Request("checkKyc", {
                  documentType,
                  documentNumber,
                }).then((res) => resolve(!res.error));
              } else resolve(true);
            })
        )
    ),
  documentPhotoFront: Yup.string()
    .typeError("No Document Front Image provided")
    .required("No Document Front Image provided"),
  documentPhotoBack: Yup.string()
    .typeError("No Document Back Image provided")
    .required("No Document Back Image provided"),
  // userPicture: Yup.string()
  //   .typeError("No Selfie with Document provided")
  //   .required("No Selfie with Document provided"),
});

export const validateKYC3 = Yup.object().shape({
  addressDocumentType: Yup.string().notOneOf(
    ["0"],
    "No Residetial Document Type provided"
  ),
  addressProofPhoto: Yup.string()
    .typeError("No Address Proof Image provided")
    .required("No Address Proof Image provided"),
});

export const createTicket = Yup.object().shape({
  subject: Yup.string()
    .typeError("No Subject provided")
    .required("No Subject provided")
    .trim(),
  message: Yup.string()
    .typeError("No Message provided")
    .required("No Message provided")
    .max(250, "Maximum 250 Characters allowed")
    .trim(),
});
