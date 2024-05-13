import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Formik from "formik";
import * as React from "react";
import * as Components from "src/app/components";

export const RatingButton = ({
  name,
  label,
}: {
  name: string;
  label?: React.ReactNode;
}) => {
  const { values, touched, errors, setFieldValue } = Formik.useFormikContext<{
    [key: string]: number;
  }>();
  const error = Boolean(errors[name] && touched[name]);
  const handleClick = React.useCallback(
    (index: number) => setFieldValue(name, index),
    [name]
  );
  return (
    <Components.Form.FieldLabel label={label} error={error}>
      <Mui.Stack direction="row" spacing={0}>
        {new Array(5).fill(undefined).map((_val, index) => (
          <Mui.IconButton
            size="small"
            key={index}
            color={values[name] > index ? "primary" : undefined}
            onClick={() => handleClick(index + 1)}
          >
            {values[name] > index ? <MuiIcons.Star /> : <MuiIcons.StarBorder />}
          </Mui.IconButton>
        ))}
      </Mui.Stack>
    </Components.Form.FieldLabel>
  );
};
