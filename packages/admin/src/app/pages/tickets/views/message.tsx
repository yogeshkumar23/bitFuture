import * as Mui from "@mui/material";
import React from "react";
import * as Assets from "src/assets";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Message = ({
  image,
  type,
  message,
  time,
  user,
}: chat & { user: Hooks.Admin.UseUser.User }) => {
  const isUser = type === "admin";
  const [view, setView] = React.useState(false);
  const handleView = () => setView(!view);

  return (
    <Mui.Stack direction={isUser ? "row-reverse" : "row"} spacing={1}>
      <Mui.Avatar
        src={
          !isUser
            ? user?.profileImage
              ? `${import.meta.env.VITE_API_ENCRYPTION}://${
                  import.meta.env.VITE_API_IP
                }${import.meta.env.VITE_ASSETS_PATH}${user?.profileImage}`
              : `https://avatars.dicebear.com/api/initials/${user?.firstName}_${user?.lastName}.svg`
            : Assets.MainLogo
        }
        sx={{ width: 30, height: 30 }}
      />
      <Mui.Stack spacing={1} alignItems={isUser ? "flex-end" : "start"}>
        <Mui.Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? isUser
                  ? theme.palette.grey[100]
                  : `${theme.palette.primary.main}20`
                : isUser
                ? theme.palette.background.default
                : theme.palette.primary.dark,
          }}
          p={2}
          borderRadius={2}
        >
          <Mui.Typography variant="subtitle2">{message}</Mui.Typography>
          {image && (
            <Mui.CardMedia
              onClick={handleView}
              component="img"
              src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                import.meta.env.VITE_API_IP
              }${import.meta.env.VITE_ASSETS_PATH}${image}`}
              sx={{
                height: 250,
                width: 350,
                borderRadius: 2,
                cursor: "pointer",
              }}
            />
          )}
        </Mui.Box>
        <Mui.Typography color="secondary.light" variant="caption">
          {Components.Global.timeFn(time as unknown as string)}
        </Mui.Typography>
        {view && (
          <Components.Global.FullView
            onClick={handleView}
            src={`${import.meta.env.VITE_API_ENCRYPTION}://${
              import.meta.env.VITE_API_IP
            }${import.meta.env.VITE_ASSETS_PATH}${image}`}
          />
        )}
      </Mui.Stack>
    </Mui.Stack>
  );
};
