import * as Api from "src/api";

export const useCryptoDetail = (
  withdrawOrderId: string
): cryptoDetails.Return => {
  const { data: detail, isFetching: loading } = Api.Server.useRequest(
    ["getCryptoWithdrawDetails", localStorage.getItem("accessToken") || "", withdrawOrderId],
    "getCryptoWithdrawDetails",
    { withdrawOrderId }
  );

  return { detail, loading };
};

export declare namespace cryptoDetails {
  export interface Return {
    detail: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    orderDetails: info[];
  }
  export interface info {
    email: string;
    name: string;
  }
}
