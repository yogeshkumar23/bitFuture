import * as Mui from "@mui/material";

export const Footer = () => (
  <Mui.Typography
    textAlign="center"
    variant="body2"
    sx={{
      bgcolor: (theme) => `${theme.palette.primary.main}20`,
      p: 2,
      mt: 2,
    }}
  >
    © Copyright {new Date().getFullYear()} by DooWorld. All rights reserved.
  </Mui.Typography>
);
