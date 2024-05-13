import React from "react";
import * as Api from "src/api";

export const usePayTransactions = (): usePayTransactions.Return => {
  const [pageNo, setPageNo] = React.useState(1);
  const { data: payTransactions, isFetching: loading } = Api.Server.useRequest(
    ["transferList", localStorage.getItem("accessToken") || "", pageNo.toString()],
    "transferList",
    {
      pageNo,
      limit: 10,
    }
  );

  const handlePayPageNo = (number: number) => setPageNo(number);

  return {
    payTransactions,
    loading,
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
    totalListCount: number;
    transferList: transaction[];
  }

  export interface transaction {
    createdAt: string;
    utbId: number;
    transferId: string;
    senderUid: string;
    receiverUid: string;
    type: string;
    typeId: string;
    status: "completed" | "failed" | "pending";
    message: string;
    quantity: number;
    firstName: string;
    lastName: string;
    email: string;
  }
}
