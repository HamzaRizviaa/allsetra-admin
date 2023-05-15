import "./App.css";
import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import UnprotectedRoute from "components/routes/UnprotectedRoute/UnprotectedRoute";
import ProtectedRoute from "components/routes/ProtectedRoute/ProtectedRoute";

// PROTECTED PAGES
import Auth from "pages/Auth";
import NotFound from "pages/NotFound";

// UNPROTECTED PAGES

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UnprotectedRoute redirectTo="/dashboard" />}>
        <Route index element={<Auth />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute redirectTo="/" />}>
        <Route index element={<div />} />
        <Route path="/dashboard/alerts" element={<div />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
