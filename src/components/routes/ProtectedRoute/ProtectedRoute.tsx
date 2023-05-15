// @ts-nocheck
import { FC, Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material";
import {
  UnauthenticatedTemplate,
  AuthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { DashboardLayout } from "@vilocnv/allsetra-core";

import { useAppDispatch, useAppSelector } from "hooks";
import { setDrawerCollapseState } from "app/features";
import { selectIsDrawerCollapsed } from "app/data/selectors";
import { DRAWER_MENU_ITEMS, DRAWER_SUB_MENU_LISTS } from "app/data/constants";

export interface ProtectedRouteProps {
  redirectTo: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectTo }) => {
  const { pathname } = useLocation();
  const { instance } = useMsal();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isDrawerCollapsed = useAppSelector(selectIsDrawerCollapsed);

  const toggleDrawerCollapseState = () => {
    dispatch(setDrawerCollapseState(!isDrawerCollapsed));
  };

  const handleLogout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
  };

  return (
    <Fragment>
      <UnauthenticatedTemplate>
        <Navigate to={redirectTo} state={{ from: pathname }} />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <DashboardLayout
          size={"large"}
          isDrawerCollapsed={isDrawerCollapsed}
          toggleDrawerCollapseState={toggleDrawerCollapseState}
          appLogoType={"admin"}
          menuList={DRAWER_MENU_ITEMS}
          subLists={DRAWER_SUB_MENU_LISTS}
          activeLinkTextColor={theme.palette.primary.main}
          activeLinkBgColor={theme.palette.primary.light}
          onSupportClick={() => {}}
          onLogoutClick={handleLogout}
        />
      </AuthenticatedTemplate>
    </Fragment>
  );
};

export default ProtectedRoute;
