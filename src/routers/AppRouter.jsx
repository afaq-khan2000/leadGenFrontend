import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage, LoginPage, SignupPage, UnlockedLeads } from "../pages";
import { Sidebar } from "../components/dashboard";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Sidebar />}>
          <Route index element={<DashboardPage />} />
          <Route path="unlocked-leads" element={<UnlockedLeads />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
