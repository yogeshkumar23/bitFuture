import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export default () => {
  const user = React.useContext(Contexts.UserContext);
  const rowPerPage = 10;
  const [topic, setTopic] = React.useState("");
  const [page, setPage] = React.useState(1);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const AllNotifications = React.useMemo(
    () =>
      [
        ...(user?.notifications || []),
        ...(user?.generalNotifications || []),
      ].filter((a) =>
        topic === "unread"
          ? a.topic.includes("general")
            ? !Boolean(
                (a as unknown as { [key: string]: boolean })[user?.uid || ""]
              )
            : !a.is_Read
          : a.topic.includes(topic == "All Notifications" ? "" : topic)
      ),
    [
      topic,
      user?.notifications
        ?.map((notification) => notification.is_Read)
        ?.join(","),
      user?.generalNotifications
        ?.map((a) =>
          Boolean((a as unknown as { [key: string]: boolean })[user?.uid || ""])
        )
        ?.join(","),
    ]
  );

  React.useEffect(() => {
    setPage(1);
  }, [topic]);

  return (
    <Mui.Container maxWidth="md" sx={{ px: { xs: 0, sm: 1 } }}>
      <Components.Global.Container
        direction="column"
        justifyContent="start"
        spacing={2}
        sx={{ height: "100%", minHeight: "90vh" }}
      >
        <Mui.Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Mui.Typography variant="h6" fontWeight={900}>
            Notifications
          </Mui.Typography>
          <Mui.Select
            variant="outlined"
            size="small"
            sx={{
              minWidth: { md: 200, xs: 10 },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: Mui.colors.grey[300],
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: Mui.colors.grey[300],
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: Mui.colors.grey[300],
              },
            }}
            defaultValue="All Notifications"
            onChange={(event: Mui.SelectChangeEvent) =>
              setTopic(event.target.value)
            }
          >
            {[
              "All Notifications",
              "Trade Notifications",
              "Login activity",
              "General updates",
              "Unread",
            ]?.map((text, index) => (
              <Mui.MenuItem
                value={
                  index ? text.split(" ")[0].toLowerCase() : "All Notifications"
                }
                key={index}
              >
                {text}
              </Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.Stack>

        {AllNotifications?.length ? (
          AllNotifications.sort((a, b) =>
            a.createdTime < b.createdTime
              ? 1
              : b.createdTime < a.createdTime
              ? -1
              : 0
          )
            .slice(rowPerPage * page - rowPerPage, rowPerPage * page)
            .map((notification, index) =>
              "text" in notification ? (
                <Pages.User.Notifications.Views.General
                  key={index}
                  hideMore
                  {...notification}
                  is_Read={Boolean(
                    (notification as unknown as { [key: string]: boolean })[
                      user?.uid || ""
                    ]
                  )}
                />
              ) : (
                <Pages.User.Notifications.Views.Notification
                  key={index}
                  uid={user?.uid as string}
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
        <Mui.Box flexGrow={1} />
        <Mui.Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ m: 2 }}
        >
          <Mui.Typography variant="body1">
            Total: {AllNotifications?.length}
          </Mui.Typography>
          <Mui.Pagination
            variant="outlined"
            shape="rounded"
            color="primary"
            count={
              AllNotifications.length < rowPerPage
                ? 1
                : parseInt((AllNotifications?.length / rowPerPage).toString()) +
                  1
            }
            page={page}
            onChange={handlePageChange}
          />
        </Mui.Stack>
      </Components.Global.Container>
      <Router.Outlet />
    </Mui.Container>
  );
};
