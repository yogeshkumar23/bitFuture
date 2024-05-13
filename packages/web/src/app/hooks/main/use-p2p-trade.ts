import React from "react";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const useP2PTrade = (uid: string) => {
  const handler = Providers.useCustomHandler;
  const [payment, setPayment] = React.useState<paymentDetails>();
  const { send } = Hooks.User.useUtils();
  const { loading, add, get, set, update } = Hooks.Firebase.useFirestore(true);

  const init = (requestuid: string, tradeUid: string, tradeId: string) => {
    set(`users/${requestuid}/p2p_trade_messages`, tradeId, {
      init: "initiated",
      tradeId,
      tradeUid,
      uid,
    });
  };

  // Add new Trade
  const trade = async (newTrade: p2pTrade) => {
    await add(`users/${uid}/p2p_trades`, newTrade)
      .then(() =>
        handler({
          message: "Order posted successfully!",
          variant: "success",
        })
      )
      .catch((e) =>
        handler({
          message: e.message,
          variant: "error",
        })
      );
  };

  // Edit user trade
  const edit = async (
    tradeId: string,
    tradeDetails: Pick<
      p2pTrade,
      | "noOfCoins"
      | "pricePerCoin"
      | "priceLimitFrom"
      | "priceLimitTo"
      | "prefferedPayment"
      | "showPostTill"
    >
  ) => {
    await update(`users/${uid}/p2p_trades`, tradeId, {
      ...tradeDetails,
      isEdited: 1,
    })
      .then(() =>
        handler({
          message: "Order Post Updated successfully!",
          variant: "success",
        })
      )
      .catch((e) =>
        handler({
          message: e.message,
          variant: "error",
        })
      );
  };

  // Cancel user trade
  const cancel = async (tradeId: string) => {
    await update(`users/${uid}/p2p_trades`, tradeId, {
      status: "cancelled",
      orderCancelledAt: new Date().getTime(),
      isEdited: 1,
    })
      .then(() =>
        handler({
          message: "Order Post cancelled successfully!",
          variant: "success",
        })
      )
      .catch((e) =>
        handler({
          message: e.message,
          variant: "error",
        })
      );
  };

  // Trade request
  const tradeRequest = async (
    newTrade: Pick<
      p2pTradeRequest,
      "requestCoins" | "requestPrice" | "requestTradeId" | "requestPlacedTime"
    >,
    tradeuid: string,
    tradeId: string
  ) => {
    await set(
      `users/${uid}/p2p_request_trades`,
      `${tradeId}_${newTrade.requestPlacedTime}`,
      {
        ...newTrade,
        requestStatus: "pending",
        requestuid: uid,
        tradeuid,
      }
    )
      .then(() =>
        handler({
          message: "Order requested successfully!",
          variant: "success",
        })
      )
      .catch((e) =>
        handler({
          message: e.message,
          variant: "error",
        })
      );
  };

  const tradeRequestCancel = async (
    tradeId: string,
    tradeuid: string,
    requestuid: string
  ) => {
    await update(
      `users/${tradeuid}/p2p_trades/${tradeId}/requests`,
      requestuid,
      { status: "cancelled" }
    );
  };

  const tradeAccept = async (trade: p2pTrade, confirmUid: string) => {
    await update(
      `users/${trade.uid}/p2p_trades/${trade.tradeId}/requests`,
      confirmUid,
      {
        status: "confirmed",
        confirmedTime: new Date().getTime(),
      }
    )
      .then(() =>
        handler({
          message: "Order Accepted successfully!",
          variant: "success",
        })
      )
      .catch((e) =>
        handler({
          message: e.message,
          variant: "error",
        })
      );
  };

  // Trade confirm
  const tradeConfirm = async (trade: p2pTrade, confirmUid: string) => {
    await update(
      `users/${trade.uid}/p2p_trades/${trade.tradeId}/requests`,
      confirmUid,
      {
        status: "paid", //confirmed
        confirmedTime: new Date().getTime(),
      }
    )
      .then(() =>
        handler({
          message: "Order Confirmed successfully!",
          variant: "success",
        })
      )
      .catch((e) =>
        handler({
          message: e.message,
          variant: "error",
        })
      );
  };

  // Trade Dispute
  const tradeDispute = async (trade: p2pTrade & p2pTradeRequest) => {
    try {
      await update(
        `users/${trade.requestuid}/p2p_request_trades`,
        `${trade.tradeId}_${trade.requestPlacedTime}`,
        {
          dispute: true,
          requestStatus: "dispute",
          disputeRaisedUid: uid,
          disputedTime: new Date().getTime(),
        }
      );
      await update(
        `users/${trade.uid}/p2p_trades/${trade.tradeId}/requests`,
        `${trade.requestuid}_${trade.requestPlacedTime}`,
        {
          status: "dispute",
        }
      );
      await update(`p2p_trade_book`, `${trade.orderPlacedTime}`, {
        status: "dispute",
      });
      // Mail notification for trade creator
      await send(
        trade.tradeuid,
        "P2P Dispute",
        "Dispute Raised",
        `Trade Request ID : ${trade.requestTradeId} <br/>${
          uid === trade.tradeuid ? "You" : trade.requestUname
        } raised dispute for this trade request`
      );
      // Mail notification for trade requestor
      await send(
        trade.requestuid,
        "P2P Dispute",
        "Dispute Raised",
        `Trade Request ID : ${trade.requestTradeId} <br/>${
          uid === trade.requestuid ? "You" : trade.username
        } raised dispute for this trade request`
      );
      handler({
        message: "Dispute raised!",
        variant: "success",
      });
    } catch (e: any) {
      handler({
        message: e.message,
        variant: "error",
      });
    }
  };

  // Get payment details
  const payemntDetials = async (
    paymentType: string,
    buid: string,
    all?: boolean,
    key?: boolean
  ) => {
    try {
      await get(
        `users/${buid}/payment_details`,
        paymentType.replaceAll(" ", "_").toLowerCase()
      ).then((res) =>
        setPayment((prev) =>
          all
            ? ((key
                ? { ...prev, [paymentType]: res.data() }
                : { ...prev, ...res.data() }) as paymentDetails)
            : ((key
                ? { [paymentType]: res.data() }
                : res.data()) as paymentDetails)
        )
      );
    } catch (e) {
      setPayment({} as paymentDetails);
    }
  };

  // Pay
  const pay = async (
    trade: p2pTrade & p2pTradeRequest,
    data: { image: string }
  ) => {
    const payNotifier: notification = {
      topic: "trade",
      message: "Buyer Paid for your order",
      is_Read: false,
      createdTime: new Date().getTime(),
      attributes: {
        coin: trade.coin,
        currency: trade.currency,
        coinId: `${trade.coin}/${trade.currency}`,
        tradeId: trade.tradeId,
        requestuid: trade.requestuid,
      },
    };
    await update(
      `users/${trade.uid}/p2p_trades/${trade.tradeId}/requests`,
      `${trade.requestuid}_${trade.requestPlacedTime}`,
      {
        status: "ongoing",
      }
    );
    await update(
      `users/${trade?.requestuid}/p2p_request_trades`,
      `${trade.tradeId}_${trade.requestPlacedTime}`,
      {
        requestStatus: "ongoing",
      }
    );
    await update(
      `users/${trade.uid}/p2p_trades/${trade.tradeId}/requests`,
      `${trade.requestuid}_${trade.requestPlacedTime}`,
      {
        status: "ongoing",
      }
    );
    await update(
      `users/${trade.requestuid}/p2p_trade_messages`,
      `${trade.tradeId}_${trade.requestPlacedTime}`,
      {
        ...data,
        paid: true,
      }
    )
      .then(() =>
        handler({
          message: "Payment receipt updated successfully!",
          variant: "success",
        })
      )
      .catch((e) =>
        handler({
          message: e.message,
          variant: "error",
        })
      );
    await add(`users/${trade.uid}/notifications`, payNotifier);
    // Buyer Mail notification
    await send(
      uid,
      "Payment Details",
      "Payment Successfull",
      `Trade Request ID : ${trade.requestTradeId} <br/>You paid for this trade request`
    );
    // Seller Mail Notification
    await send(
      uid === trade?.tradeuid ? trade?.requestuid : trade?.tradeuid || "",
      "Payment Details",
      "Payment Recieved",
      `Trade Request ID : ${trade.requestTradeId} <br/>Payment received for this trade request`
    );
  };

  // Update payment
  const updatePayment = async (type: string, values: object) =>
    await set(
      `users/${uid}/payment_details`,
      type.replace(" ", "_").toLowerCase(),
      values
    )
      .then(() =>
        handler({
          message: "Payment Details updated successfully!",
          variant: "success",
        })
      )
      .catch((e) =>
        handler({
          message: e.message,
          variant: "error",
        })
      );

  // Connversation
  const sendMessage = async (
    newChat: p2pChat,
    tradeId: string,
    tradeUid: string,
    toUid: string
  ) => {
    if (newChat.message.trim().length || newChat.image) {
      await add(`users/${tradeUid}/p2p_trade_messages/${tradeId}/messages`, {
        ...newChat,
        uid,
      });
      await send(
        toUid,
        `New Message from P2P trade`,
        "New Message from P2P trade",
        `Trade Request ID : ${tradeId.split("_")[0]} <br/> Message : ${
          newChat.message
        }`
      );
    } else handler({ message: "Message can't be empty", variant: "error" });
  };

  return {
    payment,
    loading,
    init,
    trade,
    edit,
    cancel,
    pay,
    payemntDetials,
    updatePayment,
    sendMessage,
    tradeAccept,
    tradeConfirm,
    tradeDispute,
    tradeRequest,
    tradeRequestCancel,
  };
};
