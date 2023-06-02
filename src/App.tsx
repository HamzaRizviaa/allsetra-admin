import "./App.css";
import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import UnprotectedRoute from "components/routes/UnprotectedRoute/UnprotectedRoute";
import ProtectedRoute from "components/routes/ProtectedRoute/ProtectedRoute";

// UNPROTECTED PAGES
import Auth from "pages/Auth";
import NotFound from "pages/NotFound";

// ADMIN PROTECTED PAGES
import AccountManager from "pages/admin/AccountManager";
import AccountDetails from "pages/admin/AccountManager/AccountDetails";
import ServiceManager from "pages/admin/ServiceManager";
import FieldManager from "pages/admin/FieldManager";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UnprotectedRoute redirectTo="/dashboard" />}>
        <Route index element={<Auth />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute redirectTo="/" />}>
        <Route index element={<div />} />
        <Route path="/dashboard/account-manager" element={<AccountManager />} />
        <Route
          path="/dashboard/account-manager/details"
          element={<AccountDetails />}
        />
        <Route path="/dashboard/service-manager" element={<ServiceManager />} />
        <Route path="/dashboard/field-manager" element={<FieldManager />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
