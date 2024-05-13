import * as Mui from "@mui/material";

export const UnderDevelopment = ({ sx }: Pick<Mui.TypographyProps, "sx">) => (
  <Mui.Typography
    variant="h5"
    color="text.secondary"
    textAlign="center"
    sx={{ my: "22.5vh", ...sx }}
  >
    Page under development...
  </Mui.Typography>
);
