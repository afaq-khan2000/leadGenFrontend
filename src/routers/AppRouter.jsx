import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  DashboardPage,
  LoginPage,
  MyTransactions,
  SignupPage,
  UnlockedLeads,
  VerifyEmail,
} from "../pages";
import { Sidebar } from "../components/dashboard";

function AppRouter() {
  const [userRole, setUserRole] = React.useState(
    localStorage.getItem("user")?.role
  );

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("user"))?.role;
    setUserRole(userRole);
  }, [localStorage.getItem("user")]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Sidebar layout */}
        <Route path="/dashboard" element={<Sidebar />}>
          {/* User Routes */}
          {userRole === "user" && (
            <>
              <Route index element={<DashboardPage />} />
              <Route path="unlocked-leads" element={<UnlockedLeads />} />
              <Route path="my-transactions" element={<MyTransactions />} />
            </>
          )}

          {/* Admin Routes */}
          {userRole === "admin" && (
            <>
              <Route index element={<DashboardPage />} />
            </>
          )}

          {/* Redirect if no role matched */}
          {!userRole && <Route path="*" element={<Navigate to="/login" />} />}
          {userRole && (
            <Route path="*" element={<Navigate to="/dashboard" />} />
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
