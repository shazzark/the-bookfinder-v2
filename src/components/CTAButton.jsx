// src/components/CTAButton.jsx
import { NavLink } from "react-router-dom";

export default function CTAButton({ user }) {
  if (user) return null; // Hide buttons if logged in

  return (
    <div className="flex gap-4 items-center">
      {/* <NavLink
        to="/login"
        className="text-lg font-medium text-gray-800 hover:text-green-700 transition-colors"
      >
        Login
      </NavLink> */}
      {/* <NavLink
        to="/signup"
        className="text-lg font-bold text-white bg-green-700 hover:bg-green-800 
                  px-6 py-2.5 rounded-full shadow-sm hover:shadow-md
                  transition-all duration-200 transform hover:-translate-y-0.5"
      >
        Sign Up
      </NavLink> */}

      <NavLink
        to="/signup"
        className="text-lg font-bold text-white bg-green-700 hover:bg-green-800 
                  px-6 py-2.5 rounded-full shadow-sm hover:shadow-md
                  transition-all duration-200 transform hover:-translate-y-0.5"
      >
        Login
      </NavLink>
    </div>
  );
}
