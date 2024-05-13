import * as Axios from "axios";
import * as ReactQuery from "react-query";
import * as Requests from "./request-routes";
import * as Constants from "src/constants";

// API config
const formOptions = ["updateKYC", "editProfile", "fileUpload", "pinFileToIPFS"];

export const Main = ({ children }: Child) => {
  const queryClient = new ReactQuery.QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });
  return (
    <ReactQuery.QueryClientProvider client={queryClient}>
      {children}
    </ReactQuery.QueryClientProvider>
  );
};

export const Client = Axios.default.create();

const client = Axios.default.create({
  baseURL: `${Constants.API_CONFIG.baseURL}`,
});

export const Request = (
  options: string,
  data?: object,
  headers?: Record<string, string>
) => {
  const startAt = performance.now();
  if (import.meta.env.MODE === "development")
    console.info(`${options} Request`, data);
  return client({
    ...Requests.Routes[options],
    headers: {
      "Content-Type":
        formOptions.indexOf(options) > 0
          ? "multipart/form-data"
          : "application/json",
      Authorization: localStorage.getItem("accessToken") || "",
      ...headers,
    },
    data,
  })
    .then((res) => {
      import.meta.env.MODE === "development" &&
        console.info(
          `${options} Response Timing ${performance.now() - startAt}ms`,
          res.data
        );
      if (options.includes("login")) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }
      return res.data;
    })
    .catch((e) => e.response.data);
};

export const useRequest = (
  queryOptions: string[],
  options: string,
  data?: object
) => {
  return ReactQuery.useQuery(queryOptions, () => Request(options, data));
};
