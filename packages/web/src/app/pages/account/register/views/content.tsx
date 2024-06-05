import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";


export const Content = () => {

  const {t, i18n} = useTranslation();
  console.log(i18n, 'i18next')

  return (
    <Mui.CardContent
    component={Mui.Stack}
    spacing={3}
    sx={{
      minHeight: 700,
      justifyContent: "center",
      mx: { sm: 6 },
    }}
  >
    <Mui.Typography variant="h5" fontWeight={900}>
      {t('createNewAccount')}
    </Mui.Typography>
    <Mui.Stack direction="row" spacing={2}>
      <Components.Form.FormField
        label={`${t('firstName')}`}
        name="firstName"
        type="text"
        size="medium"
      />
      <Components.Form.FormField
        label={`${t('lastName')}`}
        name="lastName"
        type="text"
        size="medium"
      />
    </Mui.Stack>
    <Components.Form.FormField
      label={`${t('email')}`}
      name="email"
      type="text"
      size="medium"
    />
    <Components.Form.FormField
      label={`${t('password')}`}
      name="password"
      type="password"
      size="medium"
    />
    <Components.Form.FormField
      label={`${t('referalCode')}`}
      name="referalCode"
      type="text"
      size="medium"
    />
    <Components.Form.CheckBox
      size="medium"
      label={
        <Mui.Typography variant="inherit">
          {t('readAndAgree')}{" "}
          <Mui.Link component={Router.Link} to={`terms-of-service`}>
          {t('termsAndConditions')}
          </Mui.Link>
        </Mui.Typography>
      }
      name="termsOfService"
    />
    <Components.Form.SubmitButton size="large" sx={{ fontWeight: "bold" }}>
    {t('createAccount')}
    </Components.Form.SubmitButton>
    <Mui.Typography textAlign="center">
    {t('alreadyMember')}{" "}
      <Mui.Link
        component={Router.Link}
        fontWeight="bold"
        to={`${Constants.API_CONFIG.base}account/login`}
      >
        {i18n.language === "en" ? "Log In" : t('login')}
      </Mui.Link>
    </Mui.Typography>
  </Mui.CardContent>
  )
}