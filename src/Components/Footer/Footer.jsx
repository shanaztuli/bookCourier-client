import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
import logo from "/logoImg.png"; 

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-8 py-12 mt-16">
      <div className="grid md:grid-cols-4 gap-10 max-w-7xl mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img className="h-15" src={logo} alt="BookCourier Logo" />
            <h3 className="text-white font-bold text-2xl sm:text-[20px] ">BookCourier</h3>
          </div>
          <p className="text-sm leading-relaxed">
            BookCourier brings the library to your doorstep. Borrow, track, and
            manage books from nearby libraries without stepping outside.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">All Books</li>
            <li className="hover:text-white cursor-pointer">Dashboard</li>
            <li className="hover:text-white cursor-pointer">
              Login / Register
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-white" />
              support@bookcourier.com
            </li>

            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-white" />
              +1 (555) 908-BOOK
            </li>

            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-white" />
              Delivering Across Major Cities
            </li>
          </ul>

          <div className="flex gap-4 mt-4 text-gray-400 text-lg">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaXTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} BookCourier — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
