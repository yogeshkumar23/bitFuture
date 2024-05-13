import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Constants from "src/constants";

export const Working = () => (
  <Components.Global.Container direction="column">
    <Mui.Typography variant="h5">How Does it Work?</Mui.Typography>
    <Mui.Typography variant="subtitle2" sx={{ mt: 1 }}>
      All you have to do is develop campaigns, distribute them, and you'll be
      able to profit from our lucrative trading platform in no time. Discover
      how to:
    </Mui.Typography>
    <Mui.Box sx={{ p: 4, mt: 1 }}>
      <Mui.Stepper orientation="vertical">
        {Constants.Works.map((label, index) => (
          <Mui.Step key={index} active={true}>
            <Mui.StepLabel>
              <Mui.Typography color="primary" variant="h5">
                {label.label}
              </Mui.Typography>
            </Mui.StepLabel>
            <Mui.StepContent key={index}>
              <Mui.Typography variant="subtitle2">
                {label.description}
              </Mui.Typography>
            </Mui.StepContent>
          </Mui.Step>
        ))}
      </Mui.Stepper>
    </Mui.Box>
  </Components.Global.Container>
);
