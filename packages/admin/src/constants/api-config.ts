export const API_CONFIG = {
  base: "/",
  baseURL: `${import.meta.env.VITE_API_ENCRYPTION}://${
    import.meta.env.VITE_API_IP
  }:${import.meta.env.VITE_API_PORT}${
    import.meta.env.MODE === "production" ? "/" : "/"
  }`,
  binanceSocketURL: "wss://stream.binance.com:9443/stream",
  kucoinSocketURL:
    "wss://ws-api-spot.kucoin.com?token=2neAiuYvAU61ZDXANAGAsiL4-iAExhsBXZxftpOeh_55i3Ysy2q2LEsEWU64mdzUOPusi34M_wGoSf7iNyEWJ3j1J_chrU2khPV8Q-xiuGJzThLkvpcCM9iYB9J6i9GjsxUuhPw3BlrzazF6ghq4Lx855G1AON3Is5Wv3Eavhic=.2n4Kr_DGuiqeeSkc0YC3gQ==",
  publicCoin: "https://api.coinstats.app/public/v1",
  binanceAPI: "https://api.binance.com/api/v3",
  kucoinAPI: "https://api.kucoin.com/api/v1",
  gateAPI: "https://api.gateio.ws/api/v4",
  binanceProducts:
    "https://www.binance.com/bapi/asset/v1/public/asset-service/product",
  geoLocationAPI:
    "https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location",
  blockedCountry: [] as string[],
};
