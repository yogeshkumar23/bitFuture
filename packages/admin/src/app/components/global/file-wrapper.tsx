import * as Mui from "@mui/material";

export const FileWrapper = ({
  children,
  ...props
}: Required<Pick<Mui.TextFieldProps, "name" | "onChange" | "disabled">> &
  Child) => (
  <>
    <input
      hidden
      accept="image/*"
      id={`browse${props.name}`}
      type="file"
      {...props}
    />
    <label
      htmlFor={`browse${props.name}`}
      style={{
        display: "inline-block",
        width: "fit-content",
        cursor: "pointer",
      }}
    >
      {children}
    </label>
  </>
);
