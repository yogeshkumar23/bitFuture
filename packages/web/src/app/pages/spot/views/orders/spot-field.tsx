import * as Mui from "@mui/material";
import React from "react";
import * as NumberFormat from "react-number-format";

export const SpotField = ({
  start,
  end,
  ...props
}: spotField.Props & Mui.TextFieldProps) => (
  <Mui.TextField
    variant="outlined"
    size="small"
    inputProps={{
      style: { textAlign: "right" },
    }}
    InputProps={{
      startAdornment: (
        <Mui.InputAdornment position="start">{start}</Mui.InputAdornment>
      ),
      endAdornment: (
        <Mui.InputAdornment position="end">
          <Mui.Typography variant="caption">{end}</Mui.Typography>
        </Mui.InputAdornment>
      ),
      inputComponent:
        NumberFormatCustom as unknown as React.ElementType<Mui.InputBaseComponentProps>,
    }}
    {...props}
  />
);

export const NumberFormatCustom = React.forwardRef<any, spotField.CustomProps>(
  function ({ onChange, ...other }, ref) {
    return (
      <NumberFormat.NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: other.name,
              value: values.value,
            },
          });
        }}
        // format="##########"
      />
    );
  }
);

export declare namespace spotField {
  export interface Props {
    start: string;
    end: string;
  }

  interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }
}
