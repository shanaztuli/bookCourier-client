import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { AiOutlineBars } from "react-icons/ai";

import useRole from "../../../hooks/useRole";
import CustomerMenu from "../Menu/CustomerMenu";
import LibrarianMenu from "../Menu/LibrarianMenu";
import AdminMenu from "../Menu/AdminMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const { role } = useRole();

  const handleToggle = () => setActive(!isActive);

  return (
    <>
      {/* Small screen toggle */}
      <div className="bg-gray-100 md:hidden flex justify-between p-4">
        <Link to="/">BookCourier</Link>
        <button onClick={handleToggle}>
          <AiOutlineBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white shadow-md transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        } transition-transform`}
      >
        <div className="p-4 font-bold text-xl text-center">BookCourier</div>
        <nav className="mt-6">
          {role === "customer" && <CustomerMenu />}
          {role === "librarian" && <LibrarianMenu />}
          {role === "admin" && <AdminMenu />}
        </nav>
        <button
          onClick={logOut}
          className="absolute bottom-4 w-full py-2 bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
