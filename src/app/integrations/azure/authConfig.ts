import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID || "", // This is the ONLY mandatory field; everything else is optional.
    authority: process.env.REACT_APP_AZURE_SIGNUP_SIGNIN_AUTHORITY || "", // Choose sign-up/sign-in user-flow as your default.
    knownAuthorities: [process.env.REACT_APP_AZURE_AUTHORITY_DOMAIN || ""], // You must identify your tenant's domain as a known authority.
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "offline_access",
    "https://graph.microsoft.com/.default",
  ],
};
