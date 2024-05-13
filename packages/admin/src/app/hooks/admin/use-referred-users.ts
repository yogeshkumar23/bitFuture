import * as Api from "src/api";

export const useReferredUserList = (uid?: string): referrals.Return => {
  const { data: referredUsers, isFetching: loading } = Api.Server.useRequest(
    ["getReferredUsers"],
    "getReferredUsers",
    { uid: uid || "all" }
  );

  return { referredUsers, loading };
};

export declare namespace referrals {
  export interface Return {
    referredUsers: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    userLists?: User[];
  }

  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    uid: string;
    referredUsers: Referrals[];
  }

  export interface Referrals {
    firstName: string;
    lastName: string;
    email: string;
    uid: string;
    referralBonus: number;
  }
}
