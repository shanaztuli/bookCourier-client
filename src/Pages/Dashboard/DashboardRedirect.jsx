import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../Components/LoadingSpinner";

const DashboardRedirect = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "admin") {
    return <Navigate to="all-users" replace />;
  }

  if (role === "librarian") {
    return <Navigate to="add-book" replace />;
  }

  // default user
  return <Navigate to="my-orders" replace />;
};

export default DashboardRedirect;
