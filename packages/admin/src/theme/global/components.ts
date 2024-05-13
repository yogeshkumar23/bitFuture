import * as Mui from "@mui/material";

export const Components = (): Pick<Mui.ThemeOptions, "components"> => ({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "initial",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            borderRadius: "20px",
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          background: "#ffffff",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          sx: {
            "& .MuiPaper-root": { bgcolor: "background.default" },
            maxHeight: 250,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
  },
});
