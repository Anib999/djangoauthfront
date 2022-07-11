import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
  const isLoggedIn = true;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
};

export default PrivateOutlet;
