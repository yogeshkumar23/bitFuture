import * as Axios from "axios";
import * as Constants from "src/constants";

export const Routes: {
  [key: string]: Pick<Axios.AxiosRequestConfig, "method" | "url" | "baseURL">;
} = {
  addCoinPair: { url: "/admin/addCoinPair", method: "post" },
  addP2PCoinPair: { url: "", method: "post" },
  changePassword: { url: "/user/changePassword", method: "post" },
  checkPassword: { url: "/user/checkPassword", method: "post" },
  editProfile: { url: "/user/updateProfile", method: "post" },
  enableTwoStepVerification: {
    url: "/user/updateTwoFactorAuthentication",
    method: "post",
  },
  emailVerify: { url: "/user/verifyEmailWithoutOTP", method: "post" },
  fileUpload: { url: "/user/fileUpload", method: "post" },
  getAdminRights: { url: "/admin/getAdminRights", method: "post" },
  getAdminList: { url: "/admin/getAdminList", method: "get" },
  getCoinsPosition: { url: "/trade/getCoinsPosition", method: "get" },
  getCurrencyList: { url: "/admin/getCurrencyList", method: "get" },
  getUserKyc: { url: "/admin/getUserKyc", method: "post" },
  getP2Pcoins: { url: "/admin/getP2PcoinPair", method: "get" },
  getProfile: { url: "/user/getProfile", method: "get" },
  getUserWallet: { url: "/admin/getUserWallet", method: "post" },
  getReferredUsers: { url: "/admin/getReferredUsers", method: "post" },
  getUserTransactions: {
    url: "/admin/getUserTransactions",
    method: "get",
  },
  updateUserTransaction: {
    url: "/admin/userTransaction",
    method: "post",
  },
  getTransferredAssetList: {
    url: "/admin/getTransferredAssetList",
    method: "post",
  },
  getModuleCommission: {
    url: "/admin/getModuleCommission",
    method: "get",
  },
  getAllTrades: { url: "/admin/getAllTrades", method: "post" },
  getAllTradeErrors: {
    url: "/admin/getAllTradeErrors",
    method: "post",
  },
  login: { url: "/admin/login", method: "post" },
  regsiter: { url: "/admin/register", method: "post" },
  resetUserEmail: { url: "/user/resetPasswordMail", method: "post" },
  sendMailNotification: {
    url: "/admin/sendMailNotification",
    method: "post",
  },
  sessionHistory: { url: "/user/getSessionHistory", method: "get" },
  trade24hValues: { url: "/trade/getTrade24HourValues", method: "post" },
  tradeChart: { url: "/trade/getCoinChart", method: "post" },
  twoStepVerification: { url: "/user/sendOTPMail", method: "post" },
  getUserList: { url: "/admin/getUserList", method: "get" },
  userAction: { url: "/admin/userAction", method: "post" },
  updateTwoFactorAuthentication: {
    url: "/admin/updateTwoFactorAuthentication",
    method: "post",
  },
  updateAdminRights: { url: "/admin/updateAdminRights", method: "post" },
  updateCoinStatus: { url: "/admin/updateCoinStatus", method: "post" },
  updateP2PcoinPair: { url: "/admin/updateP2PcoinPair", method: "post" },
  updateUserKycStatus: { url: "/admin/updateUserKycStatus", method: "post" },
  updateTradeErrorOrders: {
    url: "/admin/updateTradeErrorOrders",
    method: "post",
  },
  updateUserProfile: {
    url: "/admin/updateUserProfile",
    method: "post",
  },
  verifyEmail: { url: "/user/verifyEmail", method: "post" },
  getJamesBond: {
    url: "/trade/getResponseFromUrl",
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
};

// Send Mail Request and Response
// params:{email:string,subject:string,htmlContent:string}
// response:{error:boolean,errorMessage:String}
