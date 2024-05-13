import * as Api from "src/api";

export const useAdminUserList = (): AdminUser.Return => {
  const { data: adminUsers, isFetching: loading } = Api.Server.useRequest(
    ["adminList"],
    "getAdminList"
  );
  return { adminUsers, loading };
};

export declare namespace AdminUser {
  export interface Return {
    adminUsers: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    adminList?: User[];
  }

  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    email_verified: 0 | 1;
    uid: string;
    passwordReset_enabled: 0 | 1;
    profileImage: null;
    referalCode: string;
    enableTwoFactor: 0 | 1;
    is_Suspended: 0 | 1;
    is_Baned: 0 | 1;
  }
}
