import * as Mui from "@mui/material";
import * as Components from "src/app/components";

export const Content = () => (
  <Mui.CardContent
    component={Mui.Stack}
    spacing={2}
    sx={{ height: "90vh", justifyContent: "center", mx: { sm: 6 } }}
  >
    <Mui.Typography variant="h5" fontWeight={900}>
      Create New Password
    </Mui.Typography>
    <Components.Form.FormField
      label="New password"
      name="password"
      type="password"
      size="medium"
    />
    <Components.Form.FormField
      label="Confirm new password"
      name="confirmPassword"
      type="password"
      size="medium"
    />
    <Components.Form.SubmitButton size="large" sx={{ fontWeight: "bold" }}>
      Create New Password
    </Components.Form.SubmitButton>
  </Mui.CardContent>
);
