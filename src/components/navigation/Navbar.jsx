import { NavLink } from "react-router-dom";
import { useContext } from "react";
import PrimaryButton from "../button/PrimaryButton";
import { AuthContext } from "../../Context/AuthContext";
// import { AuthContext } from "../Context/AuthContext";

function Navbar({ compact = false, isMobile = false }) {
  const { user, loginWithGoogle } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 transition-all duration-300 font-medium rounded-lg text-sm
     ${
       isActive
         ? "text-primary-600 bg-primary-100 font-semibold"
         : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
     }`;

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-4">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/discover" className={linkClass}>
          Discover
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About Us
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>

        <div className="pt-4 mt-4 border-t border-gray-200">
          {user ? (
            <div className="flex items-center gap-2">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="profile"
                  className="w-8 h-8 rounded-full border"
                />
              )}
              <span>{user.user_metadata?.full_name || user.email}</span>
            </div>
          ) : (
            <PrimaryButton
              onClick={loginWithGoogle}
              className="w-full justify-center"
            >
              Login
            </PrimaryButton>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full">
      <div className="flex items-center justify-end space-x-4">
        {/* Navigation links */}
        <div className="flex items-center space-x-1">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/discover" className={linkClass}>
            Discover
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </div>

        {/* Login/Profile */}
        <div>
          {user ? (
            <div className="flex items-center gap-2">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="profile"
                  className="w-8 h-8 rounded-full border"
                />
              )}
              <span className="text-sm font-medium">
                {user.user_metadata?.full_name || user.email}
              </span>
            </div>
          ) : (
            <PrimaryButton
              onClick={loginWithGoogle}
              size={compact ? "sm" : "md"}
            >
              Login
            </PrimaryButton>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
