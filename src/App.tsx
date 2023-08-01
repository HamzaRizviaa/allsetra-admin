import "./App.css";
import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "hooks";
import { postUnlockAllAlarmsThunk } from "app/features";
import UnprotectedRoute from "components/routes/UnprotectedRoute/UnprotectedRoute";
import ProtectedRoute from "components/routes/ProtectedRoute/ProtectedRoute";

// UNPROTECTED PAGES
import Auth from "pages/Auth";
import NotFound from "pages/NotFound";

// PROTECTED PAGES
import Map from "pages/Map";
import AlarmDesk from "pages/AlarmDesk";
import Devices from "pages/Devices";
import DeviceDetailts from "pages/Devices/DeviceDetailts";
import DeviceLocationHistory from "pages/Devices/DeviceLocationHistory";
import Objects from "pages/Objects";
import ObjectDetails from "pages/Objects/ObjectDetails";
import ObjectSettings from "pages/Objects/ObjectSettings";
import ObjectTripsHistory from "pages/Objects/ObjectTripsHistory";
import ObjectLocationHistory from "pages/Objects/ObjectLocationHistory";

// ADMIN PROTECTED ROUTES
import AccountManager from "pages/admin/AccountManager";
import AccountDetails from "pages/admin/AccountManager/AccountDetails";
import AccountServices from "pages/admin/AccountManager/AccountServices";
import AccountDeviceTyes from "pages/admin/AccountManager/AccountDeviceTyes";
import AccountObjectTypes from "pages/admin/AccountManager/AccountObjectTypes";
import AccountGroups from "pages/admin/AccountManager/AccountGroups";
import AccountUsers from "pages/admin/AccountManager/AccountUsers";
import AccountSubscriptions from "pages/admin/AccountManager/AccountSubscriptions";
import AccountDevices from "pages/admin/AccountManager/AccountDevices";
import AccountObjects from "pages/admin/AccountManager/AccountObjects";
import AccountAlarms from "pages/admin/AccountManager/AccountAlarms";
import AccountInstallations from "pages/admin/AccountManager/AccountInstallations";

import ServiceManager from "pages/admin/ServiceManager";
import FieldManager from "pages/admin/FieldManager";
import SubscriptionManager from "pages/admin/SubscriptionManager";
import ObjectTypesManager from "pages/admin/ObjectTypesManager";
import Settings from "pages/Settings";

// DEVICE TYEPS PROTECTED ROUTES
import DeviceTypes from "pages/deviceManager/DeviceTypes";
import DeviceTypeDetails from "pages/deviceManager/DeviceTypes/DeviceTypesDetails";


const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleTabClose = (event: any) => {
      event.preventDefault();
      dispatch(postUnlockAllAlarmsThunk());
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
      dispatch(postUnlockAllAlarmsThunk());
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<UnprotectedRoute redirectTo="/dashboard" />}>
        <Route index element={<Auth />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute redirectTo="/" />}>
        <Route index element={<Map />} />

        <Route path="/dashboard/alarm-desk" element={<AlarmDesk />} />

        {/* Devices */}
        <Route path="/dashboard/devices" element={<Devices />} />
        <Route path="/dashboard/devices/:id" element={<DeviceDetailts />} />
        <Route
          path="/dashboard/devices/:id/location-history"
          element={<DeviceLocationHistory />}
        />

        {/* Objects */}
        <Route path="/dashboard/objects" element={<Objects />} />
        <Route path="/dashboard/objects/:id" element={<ObjectDetails />} />
        <Route
          path="/dashboard/objects/:id/settings"
          element={<ObjectSettings />}
        />
        <Route
          path="/dashboard/objects/:id/trips-history"
          element={<ObjectTripsHistory />}
        />
        <Route
          path="/dashboard/objects/:id/location-history"
          element={<ObjectLocationHistory />}
        />

        {/* Admin Manager Routes */}
        <Route path="/dashboard/account-manager" element={<AccountManager />} />
        <Route
          path="/dashboard/account-manager/details/:id"
          element={<AccountDetails />}
        />
        <Route
          path="/dashboard/account-manager/services/:id"
          element={<AccountServices />}
        />
        <Route
          path="/dashboard/account-manager/device-types/:id"
          element={<AccountDeviceTyes />}
        />
        <Route
          path="/dashboard/account-manager/object-types/:id"
          element={<AccountObjectTypes />}
        />
        <Route
          path="/dashboard/account-manager/groups/:id"
          element={<AccountGroups />}
        />
        <Route
          path="/dashboard/account-manager/users/:id"
          element={<AccountUsers />}
        />
        <Route
          path="/dashboard/account-manager/subscriptions/:id"
          element={<AccountSubscriptions />}
        />
        <Route
          path="/dashboard/account-manager/devices/:id"
          element={<AccountDevices />}
        />
        <Route
          path="/dashboard/account-manager/objects/:id"
          element={<AccountObjects />}
        />
        <Route
          path="/dashboard/account-manager/alarms/:id"
          element={<AccountAlarms />}
        />
        <Route
          path="/dashboard/account-manager/installations/:id"
          element={<AccountInstallations />}
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
