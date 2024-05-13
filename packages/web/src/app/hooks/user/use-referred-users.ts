import * as Api from "src/api";

export const GetReferredList = (): getReferredUsers.Return => {
  const { data: referredUsers, isFetching: loading } = Api.Server.useRequest(
    ["getReferredUsersList"],
    "getReferredUsers"
  );
  return { referredUsers, loading };
};

export declare namespace getReferredUsers {
  export interface Return {
    referredUsers: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    userLists: user[];
    parentUser: user;
  }
  export interface user {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    created_At: string;
  }
}
