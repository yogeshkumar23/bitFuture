import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";

export const ResidentialAddress = ({ disabled }: { disabled?: boolean }) => {

  const {t} = useTranslation();

  return (
    <Components.Global.Container
    id="addressDetail"
    sx={{
      maxWidth: { xs: "100%", md: 350 },
      minWidth: "100%",
      minHeight: "100%",
    }}
    customTitle={
      <Mui.Typography variant="h6" color="primary.main" fontWeight="bold">
        {t('residentailAddress')}
      </Mui.Typography>
    }
  >
    <Mui.Grid container spacing={3} sx={{ pt: 2 }}>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.SelectField
          size="small"
          name="addressDocumentType"
          label={`${t('typeOfDocument')}`}
          defaultValue={0}
          disabled={disabled}
        >
          <Mui.MenuItem disabled value={0}>
            <Mui.Typography variant="body1" color="text.secondary">
              Choose document type
            </Mui.Typography>
          </Mui.MenuItem>
          {[
            "Bank Statement",
            "Credit Card Statement",
            "Utility Bill",
            "Municipality Registration",
          ]?.map((item, index) => (
            <Mui.MenuItem value={item} key={index}>
              {item}
            </Mui.MenuItem>
          ))}
        </Components.Form.SelectField>
      </Mui.Grid>
      <Mui.Grid item xs={12} md={6}></Mui.Grid>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.ImageField
          name="addressProofPhoto"
          sx={{
            height: 200,
            width: "inherit",
          }}
          label={`${t('uploadDocument')}`}
          disabled={disabled}
        />
      </Mui.Grid>
    </Mui.Grid>
  </Components.Global.Container>
  )
}