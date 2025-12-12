import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import { ToastContainer } from "react-toastify";
import LoadingSpinner from '../Components/LoadingSpinner';
import Footer from '../Components/Footer/Footer';

const RootLayout = () => {
   const { state } = useNavigation;
    return (
      <div className="flex flex-col min-h-screen max-w-[1400px] mx-auto">
        <header>
          <Navbar></Navbar>
        </header>
        <section></section>
        <main className="flex-1">
          {state == "loading" ? <LoadingSpinner></LoadingSpinner> : <Outlet></Outlet>}
        </main>
        <footer>
          <Footer></Footer>
        </footer>
        <ToastContainer />
      </div>
    );
};

export default RootLayout;