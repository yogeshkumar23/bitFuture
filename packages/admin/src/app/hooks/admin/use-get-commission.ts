import * as Api from "src/api";

export const useGetCommission = (): CommissionModule.Return => {
  const { data: commissions, isFetching: loading } = Api.Server.useRequest(
    ["getModuleCommission"],
    "getModuleCommission"
  );
  return { commissions, loading };
};

export declare namespace CommissionModule {
  export interface Return {
    commissions: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    commissionDetails?: commissionDetail[];
  }

  export interface commissionDetail {
    typeId: string;
    commission: number;
    module: "P2P" | "SPOT";
  }
}
