import * as Mui from "@mui/material";
import * as Formik from "formik";

export const OrderType = ({ name }: { name: string }) => {
  const { errors, values, touched, setFieldValue, setFieldTouched } =
    Formik.useFormikContext<{ [key: string]: string }>();
  return (
    <Mui.Stack spacing={1} onClick={() => setFieldTouched(name, true)}>
      <Mui.Typography color="text.secondary">I want to</Mui.Typography>
      <Mui.Stack direction="row" spacing={2}>
        <Mui.Button
          onClick={() => setFieldValue(name, "buy")}
          variant="outlined"
          color={values[name] === "buy" ? "primary" : "secondary"}
        >
          Buy
        </Mui.Button>
        <Mui.Button
          onClick={() => setFieldValue(name, "sell")}
          variant="outlined"
          color={values[name] === "sell" ? "primary" : "secondary"}
        >
          Sell
        </Mui.Button>
      </Mui.Stack>
      {touched[name] && errors[name] && (
        <Mui.FormHelperText sx={{ color: "error.main" }}>
          {errors[name]}
        </Mui.FormHelperText>
      )}
    </Mui.Stack>
  );
};
