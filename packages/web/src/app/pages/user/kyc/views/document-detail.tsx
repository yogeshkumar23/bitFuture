import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";

export const DocumentDetail = ({ disabled }: { disabled?: boolean }) => {

  const {t} = useTranslation();

  return (
    <Components.Global.Container
    id="documentDetail"
    sx={{
      maxWidth: { xs: "100%", md: 350 },
      minWidth: "100%",
      minHeight: "100%",
    }}
    customTitle={
      <Mui.Typography variant="h6" color="primary.main" fontWeight="bold">
       {t('documentDetails')}
      </Mui.Typography>
    }
  >
    <Mui.Grid container spacing={3} sx={{ pt: 2 }}>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.SelectField
          size="small"
          name="documentType"
          label={`${t("typeOfDocument")}`}
          defaultValue={0}
          disabled={disabled}
        >
          <Mui.MenuItem disabled value={0}>
            <Mui.Typography variant="body1" color="text.secondary">
              Choose document type
            </Mui.Typography>
          </Mui.MenuItem>
          {["Passport", "Driving License"]?.map((item, index) => (
            <Mui.MenuItem value={item} key={index}>
              {item}
            </Mui.MenuItem>
          ))}
        </Components.Form.SelectField>
      </Mui.Grid>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.NumberField
          size="small"
          name="documentNumber"
          label={`${t("selectDocumentNumber")}`}
          placeholder="XXXX XXXX XXXX XXXX"
          disabled={disabled}
          inputProps={{maxLength: 16}}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.ImageField
          name="documentPhotoFront"
          sx={{
            height: 200,
            width: "inherit",
          }}
          label={`${t("uploadDocumentFront")}`}
          disabled={disabled}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.ImageField
          name="documentPhotoBack"
          sx={{
            height: 200,
            width: "inherit",
          }}
          label={`${t("uploadDocumentBack")}`}
          disabled={disabled}
        />
      </Mui.Grid>
      {/* <Mui.Grid item xs={12} md={6}>
        <Components.Form.ImageField
          name="userPicture"
          sx={{
            height: 200,
            width: "inherit",
          }}
          label="Selfie with selected ID"
          disabled={disabled}
        />
      </Mui.Grid> */}
      <Mui.Grid item xs={12}>
        <Mui.Alert severity="warning" icon={false}>
          <Mui.AlertTitle>{t("notes")}:</Mui.AlertTitle>
          {t('uploadTheSelectDocument')}
        </Mui.Alert>
      </Mui.Grid>
    </Mui.Grid>
  </Components.Global.Container>
  )
}
