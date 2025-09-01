function SecondaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
  bg-primary-600 hover:bg-primary-700 text-white 
                 px-8 py-4 rounded-xl font-semibold text-lg
                 transition-all duration-200 transform hover:scale-105
                 shadow-lg hover:shadow-xl
`}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
