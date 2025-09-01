// context/BookmarksContext.js
// context/BookmarksContext.js
import { createContext } from "react";

const BookmarksContext = createContext({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => {},
  toggleBookmark: () => {},
  getUserRating: () => {},
  updateBookRating: () => {},
  loading: false,
  refreshBookmarks: () => {},
  refreshRatings: () => {},
});

export default BookmarksContext;
