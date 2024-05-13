import * as Mui from "@mui/material";
import React from "react";

export const Container = ({
  children,
  sx,
  customTitle,
  ...props
}: Child &
  Mui.PaperProps &
  Mui.StackProps & { customTitle?: React.ReactNode }) => (
  <Mui.Paper
    component={Mui.Stack}
    direction={customTitle ? "column" : "row"}
    justifyContent="space-between"
    elevation={0}
    sx={{
      p: 2,
      px: { xs: 1, sm: 2 },
      borderRadius: 3,
      overflow: "hidden",
      width: "100%",
      ...sx,
    }}
    {...props}
  >
    {customTitle && (
      <>
        <Mui.Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {customTitle}
        </Mui.Stack>
        <Mui.Divider />
      </>
    )}
    {children}
  </Mui.Paper>
);
