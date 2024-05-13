import * as Api from "src/api";

export const useUserKycList = () => {
  const { data: userKYCList, isFetching: loading } = Api.Server.useRequest(
    ["userKYC"],
    "getUserKyc",
    { uid: "all" }
  );
  return { userKYCList, loading };
};

export declare namespace useUserKyc {
  export interface Return {
    userKYCList: Response;
    loading: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    userKycList: kyc[];
  }
  export interface kyc {
    ukycId: number;
    uid: string;
    email: string;
    primaryPhoneNumber: string;
    phoneNumber: string;
    phoneNumber_verified: number;
    secondaryPhoneNumber: string;
    documentType: string;
    documentNumber: string;
    documentPhotoFront: string;
    documentPhotoBack: string;
    userPicture: string;
    addressDocumentType: string;
    addressProofPhoto: string;
    idProof_verified: number;
    addressProof_verified: number;
    firstName: string;
    lastName: string;
    email_verified: number;
    address: string;
    country: string;
    state: string;
    city: string;
    postal_code: string;
    password: string;
    passwordReset_enabled: number;
    profileImage: string;
    email_OTP: number;
    email_OTP_verified: number;
    referalCode: string;
    enableTwoFactor: number;
    admin: number;
    is_Suspended: number;
    is_Baned: number;
    suspend_Till: string;
    created_At: string;
    updated_At: string;
    userType: number;
    isResubmitted: number;
    reason: string;
  }
}
