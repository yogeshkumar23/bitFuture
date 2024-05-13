import * as Mui from "@mui/material";

export const PaletteLight = (): Pick<Mui.ThemeOptions, "palette"> => ({
  palette: {
    mode: "light",
    primary: {
      // main: "#E1B049",
      main: "#e64388",
      contrastText: "#fff",
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
      // main: "#E1B049",
      main: "#e64388",
      contrastText: "#ffffff",
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
