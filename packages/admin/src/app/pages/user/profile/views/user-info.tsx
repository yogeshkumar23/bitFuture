import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";

export const UserInfo = ({ disabled }: { disabled?: boolean }) => {
  const user = React.useContext(Contexts.UserContext);
  const { state } = Router.useLocation() as {
    state: { newPassword: string; removeProfile: string };
  };
  const navigate = Router.useNavigate();
  const handleRemovePhoto = () => {
    navigate("remove-profile", {
      state,
    });
  };
  const handleChangePassword = () => {
    navigate(`${Constants.API_CONFIG.base}profile/change-password`, {
      state,
    });
  };

  return (
    <Mui.Grid container spacing={3} sx={{ pr: 5, pb: 5, ml: "auto" }}>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.FormField
          label="First Name"
          name="firstName"
          size="small"
          disabled={disabled}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.FormField
          label="Last Name"
          name="lastName"
          size="small"
          disabled={disabled}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.FormField
          label="Email"
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
          label="Contact number"
          disabled={disabled}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.FormField
          label="Password"
          name="password"
          type="password"
          size="small"
          disabled
          sx={{ pointerEvents: "none" }}
          InputProps={{
            endAdornment: (
              <Mui.InputAdornment position="end">
                <Mui.Link
                  color="primary"
                  fontWeight="bold"
                  variant="caption"
                  onClick={handleChangePassword}
                  sx={{ pointerEvents: "auto", cursor: "pointer" }}
                >
                  Change
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
              label="Photo"
              initName={`${user?.firstName}_${user?.lastName}`}
              sx={{ width: 50, height: 50 }}
            />
          </Mui.Badge>
          {
            {
              undefined: user?.profileImage && (
                <Mui.Link
                  sx={{ pt: 3, cursor: "pointer" }}
                  onClick={handleRemovePhoto}
                >
                  Remove Photo
                </Mui.Link>
              ),
              true: (
                <Mui.Link
                  sx={{ pt: 3, cursor: "pointer" }}
                  component={Router.Link}
                  to="edit"
                >
                  Change
                </Mui.Link>
              ),
            }[disabled as unknown as string]
          }
        </Mui.Stack>
      </Mui.Grid>
    </Mui.Grid>
  );
};
