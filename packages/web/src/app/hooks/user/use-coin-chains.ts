import * as Api from "src/api";

export const useCoinChains = (currency: string): UseCoinChains.Return => {
  const { data: chains, isFetching: loading } = Api.Server.useRequest(
    ["getCurrencyChains", localStorage.getItem("accessToken") || "", currency],
    "getCurrencyChains",
    {
      currency,
    }
  );
  return { chains, loading };
};

export declare namespace UseCoinChains {
  export interface Return {
    chains: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    chainList?: chainList[];
  }
  export interface chainList {
    chainName: string;
    chain: string;
    withdrawalMinSize: number;
    withdrawalMinFee: number;
    isWithdrawEnabled: boolean;
    isDepositEnabled: boolean;
    confirms: number;
    contractAddress: string;
  }
}
