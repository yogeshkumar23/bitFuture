import * as Yup from "yup";

export const editShowPostTill = Yup.object().shape({
  showPostTill: Yup.date()
    .typeError("Invalid Date")
    .min(new Date(new Date().getTime() + 3600000), "Minimum after 1h required"),
});

export const commonOrder = Yup.object().shape({
  noOfCoins: Yup.number()
    .typeError("Must be number")
    .min(0, "Unsupported value")
    .notOneOf([0, undefined], "No Quantity provided"),
  pricePerCoin: Yup.number()
    .typeError("Must be number")
    .min(0, "Unsupported value")
    .notOneOf([0, undefined], "No pricePerCoin provided"),
  // priceLimitFrom: Yup.number()
  //   .typeError("Must be number")
  //   .min(0, "Unsupported value")
  //   .notOneOf([0, undefined], "No Price From Limit provided"),
  // priceLimitTo: Yup.number()
  //   .typeError("Must be number")
  //   .min(0, "Unsupported value")
  //   .notOneOf([0, undefined], "No Price To Limit provided"),
  prefferedPayment: Yup.string()
    .notOneOf(["-1"], "Please select preferred payment")
    .required("No Payment Type provided"),
});

export const editOrder = commonOrder.concat(editShowPostTill);

export const newOrder = Yup.object()
  .shape({
    orderType: Yup.string(),
    coin: Yup.string().notOneOf(["0"], "No Asset Type provided"),
    currency: Yup.string().notOneOf(["0"], "No Currency Type provided"),
    coinMarketPrice: Yup.number(),
    termsOfService: Yup.boolean().oneOf([true], "Accept Terms & Conditions"),
    showPostTill: Yup.date()
      .typeError(" Invalid Date")
      .min(
        new Date(new Date().getTime() + 3600000),
        "Minimum after 1h required"
      ),
  })
  .concat(commonOrder);

  export const reviewValidation = Yup.object().shape({
    comment: Yup.string().required("No Comment provided").trim(),
  });