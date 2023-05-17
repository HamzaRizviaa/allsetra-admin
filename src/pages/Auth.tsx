import { FC, Fragment } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "app/integrations/azure/authConfig";

const Auth: FC = () => {
  const { instance, accounts } = useMsal();

  return (
    <Fragment>
      <UnauthenticatedTemplate>
        <div className="App">
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <button onClick={() => instance.loginRedirect(loginRequest)}>
              Login
            </button>
          </header>
        </div>
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        <div className="App">
          <header className="App-header">
            <p>Hello {accounts[0]?.name}!</p>

            <button
              onClick={() =>
                instance.logoutRedirect({ postLogoutRedirectUri: "/" })
              }
            >
              Logout
            </button>
          </header>
        </div>
      </AuthenticatedTemplate>
    </Fragment>
  );
};

export default Auth;
