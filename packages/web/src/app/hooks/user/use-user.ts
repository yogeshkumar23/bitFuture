import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import * as Api from "src/api";
import * as Constants from "src/constants";

export const useUser = (state = false): UseUser.Return => {
  const [country, setCountry] = React.useState("");
  const { data: user, isFetching: loading } = Api.Server.useRequest(
    [
      "getProfile",
      localStorage.getItem("accessToken") || "",
      state as unknown as string,
    ],
    "getProfile"
  );

  React.useEffect(() => {
    Api.Server.Client.get(Constants.API_CONFIG.geoLocationAPI).then((res) =>
      setCountry(res.data.country)
    );
  }, []);

  return { user, country, loading };
};

export declare namespace UseUser {
  export interface Return {
    user: Response;
    country: string;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    userDetails?: User;
  }

  export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    email_verified: string;
    uid: string;
    address: null;
    country: null;
    state: null;
    city: null;
    postal_code: null;
    phoneNumber: string;
    passwordReset_enabled: 0 | 1;
    profileImage: null | string;
    email_OTP: null | number;
    email_OTP_verified: 0 | 1;
    referalCode: string;
    enableTwoFactor: 0 | 1;
    admin: 0 | 1;
    is_Suspended: 0 | 1;
    is_Baned: 0 | 1;
    suspend_Till: null | string;
    created_At: string;
    createdTime: FirebaseFirestore.Timestamp;
    updated_At: null | string;
    signature: string;
    metaMaskWallet: string;
    detected_country?: string;
  }
}
