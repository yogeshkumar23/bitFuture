import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Providers from "src/app/providers";

export const ViewTicket = () => {
  const handler = Providers.useCustomHandler;
  const { ticketId } = Router.useParams();
  const [message, setMessage] = React.useState("");
  const { state } = Router.useLocation() as {
    state: Partial<tickets>;
  };
  const { users } = Hooks.Admin.useUserList();
  const ticketUser = users?.userList?.find((user) => user.uid === state?.uid);
  const { ticketsChat, ticketClose } = Hooks.Support.useTickets(
    ticketUser?.uid as string
  );

  const { data: ticket } = Hooks.Firebase.useFireSnapshot<tickets>(
    "collection",
    `users/${state?.uid}/tickets`,
    [ticketId as string]
  ).documentSnapshot(ticketId as string);

  const { data: messages } = Hooks.Firebase.useFireSnapshot<chat>(
    "collection",
    `users/${state?.uid}/tickets/${ticketId}/messages`
  ).collectionSnapshot();

  React.useLayoutEffect(() => {
    document
      ?.getElementById("ticketMessageView")
      ?.scrollTo(
        0,
        document.getElementById("ticketMessageView")?.scrollHeight || 0
      );
  }, [
    document.getElementById("ticketMessageView"),
    document.getElementById("ticketMessageView")?.scrollHeight,
    messages?.length,
  ]);

  const handleClick = () => {
    if (message) {
      const newMessage: chat = {
        message: message,
        time: new Date().getTime(),
        type: "admin",
        ticketId,
        uid: state?.uid,
      };
      ticketsChat(newMessage);
      setMessage("");
    } else handler({ message: "Please provide message", variant: "error" });
  };

  return (
    <Mui.Stack spacing={1} sx={{ height: "100%" }}>
      {ticket?.[0]?.metamask && (
        <WalletUpdate
          uid={state?.uid || ""}
          handler={handler}
          disabled={ticket?.[0]?.status === "closed"}
        />
      )}
      <Components.Global.Container
        direction="column"
        justifyContent="start"
        spacing={1}
        sx={{ height: "100%", width: "100%" }}
      >
        <Mui.Stack
          spacing={1}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
        >
          <Mui.Typography variant="h5" flexGrow={1} maxWidth="90%">
            {state?.subject as string}
            <Mui.Typography>
              {`${ticketUser?.firstName} ${ticketUser?.lastName} (${ticketUser?.email})`}
            </Mui.Typography>
            <Mui.Typography>{state?.message}</Mui.Typography>
          </Mui.Typography>

          <Mui.Button
            variant="outlined"
            onClick={() =>
              ticketClose(ticketId as string, state?.uid as string)
            }
            color="success"
            disabled={ticket?.[0]?.status === "closed"}
          >
            Close Ticket
          </Mui.Button>
        </Mui.Stack>

        <Mui.Stack
          id="ticketMessageView"
          spacing={2}
          sx={{
            maxHeight: "50vh",
            width: "100%",
            height: { xs: "50vh", md: "100%" },
            overflow: "auto",
          }}
        >
          {messages
            ?.sort((a, b) => a.time - b.time)
            .map((message, index) => (
              <Pages.Ticket.Views.Message
                user={ticketUser as Hooks.Admin.UseUser.User}
                key={index}
                {...message}
              />
            ))}
        </Mui.Stack>
      </Components.Global.Container>
      <Components.Global.Container spacing={2} alignItems="center">
        <Mui.TextField
          placeholder="Write your message.."
          multiline
          variant="standard"
          fullWidth
          disabled={ticket?.[0]?.status === "closed"}
          value={message}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(event.target.value);
          }}
        />
        <Mui.Button
          variant="contained"
          onClick={handleClick}
          disabled={ticket?.[0]?.status === "closed"}
        >
          Send
        </Mui.Button>
      </Components.Global.Container>
    </Mui.Stack>
  );
};

export const WalletUpdate = ({
  uid,
  handler,
  disabled,
}: {
  uid: string;
  handler: (props: Providers.customHandler.props) => void;
  disabled?: boolean;
}) => {
  const [wallet, setWallet] = React.useState("");
  const handleClick = async () => {
    if (wallet.trim()) {
      await Api.Server.Request("updateUserProfile", {
        uid,
        metaMaskWallet: wallet.trim(),
      }).then((res) => {
        handler({
          message: res.message,
          variant: res?.error ? "error" : "success",
        });
        setWallet("");
      });
    } else
      handler({
        message: "Please provided metamask wallet here",
        variant: "error",
      });
  };
  return (
    <>
      <Mui.Typography variant="h6">Metamask Wallet update</Mui.Typography>
      <Components.Global.Container spacing={2} alignItems="center">
        <Mui.TextField
          placeholder="Paste metamask wallet here"
          multiline
          variant="standard"
          fullWidth
          disabled={disabled}
          value={wallet}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setWallet(event.target.value);
          }}
        />
        <Mui.Button
          variant="contained"
          onClick={handleClick}
          disabled={disabled}
        >
          Update
        </Mui.Button>
      </Components.Global.Container>
    </>
  );
};
