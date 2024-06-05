import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Constants from "src/constants";
import { useTranslation } from "react-i18next";


export const UserInfo = ({ disabled }: { disabled?: boolean }) => {
  const { user } = React.useContext(Contexts.UserContext);
  const { values } = Formik.useFormikContext<{ [key: string]: string }>();
  const { state } = Router.useLocation() as {
    state: { newPassword: string; removeProfile: string };
  };
  const navigate = Router.useNavigate();
  const handleRemovePhoto = () => {
    navigate(`${Constants.API_CONFIG.base}remove-profile`, {
      state,
    });
  };
  const handleChangePassword = () => {
    navigate(`${Constants.API_CONFIG.base}profile/change-password`, {
      state,
    });
  };

  const { t } = useTranslation();


  return (
    <Mui.Grid container spacing={3} sx={{ pr: 5, pb: 5, ml: "auto" }}>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.FormField
          label={`${t('firstName')}`}
          name="firstName"
          size="small"
          disabled={disabled}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.FormField
          label={`${t('lastName')}`}
          name="lastName"
          size="small"
          disabled={disabled}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.FormField
          label={`${t('email')}`}
          name="email"
          size="small"
          disabled
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.PhoneField
          size="small"
          name="phoneNumber"
          type="text"
          label={`${t('contactNumber')}`}
          disabled={disabled}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.FormField
          label={`${t('password')}`}
          name="password"
          type="password"
          size="small"
          disabled
          sx={{ pointerEvents: "none" }}
          InputProps={{
            endAdornment: (
              <Mui.InputAdornment position="end">
                <Mui.Link
                  id="changePassword"
                  color="primary"
                  fontWeight="bold"
                  variant="caption"
                  onClick={handleChangePassword}
                  sx={{ pointerEvents: "auto", cursor: "pointer" }}
                >
                 {t('change')}
                </Mui.Link>
              </Mui.InputAdornment>
            ),
          }}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Mui.Stack direction="row" alignItems="center" spacing={1}>
          <Mui.Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Mui.IconButton
                disabled={disabled}
                color="inherit"
                onClick={() =>
                  document.getElementById("browseprofileImage")?.click()
                }
                sx={{
                  width: 25,
                  height: 25,
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <MuiIcons.Edit
                  sx={{ width: 14, display: disabled ? "none" : undefined }}
                />
              </Mui.IconButton>
            }
          >
            <Components.Form.ImageField
              avatar
              disabled={disabled}
              name="profileImage"
              label={`${t('photo')}`}
              initName={`${user?.firstName}_${user?.lastName}`}
              sx={{ width: 50, height: 50 }}
            />
          </Mui.Badge>
          {
            {
              undefined: values["profileImage"] && (
                <Mui.Link
                  sx={{ pt: 3, cursor: "pointer" }}
                  onClick={handleRemovePhoto}
                >
                 {t('remove') } { t('photo')}
                </Mui.Link>
              ),
              true: (
                <Mui.Link
                  id="changeProfile"
                  sx={{ pt: 3, cursor: "pointer" }}
                  component={Router.Link}
                  to="edit"
                >
                  {t('change')}
                </Mui.Link>
              ),
            }[disabled as unknown as string]
          }
        </Mui.Stack>
      </Mui.Grid>
    </Mui.Grid>
  );
};
