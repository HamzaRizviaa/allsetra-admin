import "./App.css";
import { FC } from "react";
import { createSignalRContext } from "react-signalr";
import { Routes, Route } from "react-router-dom";
import UnprotectedRoute from "components/routes/UnprotectedRoute/UnprotectedRoute";
import ProtectedRoute from "components/routes/ProtectedRoute/ProtectedRoute";
import { useAppSelector } from "hooks";
import { selectActiveUserDetails } from "app/data/selectors";

// UNPROTECTED PAGES
import Auth from "pages/Auth";
import NotFound from "pages/NotFound";

// ADMIN PROTECTED PAGES
import Map from "pages/Map";
import AccountManager from "pages/admin/AccountManager";
import AccountDetails from "pages/admin/AccountManager/AccountDetails";
import ServiceManager from "pages/admin/ServiceManager";
import FieldManager from "pages/admin/FieldManager";
import SubscriptionManager from "pages/admin/SubscriptionManager";
import ObjectTypesManager from "pages/admin/ObjectTypesManager";

const { useSignalREffect, Provider } = createSignalRContext();

const App: FC = () => {
  const { idToken, userEmail } = useAppSelector(selectActiveUserDetails);

  return (
    <Provider
      connectEnabled={!!idToken}
      accessTokenFactory={() => idToken || ""}
      dependencies={[idToken]}
      url={`${process.env.REACT_APP_API_BASE_URL}/?source=adminportal&user=${userEmail}&X-Subscription=${process.env.REACT_APP_API_HEADER_SUBSCRIPTION}`}
    >
      <Routes>
        <Route path="/" element={<UnprotectedRoute redirectTo="/dashboard" />}>
          <Route index element={<Auth />} />
        </Route>

        <Route path="/dashboard" element={<ProtectedRoute redirectTo="/" />}>
          <Route index element={<div />} />
          <Route
            path="/dashboard/account-manager"
            element={<AccountManager />}
          />
          <Route
            path="/dashboard/account-manager/details"
            element={<AccountDetails />}
          />
          <Route
            path="/dashboard/service-manager"
            element={<ServiceManager />}
          />
          <Route path="/dashboard/field-manager" element={<FieldManager />} />
          <Route
            path="/dashboard/object-types"
            element={<ObjectTypesManager />}
          />
          <Route
            path="/dashboard/subscription-manager"
            element={<SubscriptionManager />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
};

export default App;
