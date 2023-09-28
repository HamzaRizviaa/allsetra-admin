import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { msalInstance } from "index";

class AzureMsal {
  static acquireToken = async () => {
    const account = msalInstance.getAllAccounts()[0];
    const redirectUri = window.location.origin + "/dashboard";

    const accessTokenRequest = {
      scopes: [
        "openid",
        "profile",
        "offline_access",
        "https://graph.microsoft.com/.default",
      ],
      account: account,
      redirectUri,
    };

    try {
      const accessTokenResponse = await msalInstance.acquireTokenSilent(
        accessTokenRequest
      );
      return accessTokenResponse;
    } catch (error) {
      console.log(error);

      if (error instanceof InteractionRequiredAuthError) {
        return msalInstance.acquireTokenRedirect(accessTokenRequest);
      }
    }
  };
}

export default AzureMsal;
