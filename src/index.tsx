import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "app/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "app/theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toast } from "@vilocnv/allsetra-core";
import { setIdToken, setUserEmail } from "app/features";
import "app/integrations/i18n/index";

// Azure AD B2C
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "app/integrations/azure/authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    store.dispatch(setIdToken(payload.idToken));
    store.dispatch(setUserEmail(payload.account?.username || null));
    msalInstance.setActiveAccount(account);
  }
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback="Suspense fallback loading...">
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <MsalProvider instance={msalInstance}>
                <App />
              </MsalProvider>
            </ThemeProvider>
            <Toast />
          </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
