import * as Formik from "formik";
import * as Mui from "@mui/material";

export const CheckBox = (props: checkBox.Type) => (
  <Formik.Field component={MuiCheckBox} {...props} />
);

export const MuiCheckBox = ({
  label,
  form: { touched, errors, ...form },
  field,
  ...props
}: Formik.FieldProps & Mui.TextFieldProps) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <Mui.Stack spacing={1}>
      <Mui.FormControlLabel
        control={<Mui.Checkbox {...field} {...form} />}
        label={label as string}
      />
      <Mui.FormHelperText
        error={error}
        sx={{ display: error ? "flex" : "none" }}
      >
        <>{errors[field.name]}</>
      </Mui.FormHelperText>
    </Mui.Stack>
  );
};

export declare namespace checkBox {
  export type Type = Partial<Mui.CheckboxProps> & { label: string };
}
