import axios from "axios";
import { msalInstance } from "index";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: "json",
});

instance.interceptors.request.use(
  async function (config) {
    const account = msalInstance.getAllAccounts()[0];

    const accessTokenRequest = {
      scopes: [
        "openid",
        "profile",
        "offline_access",
        "https://graph.microsoft.com/.default",
      ],
      account: account,
    };

    const accessTokenResponse = await msalInstance.acquireTokenSilent(
      accessTokenRequest
    );

    config.headers["Authorization"] = `bearer ${accessTokenResponse.idToken}`;

    config.headers["X-Subscription"] =
      process.env.REACT_APP_API_HEADER_SUBSCRIPTION;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
