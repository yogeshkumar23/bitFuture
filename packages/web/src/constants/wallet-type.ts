import * as Assets from "src/assets";

export const WalletType = ["P2P Wallet", "Spot Wallet"];

export const CoinWithdrawFee = 0.02;

export const MinWithdrawAmount = 0.5;

export const PaymentType = {
  "Bank Transfer": Assets.Bank,
  UPI: Assets.UPI,
  Gpay: Assets.Gpay,
};
