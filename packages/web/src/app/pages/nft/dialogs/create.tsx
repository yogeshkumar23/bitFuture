import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Yup from "yup";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const Create = () => {
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const fileConvertor = Hooks.Utils.useDataURLFile;
  const { gasFee } = React.useContext(Contexts.UserContext);

  const validateCreateNFT = Yup.object().shape({
    image: Yup.string().required("No Image provided"),
    name: Yup.string().required("No Name provided"),
    description: Yup.string().required("No Description provided"),
    price: Yup.number()
      .typeError("Invalid price")
      .min(+gasFee, "Price should be greater than gasFee"),
  });

  const Submit = async (
    { image, price, ...metadata }: createNFT.Form,
    { setSubmitting }: Formik.FormikHelpers<createNFT.Form>
  ) => {
    // await newNFT(
    //   fileConvertor(image, `${metadata.name}_${new Date().getTime()}`),
    //   price,
    //   metadata
    // )
    //   .then(() => {
    //     handler({ message: "NFT Minted successfully!", variant: "success" });
    //     navigate(-1);
    //   })
    //   .catch((e) => {
    //     handler({ message: e.message, variant: "error" });
    //   })
    //   .finally(() => setSubmitting(false));
  };

  return (
    <Components.Global.Dialog icon maxWidth="xs">
      <Mui.DialogTitle>
        <Mui.Typography variant="h6" color="primary">
          Create New NFT
        </Mui.Typography>
      </Mui.DialogTitle>
      <Mui.DialogContent>
        <Formik.Formik
          initialValues={{
            image: "",
            name: "",
            price: "",
            description: "",
          }}
          validationSchema={validateCreateNFT}
          onSubmit={Submit}
        >
          {() => (
            <Mui.Stack
              spacing={1}
              justifyContent="center"
              component={Formik.Form}
            >
              <Components.Form.ImageField
                name="image"
                sx={{
                  height: 250,
                  width: "100%",
                  borderRadius: 4,
                }}
              />
              <Components.Form.FormField
                label="Name"
                name="name"
                placeholder="Your NFT name"
              />
              <Components.Form.FormField
                label="Description"
                name="description"
                placeholder="Something about your NFT"
              />
              <Components.Form.FormField
                label="Initial Price"
                name="price"
                placeholder={parseFloat(gasFee).toFixed(5)}
                InputProps={{
                  endAdornment: (
                    <Mui.InputAdornment position="end">
                      <Mui.Typography
                        variant="caption"
                        color="primary"
                        fontWeight="bold"
                      >
                        ETH
                      </Mui.Typography>
                    </Mui.InputAdornment>
                  ),
                }}
              />
              <Mui.Alert severity="warning" icon={false} sx={{ width: "100%" }}>
                <Mui.Typography variant="body2">
                  Note: Estimated Gas fee{" "}
                  {
                    <Components.Global.Format
                      number={gasFee}
                      type="coin"
                      coin="ETH"
                    />
                  }{" "}
                  will be applicable
                </Mui.Typography>
              </Mui.Alert>
              <Components.Form.SubmitButton
                variant="outlined"
                sx={{
                  height: "fit-content",
                  mt: "20px !important",
                  width: "fit-content",
                  alignSelf: "center",
                }}
              >
                Mint
              </Components.Form.SubmitButton>
            </Mui.Stack>
          )}
        </Formik.Formik>
      </Mui.DialogContent>
    </Components.Global.Dialog>
  );
};

export declare namespace createNFT {
  export interface Form {
    image: string;
    name: string;
    price: string;
    description: string;
  }
}
