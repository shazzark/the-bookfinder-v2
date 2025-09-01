import { Link } from "react-router-dom";

function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  to, // <-- Add this
}) {
  // If `to` is provided, render a Link
  if (to) {
    return (
      <Link
        to={to}
        className={`
          border-2 border-primary-600 text-primary-600 
          hover:bg-primary-600 hover:text-white
          px-6 py-2 rounded-lg font-medium transition-all
          inline-block text-center
        `}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render a button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        border-2 border-primary-600 text-primary-600 
        hover:bg-primary-600 hover:text-white
        px-6 py-2 rounded-lg font-medium transition-all
      `}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
