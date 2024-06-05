import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as NumberFormat from "react-number-format";
import React from "react";
import * as Components from "src/app/components";

export const NumberField = (props: Mui.TextFieldProps) => (
  <Formik.Field component={MuiNumberField} {...props} />
);

export const MuiNumberField = ({
  label,
  form: { handleChange, handleBlur, isSubmitting, touched, errors, values },
  field,
  // InputProps,
  onChange,
  disabled,
  ...props
}: Formik.FieldProps & Mui.TextFieldProps) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.TextField
        size="small"
        fullWidth
        error={error}
        //@ts-ignore
        helperText={error && errors[field.name]}
        disabled={isSubmitting || disabled}
        {...field}
        {...props}
        id={field.name}
        onChange={onChange || handleChange}
        onBlur={handleBlur}
        value={values[field.name]}
        // inputProps={{
        //   style: { textAlign: "left" },
        //   maxLength: "30"
        // }}
        InputProps={{
          inputComponent:
            NumberFormatCustom as React.ElementType<Mui.InputBaseComponentProps>,
        //   ...InputProps,
        }}
      />
    </Components.Form.FieldLabel>
  );
};

export const NumberFormatCustom = ({ inputRef, onChange, ...other }: any) => (
  <NumberFormat.NumericFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={(values: any) => {
      onChange({
        target: {
          name: other.name,
          value: values.value,
        },
      });
    }}
    // thousandSeparator
    // thousandsGroupStyle="lakh"
    allowNegative={false}
    // isNumericString
  />
);
