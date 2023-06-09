import axios from "axios";
import { AzureMsal } from "app/data/services";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: "json",
});

instance.interceptors.request.use(
  async function (config) {
    try {
      const accessTokenResponse = await AzureMsal.acquireToken();

      if (accessTokenResponse) {
        config.headers[
          "Authorization"
        ] = `bearer ${accessTokenResponse.idToken}`;

        config.headers["X-Subscription"] =
          process.env.REACT_APP_API_HEADER_SUBSCRIPTION;
      }
    } catch (error) {
      console.log(error);
    } finally {
      return config;
    }
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
