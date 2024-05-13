import * as Mui from "@mui/material";
import * as Components from "src/app/components";

export const DocumentDetail = ({ disabled }: { disabled?: boolean }) => (
  <Components.Global.Container
    sx={{
      maxWidth: { xs: "100%", md: 350 },
      minWidth: "100%",
      minHeight: "100%",
      background: "transparent",
    }}
    customTitle={
      <Mui.Typography variant="h6" color="primary.main">
        Document Details
      </Mui.Typography>
    }
  >
    <Mui.Grid container spacing={3} sx={{ pt: 2 }}>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.SelectField
          size="small"
          name="documentType"
          label="Type of document"
          defaultValue={0}
          disabled={disabled}
        >
          <Mui.MenuItem disabled value={0}>
            <Mui.Typography variant="body1" color="text.secondary">
              Choose document type
            </Mui.Typography>
          </Mui.MenuItem>
          {[
            "Aadhar",
            "Passport",
            "Driving License",
            "Government issued ID",
          ]?.map((item, index) => (
            <Mui.MenuItem value={item} key={index}>
              {item}
            </Mui.MenuItem>
          ))}
        </Components.Form.SelectField>
      </Mui.Grid>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.FormField
          size="small"
          type="text"
          name="documentNumber"
          label="Selected document number"
          placeholder="XXXX XXXX XXXX XXXX"
          disabled={disabled}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} md={6}>
        <Components.Form.ImageField
          name="documentPhotoFront"
          sx={{
            height: 200,
            width: "inherit",
          }}
          label="Upload document (FRONT)"
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
          label="Upload document (BACK)"
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
    </Mui.Grid>
  </Components.Global.Container>
);
