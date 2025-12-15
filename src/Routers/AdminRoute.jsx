import React from "react";

import LoadingSpinner from "../Components/LoadingSpinner";
import Forbidden from "../Components/Forbidden/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;

