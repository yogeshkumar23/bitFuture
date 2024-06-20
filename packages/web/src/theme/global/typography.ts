import * as Mui from "@mui/material";

export const Typography = (): Pick<Mui.ThemeOptions, "typography"> => ({
  typography: {
    // fontFamily: "Inter",
    // fontFamily: "Bloc Office Hub, Fifth Floor, Santa Maria Business District, Panama CIty 801, Panama",
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 14
  },
});
