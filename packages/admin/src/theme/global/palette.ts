import * as Mui from "@mui/material";

export const PaletteLight = (): Pick<Mui.ThemeOptions, "palette"> => ({
  palette: {
    mode: "light",
    primary: {
      main: "#e64388",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#333333",
    },
  },
});

export const PaletteDark = (): Pick<Mui.ThemeOptions, "palette"> => ({
  palette: {
    mode: "dark",
    primary: {
      main: "#e64388",
      contrastText: "#000",
    },
    secondary: {
      main: "#ffffff",
    },
    grey: { 100: "transparent" },
    background: {
      paper: "#ffffff10",
    },
  },
});
