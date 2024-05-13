import * as Api from "src/api";

export const useCurrency = (): UseCurrency.Return => {
  const { data: currency, isFetching: loading } = Api.Server.useRequest(
    ["currency"],
    "getCurrencyList"
  );
  return { currency, loading };
};

export declare namespace UseCurrency {
  export interface Return {
    currency: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    currencyList: currency[];
  }
    export interface currency {
    currencyId: number;
    currency_symbol: string;
    currency: string;
    currency_name: string;
    created_At: string;
  }
}
