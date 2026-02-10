import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    
      <footer className="flex flex-col items-center justify-center w-full py-10 bg-sky-800 from-[#5524B7] to-[#380B60] text-white/70">
        <Link to="/">
          <img src={logo} alt="logo image" className="w-45" />
        </Link>

        <p className="mt-1 text-center">
          Copyright © 2026 All rights reservered.
        </p>
        <div className="flex items-center gap-4 mt-5">
          <a
            href="#"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                stroke="#fff"
                strokeOpacity=".5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
                stroke="#fff"
                strokeOpacity=".5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01"
                stroke="#fff"
                strokeOpacity=".5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="#"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2"
                stroke="#fff"
                strokeOpacity=".5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </footer>
   
  );
};

export default Footer;
