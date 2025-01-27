import ProtectedRoute from "../components/layout/Protected";
import Layout from "../components/layout/Layout";
import { RoutesPath, UIRoutesType } from "./routes-path";
import { Navigate, Route, Routes } from "react-router-dom";
import { JSX } from "react";

/**
 * Automatically generated from the routes defined in the routes folder.
 * @returns {JSX.Element}
 */
export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path={RoutesPath.login.path}
        element={<RoutesPath.login.component />}
      />
      <Route
        path={RoutesPath.register.path}
        element={<RoutesPath.register.component />}
      />
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {Object.entries(RoutesPath).map(([key, route]) => {
            const typedRoute = route as UIRoutesType;
            if (
              typedRoute.path === "/" ||
              typedRoute.path === "/register"
            ) {
              // Skip already handled public route
              return null;
            }
            return (
              <Route
                key={key}
                path={typedRoute.path}
                element={<typedRoute.component />}
              />
            );
          })}
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
