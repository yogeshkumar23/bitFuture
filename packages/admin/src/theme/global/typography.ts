import * as Mui from "@mui/material";

export const Typography = (): Pick<Mui.ThemeOptions, "typography"> => ({
  typography: {
    // fontFamily: "Inter",
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    // fontFamily: "Bloc Office Hub, Fifth Floor, Santa Maria Business District, Panama CIty 801, Panama",
    fontSize: 16

  },
});
