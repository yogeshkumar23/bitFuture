import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const useTickets = (uid: string) => {
  const handler = Providers.useCustomHandler;
  const { add } = Hooks.Firebase.useFirestore(true);

  const ticketsChat = async (newChat: chat) => {
    if (newChat.message.length || newChat.image) {
      await add(`users/${uid}/tickets/${newChat.ticketId}/messages`, {
        ...newChat,
        uid,
      });
    } else handler({ message: "Message can't be empty", variant: "error" });
  };

  const ticket = async (newTicket: tickets) => {
    const createTicket = await add(`users/${uid}/tickets`, {
      ...newTicket,
      uid,
    });
    const newChat: chat = {
      type: "user",
      message: newTicket.message,
      time: new Date().getTime(),
      ticketId: createTicket.id,
      uid,
      image: undefined,
    };
    ticketsChat(newChat);
    handler({
      message: "Ticket Created successfully!",
      variant: "success",
    });
  };
  return { ticket, ticketsChat };
};
