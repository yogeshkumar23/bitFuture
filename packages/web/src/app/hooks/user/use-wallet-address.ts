import * as Api from "src/api";
import * as Hooks from "src/app/hooks";

export const useWalletAddress = (
  coinId: string,
  type: "COIN" | "AMOUNT"
): coinWalletAddress => {
  const { data: walletDetail, isFetching: loading } = Api.Server.useRequest(
    ["getWalletAddress", localStorage.getItem("accessToken") || "", coinId],
    "getWalletAddress",
    { coinId, type }
  );

  return { walletDetail, loading };
};

export interface coinWalletAddress {
  walletDetail: { userWallet: Hooks.User.UseCoinBalance.userWallet[] };
  loading?: boolean;
}
