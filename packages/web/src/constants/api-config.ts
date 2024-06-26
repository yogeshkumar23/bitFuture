export const API_CONFIG = {
  // base: "/bitfuture-web/",
  base: "/web/",
  // baseURL: `${import.meta.env.VITE_API_ENCRYPTION}://${
  //   import.meta.env.VITE_API_IP
  // }:${import.meta.env.VITE_API_PORT}${
  //   import.meta.env.MODE === "production" ? "/" : "/"
  // }`,
  baseURL: `${import.meta.env.VITE_API_ENCRYPTION}://${import.meta.env.VITE_API_IP}${import.meta.env.MODE === "production" ? "/api" : "/api"}`,
  // baseURL: `${import.meta.env.VITE_API_ENCRYPTION}://${import.meta.env.VITE_API_IP}${import.meta.env.MODE === "production" ? "/bitfuture/api" : "/bitfuture/api"}`,
  bybitSocketURL: "wss://stream.bybit.com/v5/public/spot",
  // binanceSocketURL: "wss://stream.binance.com:9443/stream",
  kucoinSocketURL: `wss://ws-api-spot.kucoin.com?token=`,
  publicCoin: "https://api.coinstats.app/public/v1",
  binanceAPI: "https://api.binance.com/api/v3",
  kucoinAPI: "https://api.kucoin.com/api/v1",
  bybiyAPI: "https://api.bybit.com/v5",
  gateAPI: "https://api.gateio.ws/api/v4",
  binanceProducts:
    "https://www.binance.com/bapi/asset/v1/public/asset-service/product",
  geoLocationAPI:
    "https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location",
  blockedCountry: [] as string[],
};
