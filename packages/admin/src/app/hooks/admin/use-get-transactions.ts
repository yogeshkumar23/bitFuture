import * as Api from "src/api";

export const useTransactions = (): useTransactions.Return => {
  const { data: transactions, isFetching: loading } = Api.Server.useRequest(
    ["getUserTransactions", localStorage.getItem("accessToken") || ""],
    "getUserTransactions"
  );

  return { transactions, loading };
};

export declare namespace useTransactions {
  export interface Return {
    transactions: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    transactions: transaction[];
  }

  export interface transaction {
    transactionId: string;
    address: string;
    uid: string;
    amount: number;
    currency: string;
    type: "DEPOSIT" | "TRANSFER";
    status: "completed" | "pending" | "failed";
    createdAt: string;
    hash: string;
    accountId: string;
    transaction_created_at: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}


// import * as Api from "src/api";

// export const useTransactions = (
//   type: "WITHDRAW" | "DEPOSIT"
// ): useTransactions.Return => {
//   const { data: transactions, isFetching: loading } = Api.Server.useRequest(
//     ["getUserTransactions", localStorage.getItem("accessToken") || "", type],
//     "getUserTransactions"
//     // {
//     //   url: `/admin/getUserTransactions?type=${type}`,
//     //   method: "get",
//     // }
//     // `${{
//     //   url: `/admin/getUserTransactions?type=${type}`,
//     //   method: "get",
//     // }}`
//   );

//   return { transactions, loading };
// };

// export declare namespace useTransactions {
//   export interface Return {
//     transactions: Response;
//     loading: boolean;
//   }
//   export interface Response {
//     error: boolean;
//     message: string;
//     errorCode: string;
//     transactions: transaction[];
//   }

//   export interface transaction {
//     transactionId: string;
//     address: string;
//     uid: string;
//     amount: number;
//     currency: string;
//     type: "DEPOSIT" | "WITHDRAW";
//     status: "completed" | "pending" | "failed";
//     createdAt: string;
//     hash: string;
//     accountId: string;
//     transaction_created_at: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//   }
// }
