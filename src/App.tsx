import "./App.css";
import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import UnprotectedRoute from "components/routes/UnprotectedRoute/UnprotectedRoute";
import ProtectedRoute from "components/routes/ProtectedRoute/ProtectedRoute";

// UNPROTECTED PAGES
import Auth from "pages/Auth";
import NotFound from "pages/NotFound";

// PROTECTED PAGES
import Map from "pages/Map";
import AlarmDesk from "pages/AlarmDesk";

// ADMIN PROTECTED ROUTES
import AccountManager from "pages/admin/AccountManager";
import AccountDetails from "pages/admin/AccountManager/AccountDetails";
import ServiceManager from "pages/admin/ServiceManager";
import FieldManager from "pages/admin/FieldManager";
import SubscriptionManager from "pages/admin/SubscriptionManager";
import ObjectTypesManager from "pages/admin/ObjectTypesManager";
import Settings from "pages/settings";

// DEVICE TYEPS PROTECTED ROUTES
import DeviceTypes from "pages/deviceManager/DeviceTypes";
import DeviceTypeDetails from "pages/deviceManager/DeviceTypes/DeviceTypesDetails";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UnprotectedRoute redirectTo="/dashboard" />}>
        <Route index element={<Auth />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute redirectTo="/" />}>
        <Route index element={<Map />} />
        <Route path="/dashboard/alarm-desk" element={<AlarmDesk />} />

        {/* Admin Manager Routes */}
        <Route path="/dashboard/account-manager" element={<AccountManager />} />
        <Route
          path="/dashboard/account-manager/details"
          element={<AccountDetails />}
        />
        <Route
          path="/dashboard/object-types"
          element={<ObjectTypesManager />}
        />
        <Route path="/dashboard/service-manager" element={<ServiceManager />} />
        <Route
          path="/dashboard/subscription-manager"
          element={<SubscriptionManager />}
        />
        <Route path="/dashboard/field-manager" element={<FieldManager />} />

        {/* Device Manager Routes */}
        <Route path="/dashboard/device-types" element={<DeviceTypes />} />
        <Route
          path="/dashboard/device-types/details"
          element={<DeviceTypeDetails />}
        />

        <Route path="/dashboard/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
