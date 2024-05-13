import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const useTickets = (uid: string) => {
  const handler = Providers.useCustomHandler;
  const { add, update } = Hooks.Firebase.useFirestore(true);

  const ticketsChat = async (newChat: chat) => {
    if (newChat.message.length || newChat.image) {
      await add(`users/${uid}/tickets/${newChat.ticketId}/messages`, {
        ...newChat,
        uid,
      });
    } else handler({ message: "Message can't be empty", variant: "error" });
  };

  const ticketClose = async (ticketId: string, userId: string) => {
    await update(`users/${userId}/tickets`, ticketId, {
      status: "closed",
    });
  };

  return { ticketsChat, ticketClose };
};
