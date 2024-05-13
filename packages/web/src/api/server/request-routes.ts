import * as Axios from "axios";
import * as Constants from "src/constants";

export const Routes: {
  [key: string]: Pick<Axios.AxiosRequestConfig, "method" | "url" | "baseURL">;
} = {
  binanceRecentTrade: { url: "/trades", method: "get" },
  changePassword: { url: "/user/changePassword", method: "post" },
  cancelTrade: { url: "/trade/cancelTrade", method: "post" },
  cancelTradeV2: { url: "/trade/cancelTradeV2", method: "post" },
  checkPassword: { url: "/user/checkPassword", method: "post" },
  checkReferralCode: {
    url: "/user/checkReferralCode",
    method: "post",
  },
  cryptoPayout: {
    url: "/user/cryptoPayout",
    method: "post",
  },
  checkEmail: {
    url: "/user/checkEmail",
    method: "post",
  },
  editProfile: { url: "/user/updateProfile", method: "post" },
  enableTwoStepVerification: {
    url: "/user/updateTwoFactorAuthentication",
    method: "post",
  },
  emailVerify: { url: "/user/verifyEmailWithoutOTP", method: "post" },
  fileUpload: { url: "/user/fileUpload", method: "post" },
  getAllTrades: { url: "/trade/getRecentTrades", method: "post" },
  getCoinsPosition: { url: "/trade/getCoinsPosition", method: "get" },
  getCurrencyChains: { url: "/trade/getCurrencyChains", method: "post" },
  getKYC: { url: "/user/getKYC", method: "get" },
  getOrderType: { url: "/trade/getOrderType", method: "get" },
  getP2Pcoins: { url: "/trade/getP2PcoinPairs", method: "get" },
  getProfile: { url: "/user/getProfile", method: "get" },
  getReferralLink: { url: "/user/getReferralLink", method: "post" },
  getReferredUsers: { url: "/user/getReferredUsers", method: "get" },
  getWallet: { url: "/user/getWallet", method: "post" },
  getWalletAddress: { url: "/user/getWalletAddress", method: "post" },
  getUserTransactions: {
    url: "/user/getUserTransactions",
    method: "get",
  },
  regsiter: { url: "/user/register", method: "post" },
  login: { url: "/user/login", method: "post" },
  resetUserEmail: { url: "/user/resetPasswordMail", method: "post" },
  resendVerificationEmail: {
    url: "/user/resendVerificationEmail",
    method: "post",
  },
  sendMailNotification: {
    url: "/user/sendEmailNotification",
    method: "post",
  },
  sessionHistory: { url: "/user/getSessionHistory", method: "get" },
  placeOrder: {
    url: "/trade/placeOrder",
    method: "post",
  },
  placeOrderV2: {
    url: "/trade/placeOrderV2",
    method: "post",
  },
  trade24hValues: { url: "/trade/getTrade24HourValues", method: "post" },
  tradeChart: { url: "/trade/getCoinChart", method: "post" },
  twoStepVerification: { url: "/user/sendOTPMail", method: "post" },
  updateKYC: { url: "/user/updateKYC", method: "post" },
  verifyEmail: { url: "/user/verifyEmail", method: "post" },
  getJamesBond: {
    url: "/trade/getResponseFromUrl",
    method: "post",
  },
  checkKyc: {
    url: "/user/checkKyc",
    method: "post",
  },
  // Pinata Uplaod
  pinList: {
    baseURL: Constants.NFT.PINATA_baseURL,
    url: "/data/pinList",
    method: "get",
  },
  pinFileToIPFS: {
    baseURL: Constants.NFT.PINATA_baseURL,
    url: "/pinning/pinFileToIPFS",
    method: "post",
  },
  pinJSONToIPFS: {
    baseURL: Constants.NFT.PINATA_baseURL,
    url: "/pinning/pinJSONToIPFS",
    method: "post",
  },
  transferAsset: {
    url: "/user/wallet/asset/transfer",
    method: "POST",
  },
  verifyTransfer: {
    url: "/user/wallet/asset/verifyTransfer",
    method: "POST",
  },
  transferList: {
    url: "/user/wallet/asset/transferList",
    method: "POST",
  },
  resendTransferOTP: {
    url: "/user/wallet/asset/resendTransferOTP",
    method: "POST",
  },
};

// Send Mail Request and Response
// params:{email:string,subject:string,htmlContent:string}
// response:{error:boolean,errorMessage:String}
