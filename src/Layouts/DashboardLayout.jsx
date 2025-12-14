import { Outlet } from "react-router";
import { useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "../Components/Dashboard/Sidebar/SideBar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className=" max-w-[1400px] mx-auto flex bg-gray-100 min-h-screen">
      {/* Sidebar (always visible on md+) */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Content area */}
      <div className="flex-1 md:ml-64">
        {/* Top bar (mobile only) */}
        <div className="md:hidden bg-white shadow px-4 py-3 flex items-center">
          <button onClick={() => setOpen(true)}>
            <AiOutlineMenu size={24} />
          </button>
          <h2 className="ml-4 font-semibold text-lg">Dashboard</h2>
        </div>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
