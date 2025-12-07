import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />

            {/* ToastContainer must be inside layout */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                pauseOnHover={false}
                theme="colored"
            />

            <div className='flex-1'>
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;
