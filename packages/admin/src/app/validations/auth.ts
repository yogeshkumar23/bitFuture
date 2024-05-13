import * as Yup from "yup";

export const email = Yup.object().shape({
  email: Yup.string().nullable().required("No email provided").email(),
});

export const password = Yup.object().shape({
  password: Yup.string()
    .nullable()
    .required("Password is required")
    .min(8, "Password too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};'`:"\\|,.<>\/?])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const resetPasword = Yup.object()
  .shape({
    confirmPassword: Yup.string()
      .nullable()
      .oneOf([Yup.ref("password"), null], "Password don't match")
      .required("Confirm password is required"),
  })
  .concat(password);

export const login = email.concat(password);

export const others = Yup.object().shape({
  referalCode: Yup.string(),
  termsOfService: Yup.boolean().oneOf([true], "Accept Terms & Conditions"),
});

export const phoneNumber = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(7, "PhoneNumber too short")
    .max(15, "PhoneNumber too large")
    .required("No phone no provided")
    .nullable(),
});

export const user = Yup.object().shape({
  firstName: Yup.string().nullable().required("No First Name provided"),
  lastName: Yup.string().nullable().required("No Last Name provided"),
});

export const profile = user.concat(phoneNumber).concat(email);

export const register = user.concat(others);

export const PaymentDetails = Yup.object().shape({
  accountNo: Yup.string().nullable().required("No Account No provided"),
  accountType: Yup.string().nullable().required("No Account Type provided"),
  bankName: Yup.string().nullable().required("No Bank Name provided"),
  branchName: Yup.string().nullable().required("No Branch Name provided"),
  ifscCode: Yup.string().nullable().required("No IFSC Code provided"),
  gpayUpiId: Yup.string().nullable().required("No Gpay UPI ID provided"),
  upiId: Yup.string().nullable().required("No UPI ID provided"),
  mobileNo: Yup.string()
    .length(10, "Invalid Phone Number")
    .required("No Mobile No provided")
    .nullable(),
});
