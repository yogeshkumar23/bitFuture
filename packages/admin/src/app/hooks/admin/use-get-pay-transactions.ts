import React from "react";
import * as Api from "src/api";

export const usePayTransactions = (): usePayTransactions.Return => {
  const [pageNo, setPageNo] = React.useState(1);
  const { data: payTransactions } = Api.Server.useRequest(
    ["getTransferredAssetList", localStorage.getItem("accessToken") || "", pageNo.toString()],
    "getTransferredAssetList",
    {
      pageNo,
      limit: 10,
    }
  );

  const handlePayPageNo = (number: number) => setPageNo(number);

  return {
    payTransactions,
    loading: Boolean(payTransactions?.length),
    payPageNo: pageNo,
    handlePayPageNo,
  };
};

export declare namespace usePayTransactions {
  export interface Return {
    payTransactions: Response;
    loading: boolean;
    payPageNo: number;
    handlePayPageNo: (number: number) => void;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    totalListCount: number;
    transferList: transaction[];
  }

  export interface transaction {
    utbId: number;
    transferId: string;
    senderUid: string;
    receiverUid: string;
    type: string;
    typeId: string;
    status: "pending" | "failed" | "completed";
    senderWalletId: string;
    receiverWalletId: string;
    transferOTP: number;
    otpVerified: 0 | 1;
    description: string;
    createdAt: string;
    updatedAt: string;
    quantity: number;
    message: string;
    senderFirstName: string;
    senderLastName: string;
    senderEmail: string;
    receiverFirstName: string;
    receiverLastName: string;
    receiverEmail: string;
  }
}
