import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { Toaster } from "react-hot-toast";

import LoadingSpinner from '../Components/LoadingSpinner';

const AuthLayout = () => {
  const { state } = useNavigation;

    return (
      <div className="flex max-w-[1400px] mx-auto flex-col ">
        <header>
          <Navbar></Navbar>
        </header>
        <main className="px-4 md:px-0 md:pb-8  md:flex-1 bg-base-200">
          {state == "loading" ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <Outlet></Outlet>
          )}
        </main>
        <footer>
          <Footer></Footer>
        </footer>
        <ToastContainer />
        <Toaster />
        
      </div>
    );
};

export default AuthLayout;