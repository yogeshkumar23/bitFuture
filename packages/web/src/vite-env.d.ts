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
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly VITE_CONTRACT_LOCAL: string;
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
  coin: string;
  coinPair: string;
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
  status:
    | "pending"
    | "cancelled"
    | "partiallyCompleted"
    | "completed"
    | "done"
    | "open";
  tradeId: string;
  tradedCoins: number;
  uid: string;
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
  enteredQuantityAsset: string;
  tradeCommissionAsset: string;
  baseAsset: string;
  quoteAsset: string;
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
  enteredQuantity: number;
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
    requestuid?: string;
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
    | "partiallyPending"
    | "confirm"
    | "confirmed"
    | "dispute"
    | "declined"
    | "ongoing"
    | "cancelled"
    | "completed";
  tradeId?: string;
  tradedCoins?: number;
  uid: string;
  userName: string;
  profileImg: string;
  email: string;
  phoneNo: string;
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
  userProfile?: string;
  requestUname?: string;
  requestUserProfile?: string;
  status?: string;
  dispute?: boolean;
  uid?: string;
  coin: string;
  currency: string;
  requestUserName: string;
  requestProfileImg: string;
}

// Payment details
interface paymentDetails {
  paymentType: string;
  account_no: number | null;
  account_name: string;
  bank_address: string;
  ifsc_code: string;
  routing_number: string;
  sort_code: string;
  mobile_no: string;
  // gpayUpiId: string;
  upi_id: string;
  name: string;
  cash_tag_id: string;
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

// Binance Web Socket Individual Symbol ticker
interface individualTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  p: number; // Price change
  P: number; // Price change percent
  w: number; // Weighted average price
  x: number; // First trade(F)-1 price (first trade before the 24hr rolling window)
  c: number; // Last price
  Q: number; // Last quantity
  b: number; // Best bid price
  B: number; // Best bid quantity
  a: number; // Best ask price
  A: number; // Best ask quantity
  o: number; // Open price
  h: number; // High price
  l: number; // Low price
  v: number; // Total traded base asset volume
  q: number; // Total traded quote asset volume
  O: number; // Statistics open time
  C: number; // Statistics close time
  F: number; // First trade ID
  L: number; // Last trade Id
  n: number; // Total number of trades
}

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

interface p2p_review {
  id: string;
  comment: string;
  rating: number;
  username: string;
  profile: string;
  time: number;
  uid: string;
}
