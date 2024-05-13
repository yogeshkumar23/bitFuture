import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Components from "src/app/components";

export const SelectField = (props: Mui.SelectProps) => (
  <Formik.Field component={MuiSelectField} {...props} />
);

export const MuiSelectField = ({
  label,
  form: { handleChange, handleBlur, isSubmitting, touched, errors, values },
  field,
  onChange,
  ...props
}: Formik.FieldProps & Mui.SelectProps) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.Select
        size="small"
        fullWidth
        error={error}
        disabled={isSubmitting}
        {...field}
        {...props}
        onBlur={handleBlur}
        onChange={onChange || handleChange}
        value={values[field.name]}
      />
      {error && (
        <Mui.FormHelperText error={error}>
          <>{errors[field.name]}</>
        </Mui.FormHelperText>
      )}
    </Components.Form.FieldLabel>
  );
};
