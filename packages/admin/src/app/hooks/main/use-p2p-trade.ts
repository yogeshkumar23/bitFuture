import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const useP2PTrade = (uid: string, requestedPlaceTime: number) => {
  const { loading, add, update } = Hooks.Firebase.useFirestore(true);
  const handler = Providers.useCustomHandler;

  const tradeConfirm = async (trade: p2pTrade & p2pTradeRequest) => {
    await update(
      `users/${trade.tradeuid}/p2p_trades/${trade.tradeId}/requests`,
      `${trade.requestuid}_${trade.requestPlacedTime}`,
      {
        status: "paid",
        confirmedTime: new Date().getTime(),
      }
    );
    handler({
      message: "Order Confirmed successfully!",
      variant: "success",
    });
  };

  const tradeRequestCancel = async (
    tradeId: string,
    tradeuid: string,
    requestuid: string
  ) => {
    await update(
      `users/${tradeuid}/p2p_trades/${tradeId}/requests`,
      `${requestuid}_${requestedPlaceTime}`,
      { status: "cancelled", isEdited: 1 }
    );
  };

  // Connversation
  const sendMessage = async (
    newChat: p2pChat,
    tradeId: string,
    tradeUid: string
  ) => {
    if (newChat.message.length || newChat.image) {
      add(`users/${tradeUid}/p2p_trade_messages/${tradeId}/messages`, {
        ...newChat,
        uid,
      });
    } else handler({ message: "Message can't be empty", variant: "error" });
  };

  return { loading, sendMessage, tradeConfirm, tradeRequestCancel };
};
