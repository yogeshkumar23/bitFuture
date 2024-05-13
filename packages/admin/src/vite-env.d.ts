/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_API_ENCRYPTION: string;
  readonly VITE_API_IP: string;
  readonly VITE_API_PORT: string;
  readonly VITE_ASSETS_PATH: string;
  readonly VITE_ALCHEMY_API_URL: string;
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly VITE_PINATA_API_KEY: string;
  readonly VITE_PINATA_SECRET: string;
  readonly VITE_PINATA_JWT: string;
  readonly VITE_ALCHEMY_API_URL_TEST: string;
  readonly VITE_CHAIN_ID: string;
  readonly VITE_RPC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type color =
  | "inherit"
  | "error"
  | "disabled"
  | "action"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | undefined;

// Children
interface Child {
  children: React.ReactNode;
}

interface children {
  children: React.ReactNode;
}

// Trade Object
interface trade {
  coinId: string;
  commission: number;
  filledPrice?: number;
  limitPrice?: number;
  stopPrice?: number;
  noOfCoins: number;
  orderCancelled?: boolean;
  orderType: 1 | 2 | 3 | 4 | 5 | 6;
  orderPlacedTime: number;
  uid: string;
}

// trade book
interface tradeBook {
  coinId: string;
  coin: string;
  commission: number;
  commisionAmount: number;
  currency: string;
  description: string;
  marketPrice?: number;
  filledPrice?: number;
  limitPrice?: number;
  stopPrice?: number;
  noOfCoins: number;
  orderAmount: number;
  orderCancelledTime: number | null;
  orderExecutedTime: number | null;
  orderPlacedTime: number;
  orderTotalAmount: number;
  orderType: 1 | 2 | 3 | 4 | 5 | 6;
  status: "pending" | "cancelled" | "partiallyCompleted" | "completed";
  tradeId: string;
  tradedCoins: number;
  uid: string;
  quoteAsset: string;
  baseAsset: string;
}
// Binance trade book
interface allOrder {
  tradeId: string;
  orderId: string;
  uid: string;
  coin: string;
  status: string;
  filledPrice: number;
  amount: number;
  noOfCoins: number;
  walletAddress: string;
  orderTypeId: number;
  commission: number;
  commissionAsset: string;
  noOfCoinsAsset: string;
  enteredQuantity: number;
  enteredQuantityAsset: string;
  tradeCommissionAsset: string;
  feePercent: number;
  fee: number;
  orderFilled: string;
  coveringTrade: 0 | 1;
  limitPrice: number;
  stopPrice: number;
  transactionTime: number;
  clientOrderId: string;
  cummulativeQuoteQty: number;
  placedAt: string;
  updatedAt: string;
}

// Notification collection
interface notification {
  id?: string;
  ipAddress?: string;
  title?: string;
  attributes?: {
    coin?: string;
    currency?: string;
    coinId?: string;
    tradeId?: string;
    uid?: string;
    status?: "pending" | "cancelled" | "partiallyCompleted" | "completed";
  };
  createdTime: number;
  is_Read: boolean;
  message: string;
  topic: string;
}

interface generalNotification {
  id?: string;
  title: string;
  text: string;
  image: string;
  author: string;
  category: string;
  topic: string;
  tags: string;
  createdTime: number;
  preview?: boolean;
  hideMore?: boolean;
  is_Read: boolean;
  minimum?: boolean;
}

interface tickets {
  id?: string;
  createdTime: number;
  status: "pending" | "closed";
  subject: string;
  message: string;
  metamask?: boolean;
  uid?: string;
}

interface chat {
  id?: string;
  type: "user" | "admin";
  message: string;
  time: number;
  image?: string | undefined;
  ticketId?: string;
  uid?: string;
}

interface p2pChat {
  id?: string;
  message: string;
  time: number;
  image?: string | undefined;
  uid?: string;
  admin?: boolean;
  profile?: string;
}

// P2P trade
interface p2pTrade {
  active?: 0 | 1;
  coin: string;
  coinMarketPrice: number;
  currency: string;
  confirmedAt?: number;
  declinedAt?: number;
  disputeRaisedUid?: string;
  disputedTime?: number;
  noOfCoins: number;
  orderPlacedTime: number;
  orderType: "sell" | "buy";
  prefferedPayment: string;
  quantityLimitFrom: number;
  quantityLimitTo: number;
  priceLimitFrom: number;
  priceLimitTo: number;
  pricePerCoin: number;
  showPostTill: number;
  status:
    | "pending"
    | "confirm"
    | "confirmed"
    | "dispute"
    | "declined"
    | "cancelled"
    | "completed";
  tradeId?: string;
  tradedCoins?: number;
  uid: string;
}

// P2P trade request
interface p2pTradeRequest {
  requestTradeId: string;
  requestuid: string;
  requestPrice: number;
  requestCoins: number;
  requestPlacedTime: number;
  requestStatus: string;
  tradeuid: string;
  username?: string;
  usermail?: string;
  userProfile?: string;
  requestUname?: string;
  requestmail: string;
  requestUserProfile?: string;
  status?: string;
  dispute?: boolean;
}

// Payment details
interface paymentDetails {
  accountNo: number;
  accountType: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  mobileNo: number;
  gpayUpiId: string;
  upiId: string;
}

// Ethereum

interface Window {
  ethereum: {
    request<T>(params: { method: string }): Promise<T>;
    on<T>(event: string, cb: (params: T) => void): void;
    removeListener<T>(event: string, cb: (params: T) => void): void;
    selectedAddress: string | undefined;
  };
  accessToken: string;
}

// NFT
interface nft {
  price: string;
  tokenId: any;
  tokenURI: string;
  owner: string;
  sale: boolean;
  metadata: { name: string; description: string };
  contract: string;
  isApproved: boolean;
  isAuction: boolean;
  isAuctionDuration: number;
  highestBid: string;
  highestBidder: string;
  bidders?: { price: string; address: string }[];
}

// NFT Logs
interface logger {
  time: number;
  contract: string;
  tokenId: string;
  logType: string;
  from: string;
  to: string;
  price: string;
  fee: string;
  enteredQuantity: string;
}

// Geo location
interface geoLocation {
  country: string;
  state: string;
  stateName: string;
  zipcode: number;
  timezone: string;
  latitude: number;
  longitude: number;
  city: string;
  continent: string;
}
