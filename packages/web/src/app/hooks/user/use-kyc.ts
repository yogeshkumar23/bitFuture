import * as Api from "src/api";

export const useUserKYC = (state: boolean): UseUserKYC.Return => {
  const { data: userKYC, isFetching: loading } = Api.Server.useRequest(
    ["userKYC", state as unknown as string],
    "getKYC"
  );
  return {
    userKYC,
    loading,
    verified: Boolean(
      userKYC?.userKyc?.idProof_verified &&
        userKYC?.userKyc?.addressProof_verified
    ),
  };
};

export declare namespace UseUserKYC {
  export interface Return {
    userKYC: Response;
    loading: boolean;
    verified: boolean;
  }
  export interface Response {
    error: boolean;
    message: string;
    errorCode: string;
    userKyc?: User;
  }

  export interface User {
    ukycId?: number;
    uid?: string;
    email: string;
    primaryPhoneNumber: string;
    phoneNumber_verified?: number;
    secondaryPhoneNumber: string;
    documentType: string;
    documentNumber: string;
    documentPhotoFront: string;
    documentPhotoBack: string;
    userPicture: string;
    addressDocumentType: string;
    addressProofPhoto: string;
    idProof_verified?: number;
    addressProof_verified?: number;
    isResubmitted?: number;
    reason?: string;
  }
}
