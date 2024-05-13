import React from "react";
import * as Api from "src/api";

export const useAdminRights = (uid: string): UseAdminRights.Return => {
  const { data: adminRights, isFetching: loading } = Api.Server.useRequest(
    [`adminRights${uid}`],
    "getAdminRights",
    {
      uid,
    }
  );

  const permissions = React.useMemo(
    () =>
      adminRights?.adminRightsList
        ?.filter((rule: UseAdminRights.rightsList) => rule.permission === 1)
        ?.map((rule: UseAdminRights.rightsList) => rule.typeName.toLowerCase()),
    [loading]
  );

  return { adminRights, permissions, loading };
};

export declare namespace UseAdminRights {
  export interface Return {
    loading: boolean;
    adminRights: Response;
    permissions: string[];
  }

  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    adminRightsList: rightsList[];
  }

  export interface rightsList {
    apId: number;
    uid: string;
    type: string;
    typeName: string;
    permission: number;
    updatedBy: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    email_verified: number;
    address: string;
    country: string;
    state: string;
    city: string;
    postal_code: string;
    phoneNumber: string;
    password: string;
    passwordReset_enabled: number;
    profileImage: string;
    email_OTP: string;
    email_OTP_verified: string;
    referalCode: string;
    enableTwoFactor: number;
    admin: number;
    is_Suspended: number;
    is_Baned: number;
    suspend_Till: string;
    created_At: string;
    updated_At: string;
    userType: number;
  }
}
