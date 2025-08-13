// Button.jsx
import React from "react";

const Button = ({ children, type = "primary", onClick, className = "" }) => {
  const baseStyles =
    "px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const typeStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 shadow-sm",
  };

  const buttonStyles = `${baseStyles} ${typeStyles[type]} ${className}`;

  return (
    <button onClick={onClick} className={buttonStyles}>
      {children}
    </button>
  );
};

export default Button;
