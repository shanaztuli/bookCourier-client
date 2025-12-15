import LoadingSpinner from "../Components/LoadingSpinner";
import Forbidden from "../Components/Forbidden/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const LibrarianRoute = ({ children }) => {
  const { loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "librarian") {
    return <Forbidden />;
  }

  return children;
};

export default LibrarianRoute;
