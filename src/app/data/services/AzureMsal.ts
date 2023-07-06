import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { msalInstance } from "index";

class AzureMsal {
  static acquireToken = async () => {
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

    try {
      const accessTokenResponse = await msalInstance.acquireTokenSilent(
        accessTokenRequest
      );
      return accessTokenResponse;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        msalInstance.acquireTokenRedirect(accessTokenRequest);
      }
      console.log(error);
    }
  };
}

export default AzureMsal;
