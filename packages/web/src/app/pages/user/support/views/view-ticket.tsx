import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";

export const ViewTicket = () => {
  const [message, setMessage] = React.useState("");
  const { user } = React.useContext(Contexts.UserContext);
  const { ticketId } = Router.useParams();
  const { data: chat } = Hooks.Firebase.useFireSnapshot<chat>(
    "collection",
    `users/${user?.uid}/tickets/${ticketId}/messages`
  ).collectionSnapshot();
  const { data: ticket } = Hooks.Firebase.useFireSnapshot<tickets>(
    "collection",
    `users/${user?.uid}/tickets`
  ).collectionSnapshot();
  const ticketState = ticket?.find((ticket) => ticket.id === ticketId)?.status;
  const { state } = Router.useLocation() as {
    state: { subject: string; status: "pending" | "closed"; message: string };
  };
  const { link, loading, upload, setLink } = Hooks.Utils.useFileUpload();
  const { ticketsChat } = Hooks.Support.useTickets(user?.uid as string);

  React.useEffect(() => {
    document
      ?.getElementById("ticketMessageView")
      ?.scrollTo(
        0,
        document.getElementById("ticketMessageView")?.scrollHeight || 0
      );
  }, [
    document.getElementById("ticketMessageView"),
    document.getElementById("ticketMessageView")?.scrollHeight,
    chat?.length,
  ]);

  const handleClick = async () => {
    const newMessage: chat = {
      message,
      time: new Date().getTime(),
      type: "user",
      ticketId,
      image: link || "",
    };
    ticketsChat(newMessage);
    setMessage("");
    setLink("");
  };

  const handleBrowse = async (e: React.ChangeEvent<HTMLInputElement>) =>
    await upload(e.target?.files?.[0] as File);

  return (
    <Mui.Stack spacing={2}>
      <Mui.Button
        component={Router.Link}
        to={`${Constants.API_CONFIG.base}help-center`}
        variant="contained"
        startIcon={<MuiIcons.Add />}
        sx={{ width: "fit-content" }}
      >
        New Ticket
      </Mui.Button>
      <Components.Global.Container
        direction="column"
        justifyContent="start"
        spacing={2}
      >
        <Mui.Stack spacing={1}>
          <Mui.Typography variant="h5">{state?.subject}</Mui.Typography>
          <Mui.Typography variant="body2">{state?.message}</Mui.Typography>
        </Mui.Stack>
        <Mui.Stack
          id="ticketMessageView"
          spacing={2}
          sx={{
            maxHeight: 360,
            width: "100%",
            height: 360,
            overflow: "auto",
          }}
        >
          {chat
            ?.sort((a, b) => a.time - b.time)
            ?.map((item, index) => (
              <Pages.User.Support.Views.Message key={index} {...item} />
            ))}
        </Mui.Stack>
      </Components.Global.Container>
      <Components.Global.Container
        spacing={2}
        alignItems="center"
        sx={{
          height: "fit-content",
          width: "100%",
          position: { xs: "fixed", sm: "relative" },
          bottom: 0,
          left: 0,
          bgcolor: "background.default",
          zIndex: 1000,
        }}
      >
        <Mui.TextField
          id="standard-basic"
          placeholder="Write your message.."
          multiline
          variant="standard"
          fullWidth
          value={message}
          disabled={ticketState === "closed"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(event.target.value);
          }}
        />
        <Mui.Badge
          component={Mui.IconButton}
          disabled={ticketState === "closed" || loading}
          sx={{
            borderRadius: 2,
            height: "fit-content",
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "transparent"
                : Mui.colors.grey[100],
          }}
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          badgeContent={
            link && (
              <Mui.Box
                component="span"
                borderRadius={60}
                sx={{
                  px: 1,
                  borderRadius: 20,
                  color: "#fff",
                  bgcolor: (theme) => theme.palette.success.main,
                }}
              >
                <Mui.Typography variant="caption" color="inherit">
                  1
                </Mui.Typography>
              </Mui.Box>
            )
          }
        >
          {loading ? (
            <Mui.CircularProgress size="small" />
          ) : (
            <Components.Global.FileWrapper
              name="ticketFiles"
              onChange={handleBrowse}
              disabled={ticketState === "closed" || loading}
            >
              <MuiIcons.AttachFile sx={{ transform: "rotate(45deg)" }} />
            </Components.Global.FileWrapper>
          )}
        </Mui.Badge>
        <Mui.Button
          disabled={ticketState === "closed" || loading}
          variant="contained"
          onClick={handleClick}
        >
          Send
        </Mui.Button>
      </Components.Global.Container>
    </Mui.Stack>
  );
};
