import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const auth = true;
  return auth === true ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoute;
