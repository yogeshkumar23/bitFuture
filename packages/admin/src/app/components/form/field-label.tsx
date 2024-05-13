import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";

export const FieldLabel = ({
  children,
  label,
  error,
}: Child & { label: React.ReactNode; error: boolean }) => {
  const { pathname } = Router.useLocation();
  return (
    <Mui.Stack spacing={1} sx={{ width: "100%" }}>
      <Mui.FormLabel
        error={error}
        sx={{ color: pathname.includes("kyc") ? "text.primary" : undefined }}
      >
        {label}
      </Mui.FormLabel>
      {children}
    </Mui.Stack>
  );
};
