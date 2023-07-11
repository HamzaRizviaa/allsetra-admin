// @ts-nocheck
import { FC, Fragment, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material";
import {
  UnauthenticatedTemplate,
  AuthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { DashboardLayout } from "@vilocnv/allsetra-core";

// DATA
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector, useSignalR } from "hooks";
import {
  getAllLanguagesThunk,
  getSpecificSettingThunk,
  setDrawerCollapseState,
} from "app/features";
import { selectIsDrawerCollapsed } from "app/data/selectors";
import { getDrawerMenuItems, getDrawerSubMenuLists } from "app/data/constants";

export interface ProtectedRouteProps {
  redirectTo: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectTo }) => {
  const { pathname } = useLocation();
  const { instance } = useMsal();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isDrawerCollapsed = useAppSelector(selectIsDrawerCollapsed);

  useSignalR();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllLanguagesThunk());
    dispatch(getSpecificSettingThunk());
  }, []);

  const toggleDrawerCollapseState = () => {
    dispatch(setDrawerCollapseState(!isDrawerCollapsed));
  };

  const handleLogout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
  };

  const { drawerMenuItems, drawerSubMenuLists } = {
    drawerMenuItems: getDrawerMenuItems(t),
    drawerSubMenuLists: getDrawerSubMenuLists(),
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
          menuList={drawerMenuItems}
          subLists={drawerSubMenuLists}
          activeLinkTextColor={theme.palette.primary.light}
          activeLinkBgColor={theme.palette.primary.dark}
          onSupportClick={() => {}}
          onLogoutClick={handleLogout}
        />
      </AuthenticatedTemplate>
    </Fragment>
  );
};

export default ProtectedRoute;
