import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import OpenRoute from "./Components/auth/OpenRoute";
import PrivateRoute from "./Components/auth/PrivateRoute";
import HandleAuth from "./Components/auth/HandleAuth"; // Import the HandleAuth component

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-slate-950 flex flex-col font-inter">
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/auth/handle"
          element={
            <OpenRoute>
              <HandleAuth />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
