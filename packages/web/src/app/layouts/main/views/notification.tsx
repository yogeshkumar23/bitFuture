import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import React from "react";
import * as Contexts from "src/app/contexts";
import * as Pages from "src/app/pages";

export const Notification = ({
  check,
  trigger,
}: {
  check: boolean;
  trigger: boolean;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, notifications, generalNotifications } = React.useContext(
    Contexts.UserContext
  );

  const AllNotifications = React.useMemo(
    () =>
      [
        ...(notifications?.filter(({ is_Read }) => !is_Read) || []),
        ...(generalNotifications || []),
      ]
        .sort((a, b) =>
          a.createdTime < b.createdTime
            ? 1
            : b.createdTime < a.createdTime
            ? -1
            : 0
        )
        .filter(
          (notification) =>
            !Boolean(
              (notification as unknown as { [key: string]: boolean })[
                user?.uid || ""
              ]
            )
        )
        .slice(0, 4),
    [
      notifications?.map((notification) => notification.is_Read)?.join(","),
      generalNotifications
        ?.map((a) =>
          Boolean((a as unknown as { [key: string]: boolean })[user?.uid || ""])
        )
        ?.join(","),
    ]
  );

  return (
    <>
      <Mui.Badge
        component={Mui.IconButton}
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ height: "fit-content" }}
        badgeContent={
          AllNotifications?.length && (
            <Mui.Typography
              variant="caption"
              component="span"
              borderRadius={60}
              sx={{
                height: 7,
                width: 7,
                ml: -2,
                mb: -2,
                color: "#ffffff",
                bgcolor: (theme) => theme.palette.error.main,
              }}
            />
          )
        }
        onClick={(event: React.MouseEvent<HTMLElement>) =>
          setAnchorEl(event.currentTarget)
        }
      >
        <MuiIcons.NotificationsOutlined
          sx={{
            color: (theme) =>
              !trigger && check
                ? "common.white"
                : theme.palette.mode === "dark"
                ? "common.white"
                : "primary.main",
          }}
        />
      </Mui.Badge>
      <Mui.Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        sx={{
          display: anchorEl ? "block" : "none",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 400,
            bgcolor: "background.default",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            borderRadius: (theme) => theme.spacing(1),
            marginTop: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              marginLeft: -0.5,
              marginRight: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.default",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Mui.CardContent sx={{ overflow: "hidden" }}>
          <Mui.Stack direction="row" justifyContent="space-between">
            <Mui.Typography variant="h6">Notifications</Mui.Typography>
            <Mui.Link component={Router.Link} to="notifications">
              <Mui.Typography variant="caption" color="text.secondary">
                View all
              </Mui.Typography>
            </Mui.Link>
          </Mui.Stack>
          {AllNotifications?.length ? (
            AllNotifications.map((notification, index) =>
              "text" in notification ? (
                <Pages.User.Notifications.Views.General
                  key={index}
                  hideMore
                  ctext
                  {...notification}
                />
              ) : (
                <Pages.User.Notifications.Views.Notification
                  key={index}
                  uid={user?.uid as string}
                  text
                  {...notification}
                />
              )
            )
          ) : (
            <Mui.Typography
              variant="h5"
              textAlign="center"
              sx={{
                p: 5,
                color: Mui.colors.grey[300],
              }}
            >
              No Record Found
            </Mui.Typography>
          )}
        </Mui.CardContent>
      </Mui.Menu>
    </>
  );
};
