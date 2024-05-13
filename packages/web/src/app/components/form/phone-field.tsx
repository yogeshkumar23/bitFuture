import * as Formik from "formik";
import * as NumberFormat from "react-number-format";
import * as Mui from "@mui/material";
import React from "react";
import * as Components from "src/app/components";

export const PhoneField = ({
  label,
  disabled,
  ...props
}: Mui.TextFieldProps) => {
  const { values, errors, touched, setFieldValue, isSubmitting } =
    Formik.useFormikContext<{ [key: string]: string }>();
  const [countryCode, setCountryCode] = React.useState<string>(
    COUNTRY_FLAG_CODE.find((dial_code) =>
      values[props.name as string]?.includes(dial_code)
    ) || "+91"
  );
  const name = props.name as string;
  const error = Boolean(errors[name] && touched[name]);

  const handleCountryCodeChange = (_: any, newValue: string) => {
    setCountryCode((prev) => {
      setFieldValue(
        name,
        `${newValue} ${values[name]?.replace(prev, "")?.trim()}`
      );
      return newValue;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFieldValue(name, `${countryCode} ${event.target.value}`);

  React.useEffect(() => {
    if (values[name]) {
      const currentCountry = COUNTRY_FLAG_CODE.find((dial_code) =>
        values[name]?.includes(dial_code)
      );
      if (currentCountry) setCountryCode(currentCountry);
    }
  }, []);

  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.Stack direction="row" spacing={1} alignItems="flex-end">
        <Mui.Autocomplete
          size="small"
          disableClearable
          disabled={isSubmitting || disabled}
          onChange={handleCountryCodeChange}
          value={COUNTRY_FLAG_CODE.find(
            (dial_code) => dial_code === countryCode
          )}
          autoHighlight
          options={COUNTRY_FLAG_CODE}
          renderInput={(params) => (
            <Mui.TextField
              {...params}
              sx={{ width: 100 + (countryCode.length || 1) * 4.5 }}
            />
          )}
          PaperComponent={(props) => (
            <Mui.Paper
              elevation={1}
              {...props}
              sx={{ bgcolor: "background.default" }}
            />
          )}
        />
        <Mui.TextField
          fullWidth
          placeholder="09876 54321"
          {...props}
          id={name}
          disabled={disabled || isSubmitting}
          error={error}
          InputProps={{
            inputComponent:
              PhoneNumberFormat as unknown as React.ElementType<Mui.InputBaseComponentProps>,
          }}
          value={values[props.name as string]?.replace(countryCode, "")}
          onChange={handleChange}
        />
      </Mui.Stack>
      <Mui.FormHelperText
        error={error}
        sx={{ visibility: error ? "visible" : "none" }}
      >
        {errors[name]}
      </Mui.FormHelperText>
    </Components.Form.FieldLabel>
  );
};

export const PhoneNumberFormat = React.forwardRef<any, CustomProps>(function (
  { onChange, ...other },
  ref
) {
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
});

export class PhoneFieldClass extends React.Component<Mui.TextFieldProps> {
  shouldComponentUpdate(nextProps: Mui.TextFieldProps) {
    if (nextProps.name === this.props.name) {
      return false;
    } else return true;
  }

  render() {
    return <PhoneField {...this.props} />;
  }
}

const COUNTRY_FLAG_CODE = [
  "+1939",
  "+1876",
  "+1869",
  "+1868",
  "+1849",
  "+1784",
  "+1767",
  "+1758",
  "+1684",
  "+1671",
  "+1670",
  "+1664",
  "+1649",
  "+1473",
  "+1441",
  "+1340",
  "+1284",
  "+1268",
  "+1264",
  "+1246",
  "+1242",
  "+998",
  "+996",
  "+995",
  "+994",
  "+993",
  "+992",
  "+977",
  "+976",
  "+975",
  "+974",
  "+973",
  "+972",
  "+971",
  "+970",
  "+968",
  "+967",
  "+966",
  "+965",
  "+964",
  "+963",
  "+962",
  "+961",
  "+960",
  "+886",
  "+880",
  "+856",
  "+855",
  "+853",
  "+852",
  "+850",
  "+692",
  "+691",
  "+690",
  "+689",
  "+688",
  "+687",
  "+686",
  "+685",
  "+683",
  "+682",
  "+681",
  "+680",
  "+679",
  "+678",
  "+677",
  "+676",
  "+675",
  "+674",
  "+673",
  "+672",
  "+670",
  "+599",
  "+598",
  "+597",
  "+596",
  "+595",
  "+594",
  "+593",
  "+592",
  "+591",
  "+590",
  "+509",
  "+508",
  "+507",
  "+506",
  "+505",
  "+504",
  "+503",
  "+502",
  "+501",
  "+500",
  "+423",
  "+421",
  "+420",
  "+389",
  "+387",
  "+386",
  "+385",
  "+383",
  "+382",
  "+381",
  "+380",
  "+379",
  "+378",
  "+377",
  "+376",
  "+375",
  "+374",
  "+373",
  "+372",
  "+371",
  "+370",
  "+359",
  "+358",
  "+357",
  "+356",
  "+355",
  "+354",
  "+353",
  "+352",
  "+351",
  "+350",
  "+345",
  "+299",
  "+298",
  "+297",
  "+291",
  "+290",
  "+269",
  "+268",
  "+267",
  "+266",
  "+265",
  "+264",
  "+263",
  "+262",
  "+261",
  "+260",
  "+258",
  "+257",
  "+256",
  "+255",
  "+254",
  "+253",
  "+252",
  "+251",
  "+250",
  "+249",
  "+248",
  "+246",
  "+245",
  "+244",
  "+243",
  "+242",
  "+241",
  "+240",
  "+239",
  "+238",
  "+237",
  "+236",
  "+235",
  "+234",
  "+233",
  "+232",
  "+231",
  "+230",
  "+229",
  "+228",
  "+227",
  "+226",
  "+225",
  "+224",
  "+223",
  "+222",
  "+221",
  "+220",
  "+218",
  "+216",
  "+213",
  "+212",
  "+211",
  "+98",
  "+95",
  "+94",
  "+93",
  "+92",
  "+91",
  "+90",
  "+86",
  "+84",
  "+82",
  "+81",
  "+66",
  "+65",
  "+64",
  "+63",
  "+62",
  "+61",
  "+60",
  "+58",
  "+57",
  "+56",
  "+55",
  "+54",
  "+53",
  "+52",
  "+51",
  "+49",
  "+48",
  "+47",
  "+46",
  "+45",
  "+44",
  "+43",
  "+41",
  "+40",
  "+39",
  "+36",
  "+34",
  "+33",
  "+32",
  "+31",
  "+30",
  "+27",
  "+20",
  "+7",
  "+1",
];

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
