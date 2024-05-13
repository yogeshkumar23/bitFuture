export const RIGHTS = [
  "General Updates",
  "Spot",
  "P2P",
  "NFT",
  "Users",
  "Admins",
  "KYC",
  "Referrals",
  "Tickets",
  "Transactions",
  "Wallet",
];

export const RIGHTSMENUS: { [key: string]: string[] } = {
  Spot: ["Pairs", "Trade History", "Order History", "Order Errors"],
  P2P: ["Pairs", "Order History", "Admin Revenues", "Disputes"],
  // NFT: ["collections", "Blocks"],
  Users: ["Details", "Balance"],
  Transactions: ["Deposit/Withdraw"],
};
