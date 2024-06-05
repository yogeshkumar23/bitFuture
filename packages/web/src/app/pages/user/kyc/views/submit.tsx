import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";

// const steps = ["Contact Details", "Document Details", "Residential Address"];

export const SubmitCard = ({
  activeStep,
  idVerify,
  addressVerify,
  submitted,
}: {
  activeStep: number;
  idVerify?: number;
  addressVerify?: number;
  submitted?: boolean;
}) => {

  const {t} = useTranslation();

const steps = [`${t("contactDetails")}`, `${t("documentDetails")}`, `${t("residentialAddress")}`];
  
   
  return (
    <Components.Global.Container
    id="kycSubmit"
    justifyContent="center"
    sx={{
      height: "fit-content",
      position: "sticky",
      top: 70,
    }}
  >
    <Mui.Stack alignItems="center" spacing={3}>
      <Mui.Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => {
          return (
            <Mui.Step
              key={index}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "success.main", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "success.main", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "info.main", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "common.white", // circle's number (ACTIVE)
                },
              }}
            >
              <Mui.StepLabel>
                <Mui.Typography variant="h6">{label}</Mui.Typography>
              </Mui.StepLabel>
            </Mui.Step>
          );
        })}
      </Mui.Stepper>
      {Boolean(idVerify && addressVerify) ? (
        <Mui.Button
          color="success"
          variant="contained"
          fullWidth
          disableRipple
          disableElevation
        >
         {t("verified")}
        </Mui.Button>
      ) : (
        <Components.Form.SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ bgcolor: "primary.main" }}
          disabled={submitted}
        >
          {submitted
            ? `${t("detailsSubmittedNotVerified")}`
            : activeStep === steps.length
            ? "Submit For Verification"
            : "Next"}
        </Components.Form.SubmitButton>
      )}
    </Mui.Stack>
  </Components.Global.Container>
  )
}
