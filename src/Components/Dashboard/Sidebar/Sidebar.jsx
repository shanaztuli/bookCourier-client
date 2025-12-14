import { Link, NavLink } from "react-router";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
const Sidebar = ({ open, setOpen }) => {
  const { logOut } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <Link to='/' className="text-xl font-bold text-red-700">BookCourier</Link>
        

          {/* Close button (mobile only) */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col px-4 py-6 gap-2">
          <NavLink
            to="/dashboard/my-orders"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive ? "bg-red-100 text-red-700" : "hover:bg-gray-100"
              }`
            }
          >
            My Orders
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive ? "bg-red-100 text-red-700" : "hover:bg-gray-100"
              }`
            }
          >
            My Profile
          </NavLink>

          <NavLink
            to="/dashboard/invoices"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive ? "bg-red-100 text-red-700" : "hover:bg-gray-100"
              }`
            }
          >
            Invoices
          </NavLink>
        </nav>

        {/* Logout fixed at bottom */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t">
          <Link to='/' className=" w-full btn btn-outline mb-3">
             Go back Home
          </Link>
          <button
            onClick={logOut}
            className="w-full btn-btn text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
