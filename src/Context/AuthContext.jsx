// src/context/authContext.jsx
import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
});
