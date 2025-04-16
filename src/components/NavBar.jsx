import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-purple-20 border-b border-purple-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <NavLink
              className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              to="/"
            >
              <span className="md:block text-white text-2xl font-bold ml-2">
                Gabriel Ing, PhD
              </span>
            </NavLink>

            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/about" className={linkClass}>
                  About Me
                </NavLink>
                <NavLink to="/projects" className={linkClass}>
                  Projects
                </NavLink>
                <NavLink to="/blog" className={linkClass}></NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
