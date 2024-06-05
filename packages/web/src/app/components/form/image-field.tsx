import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";
import * as Assets from "src/assets";
import * as Components from "src/app/components";
import * as Providers from "src/app/providers";

export const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const ImageField = ({
  name,
  sx,
  label,
  disabled,
  initName,
  avatar,
}: image.Props & Mui.CardMediaProps) => {
  const handler = Providers.useCustomHandler;
  const [view, setView] = React.useState(false);
  const {
    setFieldValue,
    setFieldError,
    values,
    errors,
    touched,
    isSubmitting,
  } = Formik.useFormikContext<{ [key: string]: string }>();
  const error = Boolean(errors[name] && touched[name]);
  const handleOnChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        /(image\/*|application\/pdf)/.test(e.target?.files?.[0]?.type || "")
      ) {
        if ((e.target?.files?.[0]?.size || 0) > 5000000)
          handler({
            message: "Upload limit maximum 5MB allowed",
            variant: "error",
          });
        else setFieldValue(name, await toBase64(e.target?.files?.[0] as Blob));
      } else
        handler({
          message: "Only .jpg, .jpeg or .pdf files allowed",
          variant: "error",
        });
    },
    [name]
  );
  const handleView = () => setView(!view);

  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.Box
        sx={{ width: "100%", position: "relative" }}
        onClick={disabled ? handleView : undefined}
      >
        <input
          disabled={disabled || isSubmitting}
          hidden
          accept="image/*,application/pdf"
          id={`browse${name}`}
          type="file"
          name={name}
          onChange={!disabled ? handleOnChange : undefined}
        />
        <label
          htmlFor={`browse${name}`}
          style={{ display: "inline-block", width: "inherit" }}
        >
          {avatar ? (
            <Mui.Avatar
              src={
                values[name]
                  ? values[name]?.includes("base64")
                    ? values[name]
                    : `${import.meta.env.VITE_API_ENCRYPTION}://${
                        import.meta.env.VITE_API_IP
                      }${import.meta.env.VITE_ASSETS_PATH}${values[name]}`
                  : `https://avatars.dicebear.com/api/initials/${initName}.svg`
              }
              sx={{
                cursor: "pointer",
                textAlign: "center",
                objectFit: "cover",
                boxShadow: values[name] && "0px 0px 10px #00000050",
                border: (theme) =>
                  error
                    ? `1px solid ${theme.palette.error.main}`
                    : values[name]
                    ? undefined
                    : `1px solid ${theme.palette.grey[400]}`,
                ...sx,
              }}
            />
          ) : (
            <Mui.CardMedia
              component="object"
              id={name}
              data={
                values[name]
                  ? values[name].includes("base64")
                    ? values[name]
                    : `${import.meta.env.VITE_API_ENCRYPTION}://${
                        import.meta.env.VITE_API_IP
                      }${import.meta.env.VITE_ASSETS_PATH}${
                        values[name]
                      }#toolbar=0`
                  : Assets.KycAddPhoto
              }
              sx={{
                borderRadius: 1,
                p: values[name] ? 0 : 10,
                objectFit: values[name] ? "cover" : "contain",
                border: (theme) =>
                  error
                    ? `1px solid ${theme.palette.error.main}`
                    : values[name]
                    ? undefined
                    : `1px solid ${theme.palette.primary.main}`,
                ...sx,
              }}
            />
          )}
        </label>
        {error && (
          <Mui.Typography color="error" variant="caption">
            {errors[name]}
          </Mui.Typography>
        )}
        <Mui.Box
          sx={{
            display: disabled && !avatar ? "block" : "none",
            boxShadow: `0 0 100px rgba(0, 0, 0, 0.26) inset`,
            zIndex: 1,
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
            borderRadius: 1,
          }}
        />
        {view && (
          <Components.Global.FullView
            onClick={handleView}
            src={
              values[name]
                ? values[name]?.includes("base64")
                  ? values[name]
                  : `${import.meta.env.VITE_API_ENCRYPTION}://${
                      import.meta.env.VITE_API_IP
                    }${import.meta.env.VITE_ASSETS_PATH}${values[name]}`
                : `https://avatars.dicebear.com/api/initials/${initName}.svg`
            }
          />
        )}
      </Mui.Box>
    </Components.Form.FieldLabel>
  );
};

export declare namespace image {
  export interface Props {
    name: string;
    label?: string;
    disabled?: boolean;
    avatar?: boolean;
    initName?: string;
  }
}
