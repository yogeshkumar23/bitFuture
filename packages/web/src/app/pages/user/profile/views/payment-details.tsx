import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Validations from "src/app/validations";

export const PaymentDetails = ({
  variant,
  updatePayment,
  payment,
}: {
  variant: "view" | "edit";
  updatePayment: (type: string, values: object) => Promise<void>;
  payment: any;
}) => {
  const navigate = Router.useNavigate();
  const handleSave = async (
    { paymentType, ...paymentValues }: paymentDetails,
    { setSubmitting }: Formik.FormikHelpers<paymentDetails>
  ) => {
    let path = paymentType.toLowerCase().replaceAll(" ", "_");
    let docValues = Object.assign(
      {},
      ...Object.entries(paymentValues)
        .filter(([key]) => key.includes(path))
        .map(([key, value]) => ({ [key]: value }))
    );
    await updatePayment(path, docValues);
    navigate(`${Constants.API_CONFIG.base}profile`);
    setSubmitting(false);
  };

  return (
    <Components.Global.Container
      id="paymentDetails"
      direction="column"
      justifyContent="start"
      spacing={2}
      sx={{ height: 600 }}
    >
      <Mui.Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mb={2}
      >
        <Mui.Typography variant="h5">Payment Details</Mui.Typography>
        <Mui.Button
          id="editPaymentDetail"
          startIcon={<MuiIcons.EditOutlined />}
          component={Router.Link}
          variant="contained"
          to="payment-edit"
          sx={{ display: variant === "edit" ? "none" : "flex" }}
        >
          Edit
        </Mui.Button>
      </Mui.Stack>

      <Formik.Formik
        initialValues={{
          ...payment,
          paymentType: Object.entries(Constants.PaymentType)[0][0] || "",
          bank_transfer$account_no: payment["bank_transfer$account_no"] || "",
          bank_transfer$account_name:
            payment["bank_transfer$account_name"] || "",
          bank_transfer$bank_name: payment["bank_transfer$bank_name"] || "",
          bank_transfer$ifsc_code: payment["bank_transfer$ifsc_code"] || "",
          bank_transfer$sort_code: payment["bank_transfer$sort_code"] || "",
          bank_transfer$routing_number:
            payment["bank_transfer$routing_number"] || "",
          upi$upi_id: payment["upi$upi_id"] || "",
          interac$email: payment["interac$email"] || "",
          interac$mobile_no: payment["interac$mobile_no"] || "",
          zelle$email: payment["zelle$email"] || "",
          zelle$mobile_no: payment["zelle$mobile_no"] || "",
          "m-pesa$name": payment["m-pesa$name"] || "",
          "m-pesa$mobile_no": payment["m-pesa$mobile_no"] || "",
          mtn_mobile_money$name: payment["mtn_mobile_money$name"] || "",
          mtn_mobile_money$mobile_no:
            payment["mtn_mobile_money$mobile_no"] || "",
          cash_app$cash_tag_id: payment["cash_app$cash_tag_id"] || "",
        }}
        validationSchema={Validations.PaymentDetails}
        onSubmit={handleSave}
      >
        {({ isSubmitting, values }) => (
          <Mui.Grid
            container
            component={Formik.Form}
            spacing={2}
            sx={{ pr: 5, pb: 5 }}
          >
            <Mui.Grid item xs={12} md={6}>
              <Components.Form.SelectField
                size="small"
                name="paymentType"
                label="Payment Type"
                disabled={isSubmitting}
                sx={{
                  minWidth: { md: 200 },
                  "& .MuiListItemIcon-root": {
                    display: "none",
                  },
                }}
              >
                {Object.entries(Constants.PaymentType).map(
                  ([key, value], index) => (
                    <Mui.MenuItem value={key} key={index}>
                      <Mui.ListItemIcon>
                        <Mui.CardMedia
                          component="img"
                          src={value}
                          sx={{ height: 25, width: 25 }}
                        />
                      </Mui.ListItemIcon>
                      {key}
                    </Mui.MenuItem>
                  )
                )}
              </Components.Form.SelectField>
            </Mui.Grid>
            <Mui.Grid item xs={12} md={6}></Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "Bank Transfer" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`bank_transfer$account_no`}
                label={
                  <>
                    Account no <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "Bank Transfer" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`bank_transfer$account_name`}
                label={
                  <>
                    Account Name <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "Bank Transfer" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`bank_transfer$bank_name`}
                label={
                  <>
                    Bank Name <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "Bank Transfer" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`bank_transfer$bank_address`}
                label={
                  <>
                    Bank Address{" "}
                    <Mui.Typography variant="caption">
                      (Optional : based on Country/Region)
                    </Mui.Typography>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "Bank Transfer" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`bank_transfer$ifsc_code`}
                label={
                  <>
                    IFSC Code{" "}
                    <Mui.Typography variant="caption">
                      (Optional : based on Country/Region)
                    </Mui.Typography>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "Bank Transfer" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`bank_transfer$sort_code`}
                label={
                  <>
                    Sort Code{" "}
                    <Mui.Typography variant="caption">
                      (Optional : based on Country/Region)
                    </Mui.Typography>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "Bank Transfer" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`bank_transfer$routing_number`}
                label={
                  <>
                    Routing Number{" "}
                    <Mui.Typography variant="caption">
                      (Optional : based on Country/Region)
                    </Mui.Typography>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display: values["paymentType"] === "UPI" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`upi$upi_id`}
                label={
                  <>
                    UPI ID <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display: values["paymentType"] === "INTERAC" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`interac$email`}
                type="text"
                label={
                  <>
                    Email <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display: values["paymentType"] === "INTERAC" ? "block" : "none",
              }}
            >
              <Components.Form.PhoneField
                size="small"
                name={`interac$mobile_no`}
                type="text"
                label="Mobile No"
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display: values["paymentType"] === "ZELLE" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`zelle$email`}
                type="text"
                label={
                  <>
                    Email <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display: values["paymentType"] === "ZELLE" ? "block" : "none",
              }}
            >
              <Components.Form.PhoneField
                size="small"
                name={`zelle$mobile_no`}
                type="text"
                label="Mobile No"
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display: values["paymentType"] === "M-PESA" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`m-pesa$name`}
                type="text"
                label={
                  <>
                    Name <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display: values["paymentType"] === "M-PESA" ? "block" : "none",
              }}
            >
              <Components.Form.PhoneField
                size="small"
                name={`m-pesa$mobile_no`}
                type="text"
                label={
                  <>
                    Mobile No <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "MTN MOBILE MONEY"
                    ? "block"
                    : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`mtn_mobile_money$name`}
                type="text"
                label={
                  <>
                    Name <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "MTN MOBILE MONEY"
                    ? "block"
                    : "none",
              }}
            >
              <Components.Form.PhoneField
                size="small"
                name={`mtn_mobile_money$mobile_no`}
                type="text"
                label={
                  <>
                    Mobile No <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              md={6}
              sx={{
                display:
                  values["paymentType"] === "Cash App" ? "block" : "none",
              }}
            >
              <Components.Form.FormField
                size="small"
                name={`cash_app$cash_tag_id`}
                label={
                  <>
                    Cash Tag ID <span style={{ color: "red" }}>*</span>
                  </>
                }
                disabled={variant === "view" || isSubmitting}
              />
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  width: "100%",
                  display: variant === "view" ? "none" : "flex",
                }}
              >
                <Components.Form.SubmitButton sx={{ maxWidth: 150 }}>
                  Save Changes
                </Components.Form.SubmitButton>
                <Mui.Button
                  sx={{ width: 150 }}
                  variant="outlined"
                  component={Router.Link}
                  to=".."
                >
                  Discard
                </Mui.Button>
              </Mui.Stack>
            </Mui.Grid>
          </Mui.Grid>
        )}
      </Formik.Formik>
    </Components.Global.Container>
  );
};
