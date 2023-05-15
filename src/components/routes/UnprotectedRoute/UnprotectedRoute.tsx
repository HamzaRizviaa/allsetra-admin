import { FC, Fragment } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  UnauthenticatedTemplate,
  AuthenticatedTemplate,
} from "@azure/msal-react";

export interface UnprotectedRouteProps {
  redirectTo: string;
}

const UnprotectedRoute: FC<UnprotectedRouteProps> = ({ redirectTo }) => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <UnauthenticatedTemplate>
        <Outlet />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Navigate to={redirectTo} state={{ from: pathname }} />
      </AuthenticatedTemplate>
    </Fragment>
  );
};

export default UnprotectedRoute;
