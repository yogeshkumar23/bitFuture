import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Messaging = ({
  completed = false,
  path,
  dispute,
}: {
  path: string;
  completed?: boolean;
  dispute: boolean;
}) => {
  const [message, setMessage] = React.useState("");
  const { user } = React.useContext(Contexts.UserContext);
  const { state } = Router.useLocation() as {
    state: p2pTrade & p2pTradeRequest;
    pathname: string;
  };
  const { data: chat } = Hooks.Firebase.useFireSnapshot<p2pChat>(
    "collection",
    path
  ).collectionSnapshot();
  const { link, loading, upload, setLink } = Hooks.Utils.useFileUpload();
  const { sendMessage } = Hooks.Main.useP2PTrade(user?.uid as string);

  React.useEffect(() => {
    document
      ?.getElementById("p2pChatMessages")
      ?.scrollTo(
        0,
        document.getElementById("p2pChatMessages")?.scrollHeight || 0
      );
  }, [
    document.getElementById("p2pChatMessages"),
    document.getElementById("p2pChatMessages")?.scrollHeight,
    chat?.length,
  ]);

  const handleClick = async () => {
    const newMessage = {
      message,
      time: new Date().getTime(),
      image: link || "",
    };
    sendMessage(
      newMessage,
      `${state?.tradeId}_${state?.requestPlacedTime}`,
      state?.requestuid as string,
      user?.uid === state?.tradeuid ? state?.requestuid : state?.tradeuid || ""
    );
    setMessage("");
    setLink("");
  };

  const handleBrowse = async (e: React.ChangeEvent<HTMLInputElement>) =>
    await upload(e.target?.files?.[0] as File);

  return (
    <Mui.Stack
      spacing={1}
      sx={{
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.grey[200]}`,
        height: "100%",
      }}
    >
      <Components.Global.Container
        direction="column"
        justifyContent="start"
        spacing={2}
        sx={{ height: "100%", px: { xs: 1, sm: 2 } }}
      >
        <Mui.Typography variant="h6" fontWeight={900}>
          Conversation
          {dispute && (
            <Mui.Typography variant="body2" color="warning.main">
              (Admin Connected)
            </Mui.Typography>
          )}
        </Mui.Typography>
        <Mui.Divider />
        <Mui.Stack
          id="p2pChatMessages"
          spacing={2}
          sx={{
            p: 1,
            pb: 10,
            borderRadius: "inherit",
            maxHeight: "65vh",
            width: "100%",
            minHeight: "100%",
            overflow: "auto",
            border: (theme) => `1px solid ${theme.palette.grey[100]}`,
          }}
        >
          {chat ? (
            chat
              .sort((a, b) => a.time - b.time)
              .map((item, index) => (
                <Pages.P2P.Trade.Views.Message
                  key={index}
                  type={
                    state?.uid === item?.uid
                      ? state?.username || ""
                      : state?.requestUname || ""
                  }
                  align={user?.uid === item?.uid}
                  {...item}
                  profile={
                    state?.uid === item?.uid
                      ? state?.userProfile || ""
                      : state?.requestUserProfile || ""
                  }
                />
              ))
          ) : (
            <Mui.Typography
              variant="h5"
              color="text.secondary"
              textAlign="center"
              sx={{ m: "auto", p: 1 }}
            >
              {completed ? "Trade completed" : "Start your conversation"}
              <MuiIcons.Chat
                color="inherit"
                sx={{ display: completed ? "none" : "inline-flex" }}
              />
            </Mui.Typography>
          )}
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
          maxRows={2}
          id="standard-basic"
          placeholder="Write your message.."
          multiline
          variant="standard"
          fullWidth
          value={message}
          disabled={completed}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(event.target.value);
          }}
        />
        <Mui.Badge
          component={Mui.IconButton}
          disabled={completed || loading}
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? undefined : Mui.colors.grey[100],
            borderRadius: 2,
            height: "fit-content",
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
              name="p2pMessage"
              onChange={handleBrowse}
              disabled={completed || loading}
            >
              <MuiIcons.AttachFile sx={{ transform: "rotate(45deg)" }} />
            </Components.Global.FileWrapper>
          )}
        </Mui.Badge>
        <Mui.Button
          type="submit"
          disabled={completed || loading}
          variant="contained"
          onClick={handleClick}
        >
          Send
        </Mui.Button>
      </Components.Global.Container>
    </Mui.Stack>
  );
};
