import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  redirectPath?: string;
};

export const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = "/login",
}: ProtectedRouteProps) =>
  isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
