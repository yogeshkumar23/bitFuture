import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";


export const Content = (props: any) => {

  const {t} = useTranslation();

  return (

    <Mui.CardContent
    component={Mui.Stack}
    spacing={3}
    sx={{ height: "90vh", justifyContent: "center", mx: { sm: 6 } }}
  >
    <Mui.Typography variant="h5" fontWeight={900}>
      {t('login')}
    </Mui.Typography>
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
    <Mui.Link
      color="text.secondary"
      component={Router.Link}
      state={{userEmail: props.userData}}
      to={`${Constants.API_CONFIG.base}account/forgot-password`}
    >
      {t('forgotPassword')}
    </Mui.Link>
    <Components.Form.SubmitButton size="large" sx={{ fontWeight: "bold" }}>
    {t('login')}
    </Components.Form.SubmitButton>
    <Mui.Typography textAlign="center">
      {t('dontHaveAnAccount')}{" "}
      <Mui.Link
        component={Router.Link}
        fontWeight="bold"
        to={`${Constants.API_CONFIG.base}account/register`}
      >
        {t('register')}
      </Mui.Link>
    </Mui.Typography>
  </Mui.CardContent>
  )
 
};
