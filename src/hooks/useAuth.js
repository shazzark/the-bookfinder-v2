// src/context/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext ";
// import { AuthContext } from "../Context/authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
