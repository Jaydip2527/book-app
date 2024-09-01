import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
  const isToken = localStorage.getItem("token");
  if (!isToken || isToken === null || isToken === undefined) {
    return <Outlet />;
  } else {
    return <Navigate to="/booklist" replace />;
  }
}
