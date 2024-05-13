import * as Api from "src/api";

export const useUserList = (): UseUser.Return => {
  const { data: users, isFetching: loading } = Api.Server.useRequest(
    ["userList"],
    "getUserList"
  );
  return { users, loading };
};

export declare namespace UseUser {
  export interface Return {
    users: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    userList?: User[];
  }

  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    email_verified: 0 | 1;
    uid: string;
    passwordReset_enabled: 0 | 1;
    profileImage: null | string;
    referalCode: string;
    enableTwoFactor: 0 | 1;
    is_Suspended: 0 | 1;
    is_Baned: 0 | 1;
    signature: string | null;
    metaMaskWallet: string | null;
    wallet: userWallet[];
    referredCount: number;
  }
  export interface userWallet {
    wId: number;
    uid: string;
    type: "COIN" | "AMOUNT";
    typeId: string;
    balance: number;
    active: number;
  }
}
