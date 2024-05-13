import * as Api from "src/api";

export const useGetReferralLink = (): UseGetReferralLink.Return => {
  const { data: referral, isFetching: loading } = Api.Server.useRequest(
    ["getReferralLink", localStorage.getItem("accessToken") || ""],
    "getReferralLink",
    { type: "ALL" }
  );

  return { referralCode: referral?.referralCode, loading };
};

export declare namespace UseGetReferralLink {
  export interface Return {
    referralCode: string;
    loading: boolean;
  }
}
