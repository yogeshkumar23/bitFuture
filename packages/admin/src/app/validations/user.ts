import * as Yup from "yup";

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
