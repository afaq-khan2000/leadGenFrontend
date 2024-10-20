import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  AdminDashboardPage,
  DashboardPage,
  LoginPage,
  MyTransactions,
  SignupPage,
  UnlockedLeads,
  VerifyEmail,
} from "../pages";
import { Sidebar } from "../components/dashboard";

// Helper component to handle authentication
const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? element : <Navigate to="/login" replace />;
};

// Helper component to handle role-based access
const RoleBasedRoute = ({ element, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" replace />;
  return allowedRoles.includes(user.role) ? (
    element
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

function AppRouter() {
  const [userRole, setUserRole] = useState(null);
  const location = useLocation(); // Tracks the current route

  // Effect to update userRole based on localStorage or when location changes (i.e., route changes)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserRole(user.role);
    } else {
      setUserRole(null); // Clear the role on logout
    }
  }, [location]); // Re-run effect on route change

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<Sidebar />} />}>
        {/* Role-based Dashboard Rendering */}
        <Route
          index
          element={
            <RoleBasedRoute
              element={
                userRole === "admin" ? (
                  <AdminDashboardPage />
                ) : (
                  <DashboardPage />
                )
              }
              allowedRoles={["user", "admin"]}
            />
          }
        />
        {/* User-specific Routes */}
        <Route
          path="unlocked-leads"
          element={
            <RoleBasedRoute
              element={<UnlockedLeads />}
              allowedRoles={["user"]}
            />
          }
        />
        <Route
          path="my-transactions"
          element={
            <RoleBasedRoute
              element={<MyTransactions />}
              allowedRoles={["user"]}
            />
          }
        />
      </Route>

      {/* Fallback for undefined routes */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}
