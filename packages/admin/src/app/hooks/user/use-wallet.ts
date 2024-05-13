import React from "react";
import * as Hooks from "src/app/hooks";

export const useWallet = (amount?: boolean) => {
  const { data: coins } =
    Hooks.Firebase.useFireSnapshot<Hooks.Main.UseCoin.coin>(
      "collection",
      "coins"
    ).collectionSnapshot();
  const { CoinBalance, loading } = Hooks.User.useCoinBalance("all");
  const coinWalletDetails = React.useMemo(
    () =>
      CoinBalance?.userWallet
        ?.filter(({ type }) => (amount ? true : type === "COIN"))
        ?.map((wallet) => ({
          ...wallet,
          ...coins?.find(
            ({ coin, currency, active }) =>
              coin === wallet.typeId && Boolean(active) && currency === "USD"
          ),
        })) as unknown as coinWallet[],
    [loading, coins]
  );

  return { coinWalletDetails, loading: !Boolean(coins) || loading };
};

export type coinWallet = Hooks.Main.UseCoin.coin &
  Hooks.User.UseCoinBalance.userWallet;
