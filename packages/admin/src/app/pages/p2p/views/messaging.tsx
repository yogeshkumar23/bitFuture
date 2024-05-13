import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const Messaging = ({
  completed,
  path,
  dispute,
}: {
  path: string;
  completed: boolean;
  dispute: boolean;
}) => {
  const [message, setMessage] = React.useState("");
  const user = React.useContext(Contexts.UserContext);
  const { state } = Router.useLocation() as {
    state: p2pTrade & p2pTradeRequest;
    pathname: string;
  };
  const { data: chat } = Hooks.Firebase.useFireSnapshot<p2pChat>(
    "collection",
    path
  ).collectionSnapshot();
  const { sendMessage } = Hooks.Main.useP2PTrade(
    user?.uid as string,
    state?.requestPlacedTime as number
  );

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
      image: "",
      admin: true,
    };
    sendMessage(
      newMessage,
      `${state?.tradeId}_${state?.requestPlacedTime}`,
      state?.requestuid as string
    );
    setMessage("");
  };

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
        sx={{ height: { xs: 400, md: "100%" } }}
      >
        <Mui.Typography variant="h6">
          Conversation
          {dispute && (
            <Mui.Typography variant="caption" color="warning.main">
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
            borderRadius: "inherit",
            maxHeight: 400,
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
                <Pages.P2P.Views.Message
                  key={index}
                  type={
                    item.uid === state?.tradeuid
                      ? state?.username || ""
                      : state?.requestUname || ""
                  }
                  align={user?.uid === item?.uid}
                  {...item}
                  profile={
                    item.uid === state?.tradeuid
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
        sx={{ height: "fit-content", width: "100%" }}
      >
        <Mui.TextField
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
        <Mui.Button
          disabled={completed}
          variant="contained"
          onClick={handleClick}
        >
          Send
        </Mui.Button>
      </Components.Global.Container>
    </Mui.Stack>
  );
};
