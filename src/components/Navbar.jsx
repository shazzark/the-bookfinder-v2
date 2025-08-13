// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const linkClass = ({ isActive }) =>
    `block py-1.5 px-3 text-base transition-all duration-200 rounded-sm md:rounded-none ${
      isActive
        ? "font-semibold text-green-700 md:border-b-2 md:border-green-700"
        : "text-gray-700 hover:text-green-600 hover:bg-gray-100/30 md:hover:bg-transparent"
    }`;

  const handleClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav>
      <ul className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2 p-2 md:p-0 mt-1 border border-gray-100/50 rounded-md bg-white/50 md:border-0 md:bg-transparent">
        <li>
          <NavLink to="/" className={linkClass} onClick={handleClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/discover" className={linkClass} onClick={handleClick}>
            Discover
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={linkClass} onClick={handleClick}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={linkClass} onClick={handleClick}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
