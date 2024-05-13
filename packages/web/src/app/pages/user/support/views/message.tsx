import * as Mui from "@mui/material";
import React from "react";
import * as Assets from "src/assets";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";

export const Message = (props: chat) => {
  const isUser = props.type === "user";
  const { user } = React.useContext(Contexts.UserContext);
  const [view, setView] = React.useState(false);
  const handleView = () => setView(!view);

  return (
    <Mui.Stack direction={isUser ? "row-reverse" : "row"} spacing={1}>
      <Mui.Avatar
        src={
          isUser
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
          <Mui.Typography variant="subtitle2">{props.message}</Mui.Typography>
          {props.image && (
            <Mui.CardMedia
              onClick={handleView}
              component="img"
              src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                import.meta.env.VITE_API_IP
              }${import.meta.env.VITE_ASSETS_PATH}${props.image}`}
              sx={{
                height: { xs: 100, sm: 250 },
                width: { xs: 100, sm: 350 },
                borderRadius: 2,
                cursor: "pointer",
              }}
            />
          )}
        </Mui.Box>
        <Mui.Typography color="secondary.light" variant="caption">
          {Components.Global.timeFn(props.time as unknown as string)}
        </Mui.Typography>
        {view && (
          <Components.Global.FullView
            onClick={handleView}
            src={`${import.meta.env.VITE_API_ENCRYPTION}://${
              import.meta.env.VITE_API_IP
            }${import.meta.env.VITE_ASSETS_PATH}${props.image}`}
          />
        )}
      </Mui.Stack>
    </Mui.Stack>
  );
};
