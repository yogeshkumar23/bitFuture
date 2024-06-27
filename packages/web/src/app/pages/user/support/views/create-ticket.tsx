import * as Mui from "@mui/material";
import * as Formik from "formik";
import React from "react";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Validations from "src/app/validations";
import { useTranslation } from "react-i18next";

export const CreateTicket = () => {
  const {t} = useTranslation();
  const { user } = React.useContext(Contexts.UserContext);
  const { ticket } = Hooks.Support.useTickets(user?.uid as string);
  const Submit = async (
    values: createTicket.Form,
    { setSubmitting, resetForm }: Formik.FormikHelpers<createTicket.Form>
  ) => {
    const newTicket: tickets = {
      ...values,
      createdTime: new Date().getTime(),
      status: "pending",
    };
    await ticket(newTicket);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Components.Global.Container
      id="createTicket"
      direction="column"
      justifyContent="start"
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Mui.Typography variant="h6" sx={{ fontWeight: 1000 }}>
        {t('createTicket')}
      </Mui.Typography>
      <Formik.Formik
        initialValues={{
          subject: "",
          message: "",
          metamask: false,
        }}
        validationSchema={Validations.createTicket}
        onSubmit={Submit}
      >
        {({ values }) => (
          <Formik.Form>
            <Mui.Grid container spacing={2}>
              <Mui.Grid item xs={12}>
                <Components.Form.FormField
                  type="text"
                  label={ `${t("subject")}`}
                  name="subject"
                  size="medium"
                />
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Components.Form.FormField
                  type="text"
                  label={ `${t("message")}`}
                  name="message"
                  size="medium"
                  multiline
                  rows={4}
                />
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                {/* <Components.Form.CheckBox
                  label={ `${t("metamaskAddressChange")}`}
                  name="metamask"
                /> */}
                <Mui.Alert
                  severity="warning"
                  sx={{ display: values["metamask"] ? "flex" : "none" }}
                >
                  Before updating the meta mask wallet address please verify
                  your current address tokens are not in contract
                </Mui.Alert>
              </Mui.Grid>
              <Mui.Grid item xs={6} sm={3}>
                <Components.Form.SubmitButton
                  size="large"
                  sx={{ height: "fit-content", width: "fit-content" }}
                >
                  {t('postTicket')}
                </Components.Form.SubmitButton>
              </Mui.Grid>
            </Mui.Grid>
          </Formik.Form>
        )}
      </Formik.Formik>
    </Components.Global.Container>
  );
};

export declare namespace createTicket {
  export interface Form {
    subject: string;
    message: string;
    metamask: boolean;
  }
}
