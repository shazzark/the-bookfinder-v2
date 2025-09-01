// src/hooks/useBookmarks.js
// src/hooks/useBookmarks.js
import { useContext } from "react";
import BookmarksContext from "../Context/BookmarksContext";

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};
