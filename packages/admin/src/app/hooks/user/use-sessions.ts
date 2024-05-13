import * as Api from "src/api";

export const useSession = (): UseSession.Return => {
  const { data: sessions, isFetching: loading } = Api.Server.useRequest(
    ["sessionHistory", localStorage.getItem("accessToken") || ""],
    "sessionHistory"
  );
  return { sessions, loading };
};

export declare namespace UseSession {
  export interface Return {
    sessions: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    userDetails?: UserSession[];
  }
  export interface UserSession {
    ush_id: number;
    uid: string;
    device: string;
    OS: string;
    ipAddress: string;
    status: string;
    isActiveNow: number;
    description: string;
    created_At: string;
  }
}
