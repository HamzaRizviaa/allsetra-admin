import { FC, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "app/integrations/azure/authConfig";
import { PageLoader } from "@vilocnv/allsetra-core";

const Auth: FC = () => {
  const { instance } = useMsal();

  useEffect(() => {
    instance.loginRedirect(loginRequest);
  }, []);

  return <PageLoader sx={{ width: "100dvw" }}></PageLoader>;
};

export default Auth;
