import React, { useEffect, useState } from "react";
import { Link, Navigate, NavLink } from "react-router";
import logo from "/logoImg.png";
import { use } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthContext";

const Navbar = () => {
//   const { user, logOut } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const links = (
    <>
      <li className="ml-2 font-bold">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "border-b-3 border-red-800 " : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li className="ml-2 font-bold">
        <NavLink
          to={"/books"}
          className={({ isActive }) =>
            isActive ? "border-b-3 border-red-800 " : ""
          }
        >
          Books
        </NavLink>
      </li>
      <li className="ml-2 font-bold">
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            isActive ? "border-b-3 border-red-800 " : ""
          }
        >
          Dashboard
        </NavLink>
      </li>
      {/* {user && (
        <>
          <li className="ml-2 font-bold">
            <NavLink
              to={"/myAcceptedTasks"}
              className={({ isActive }) =>
                isActive
                 ? "border-b-3 border-red-800 "
              : ""
              }
            >
              My Accepted Tasks
            </NavLink>
          </li>
          <li className="ml-2 md:ml-5 font-bold">
            <NavLink
              to={"/myAddedJobs"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-3 border-red-800 "
              : ""
              }
            >
              My Added Jobs
            </NavLink>
          </li>
        </>
      )} */}

      <div className=" md:hidden block ml-4">
        <input
          onChange={(e) => handleTheme(e.target.checked)}
          type="checkbox"
          defaultChecked={localStorage.getItem("theme") === "dark"}
          className="toggle mr-2"
        />
      </div>
    </>
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast("You signed out");
        Navigate("/");
      })
      .catch();
  };

  return (
    <div className="navbar bg-base-100 shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown z-20">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
          >
            {links}
          </ul>
        </div>

        <div>
          <div className="flex justify-center items-center gap-1">
            <img className="h-15" src={logo} alt="" />
            <h1 className=" text-2xl md:text-3xl font-bold text-red-800 ">
              BookCourier
            </h1>
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ml-5 gap-x-6">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className=" hidden md:block">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle mr-2"
          />
        </div>

        {/* {user && (
          <img
            className="w-13 h-13 mr-2 rounded-full"
            src={user?.photoURL}
            title={user?.displayName}
            alt="userLogo"
          />
        )}
        {user ? (
          <>
            <button onClick={handleLogOut} className="btn btn-primary">
              {" "}
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-primary ">
              {" "}
              Login
            </Link>
            <Link
              to="/auth/register"
              className="btn ml-2 bg-base-200 font-bold "
            >
              {" "}
              Register
            </Link>
          </>
        )} */}

        <Link
          to="/auth/login"
          className="btn text-white bg-gradient-to-br from-red-800 via-red-900 to-red-950 "
        >
          {" "}
          Login
        </Link>
        <Link to="/auth/register" className="btn ml-2 bg-base-200 font-bold ">
          {" "}
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
