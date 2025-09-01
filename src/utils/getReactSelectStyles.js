export const getReactSelectStyles = (theme) => {
  return {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "rgb(30 41 59)" : "rgb(255 255 255)",
      borderColor: state.isFocused
        ? "#0ea5e9"
        : theme === "dark"
        ? "#475569"
        : "#cbd5e1",
      borderRadius: "0.5rem",
      padding: "0.5rem",
      minHeight: "3.25rem",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(14, 165, 233, 0.2)" : "none",
      "&:hover": {
        borderColor: state.isFocused
          ? "#0ea5e9"
          : theme === "dark"
          ? "#64748b"
          : "#94a3b8",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "rgb(30 41 59)" : "rgb(255 255 255)",
      borderRadius: "0.5rem",
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#0ea5e9"
        : state.isFocused
        ? theme === "dark"
          ? "#1e40af"
          : "#e0f2fe"
        : "transparent",
      color: state.isSelected
        ? "white"
        : theme === "dark"
        ? "#e2e8f0"
        : "inherit",
      "&:hover": {
        backgroundColor: theme === "dark" ? "#1e40af" : "#e0f2fe",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1e40af" : "#e0f2fe",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#e0f2fe" : "#0369a1",
      fontWeight: "500",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#e0f2fe" : "#0369a1",
      "&:hover": {
        backgroundColor: theme === "dark" ? "#0ea5e9" : "#bae6fd",
        color: theme === "dark" ? "#ffffff" : "#075985",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#e2e8f0" : "#1e293b",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#94a3b8",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#e2e8f0" : "#1e293b",
    }),
  };
};
