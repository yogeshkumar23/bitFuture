import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";

export const ContactDetail = ({ disabled }: { disabled?: boolean }) => {

  const {t} = useTranslation();

  return (

    <Components.Global.Container
    id="contactDetail"
    sx={{
      maxWidth: { xs: "100%", md: 350 },
      minWidth: "100%",
      minHeight: "100%",
    }}
    customTitle={
      <Mui.Typography variant="h6" color="primary.main" fontWeight="bold">
        {t('contactDetails')}
      </Mui.Typography>
    }
  >
    <Mui.Grid container spacing={3} sx={{ pt: 2 }}>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.FormField
          size="small"
          name="email"
          type="text"
          placeholder="Joe@gmail.com"
          label={`${t('email')}`}
          disabled
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} md={6}></Mui.Grid>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.PhoneField
          size="small"
          name="primaryPhoneNumber"
          type="text"
          label={`${t('contactNumber')}`}
          disabled={disabled}
          inputProps={{maxLength: 10}}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.PhoneField
          size="small"
          name="secondaryPhoneNumber"
          type="text"
          label={`${t("secondaryPhoneNumber")}`}
          disabled={disabled}
          inputProps={{maxLength: 10}}
        />
      </Mui.Grid>
    </Mui.Grid>
  </Components.Global.Container>
  )
}
