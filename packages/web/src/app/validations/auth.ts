import * as Api from "src/api";
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
  referalCode: Yup.string().test(
    "checkReferralCode",
    "Invalid Referral Code",
    (referalCode) =>
      new Promise((resolve) => {
        if (referalCode)
          Api.Server.Request("checkReferralCode", { referalCode }).then((res) =>
            resolve(!res.error)
          );
        else resolve(true);
      })
  ),
  termsOfService: Yup.boolean().oneOf([true], "Accept Terms & Conditions"),
});

export const phoneNumber = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, "PhoneNumber too short")
    .max(19, "PhoneNumber too large")
    .required("No phone No. provided")
    .nullable(),
});

export const user = Yup.object().shape({
  firstName: Yup.string().nullable().required("No First Name provided"),
  lastName: Yup.string().nullable().required("No Last Name provided"),
});

export const profile = user.concat(phoneNumber).concat(email);

export const register = user.concat(login).concat(others);

export const PaymentDetails = Yup.object().shape({
  paymentType: Yup.string(),
  bank_transfer$account_no: Yup.number()
    .typeError("Must contains number")
    .min(9, "Invalid Account Number")
    .when(
      "paymentType",
      (paymentType: string, field: Yup.NumberSchema<number | undefined>) =>
        paymentType === "Bank Transfer"
          ? field.required("No Account No provided")
          : field
    ),
  bank_transfer$account_name: Yup.string().when(
    "paymentType",
    (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
      paymentType === "Bank Transfer"
        ? field.required("No Account Name provided")
        : field
  ),
  bank_transfer$bank_name: Yup.string().when(
    "paymentType",
    (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
      paymentType === "Bank Transfer"
        ? field.required("No Bank Address provided")
        : field
  ),
  bank_transfer$ifsc_code: Yup.string().matches(
    /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/g,
    "Invalid IFSC code"
  ),
  bank_transfer$sort_code: Yup.string(),
  bank_transfer$routing_number: Yup.string(),
  upi$upi_id: Yup.string()
    .matches(
      /[a-zA-Z0-9\\.\\$]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/g,
      "Invalid UPI ID"
    )
    .when(
      "paymentType",
      (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
        paymentType === "UPI" ? field.required("No UPI ID provided") : field
    ),
  interac$email: Yup.string()
    .email("Invalid email")
    .when(
      "paymentType",
      (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
        paymentType === "INTERAC"
          ? field.when(
              "interac$mobile_no",
              (mobileNo: string, field: Yup.StringSchema<string | undefined>) =>
                !mobileNo ? field.required("No email provided") : field
            )
          : field
    ),
  interac$mobile_no: Yup.string()
    .min(10, "PhoneNumber too short")
    .max(19, "PhoneNumber too large"),
  // .when(
  //   "paymentType",
  //   (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
  //     paymentType === "INTERAC"
  //       ? field.when(
  //           "interac$email",
  //           (email: string, field: Yup.StringSchema<string | undefined>) =>
  //             !email ? field.required("No phone no. provided") : field
  //         )
  //       : field
  // ),
  zelle$email: Yup.string()
    .email("Invalid email")
    .when(
      "paymentType",
      (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
        paymentType === "ZELLE"
          ? field.when(
              "zelle$mobile_no",
              (mobileNo: string, field: Yup.StringSchema<string | undefined>) =>
                !mobileNo ? field.required("No email provided.") : field
            )
          : field
    ),
  zelle$mobile_no: Yup.string()
    .min(10, "PhoneNumber too short")
    .max(19, "PhoneNumber too large"),
  // .when(
  //   "paymentType",
  //   (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
  //     paymentType === "ZELLE"
  //       ? field.when(
  //           "zelle$email",
  //           (email: string, field: Yup.StringSchema<string | undefined>) =>
  //             !email
  //               ? field.required(
  //                   "No phone no. provided. Please fill any one field"
  //                 )
  //               : field
  //         )
  //       : field
  // ),
  "m-pesa$name": Yup.string().when(
    "paymentType",
    (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
      paymentType === "M-PESA" ? field.required("No name provided") : field
  ),
  "m-pesa$mobile_no": Yup.string()
    .min(10, "PhoneNumber too short")
    .max(19, "PhoneNumber too large")
    .when(
      "paymentType",
      (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
        paymentType === "M-PESA"
          ? field.required("No phone no. provided")
          : field
    ),
  mtn_mobile_money$name: Yup.string().when(
    "paymentType",
    (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
      paymentType === "MTN MOBILE MONEY"
        ? field.required("No name provided")
        : field
  ),
  mtn_mobile_money$mobile_no: Yup.string()
    .min(10, "PhoneNumber too short")
    .max(19, "PhoneNumber too large")
    .when(
      "paymentType",
      (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
        paymentType === "MTN MOBILE MONEY"
          ? field.required("No phone no. provided")
          : field
    ),
  cash_app$cash_tag_id: Yup.string()
    .matches(/^\$[a-zA-Z0-9_]{1,20}$/g, "Invalid cash tag ID")
    .when(
      "paymentType",
      (paymentType: string, field: Yup.StringSchema<string | undefined>) =>
        paymentType === "Cash App"
          ? field.required("No cash tag id provided")
          : field
    ),
});
