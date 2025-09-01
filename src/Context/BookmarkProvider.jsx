// context/BookmarksProvider.jsx
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { supabase } from "../service/supabase";

import BookmarksContext from "./BookmarksContext.js";
import { AuthContext } from "./authContext.jsx";
// import { AuthContext } from "./authContext.js";

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Load bookmarks and ratings from Supabase on mount and when user changesSS
  useEffect(() => {
    if (user) {
      fetchBookmarks();
      fetchRatings();
    } else {
      setBookmarks([]);
      setRatings([]);
      setLoading(false);
    }
  }, [user]);

  // Fetch bookmarks from Supabase
  const fetchBookmarks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error.message);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  // Fetch ratings from Supabase
  const fetchRatings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("ratings")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      setRatings(data || []);
    } catch (error) {
      console.error("Error fetching ratings:", error.message);
    }
  };

  // Add or remove bookmark
  const toggleBookmark = async (book) => {
    if (!user) {
      toast.error("Please sign in to bookmark books");
      return false;
    }

    try {
      const existingBookmark = bookmarks.find((b) => b.book_id === book.id);

      if (existingBookmark) {
        // Remove bookmark
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("id", existingBookmark.id);

        if (error) throw error;
        setBookmarks((prev) => prev.filter((b) => b.book_id !== book.id));
        toast.success("Book removed from bookmarks");
        return false;
      } else {
        // Add bookmark
        const { data, error } = await supabase
          .from("bookmarks")
          .insert([
            {
              user_id: user.id,
              book_id: book.id,
              book_data: book,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) throw error;
        setBookmarks((prev) => [...prev, data[0]]);
        toast.success("Book added to bookmarks");
        return true;
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
      toast.error("Failed to update bookmark");
      return false;
    }
  };

  // Add or update rating
  const updateBookRating = async (bookId, userRating) => {
    if (!user) {
      toast.error("Please sign in to rate books");
      return;
    }

    try {
      const existingRating = ratings.find((r) => r.book_id === bookId);

      if (existingRating) {
        // Update rating
        const { error } = await supabase
          .from("ratings")
          .update({ rating: userRating, updated_at: new Date().toISOString() })
          .eq("id", existingRating.id);

        if (error) throw error;
        setRatings((prev) =>
          prev.map((r) =>
            r.book_id === bookId ? { ...r, rating: userRating } : r
          )
        );
      } else {
        // Add new rating
        const { data, error } = await supabase
          .from("ratings")
          .insert([
            {
              user_id: user.id,
              book_id: bookId,
              rating: userRating,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) throw error;
        setRatings((prev) => [...prev, data[0]]);
      }
      toast.success(`Rated ${userRating} stars`);
    } catch (error) {
      console.error("Error updating rating:", error.message);
      toast.error("Failed to update rating");
    }
  };

  // Check if book is bookmarked
  const isBookmarked = (bookId) => {
    return bookmarks.some((b) => b.book_id === bookId);
  };

  // Get user rating for a book
  const getUserRating = (bookId) => {
    const rating = ratings.find((r) => r.book_id === bookId);
    return rating ? rating.rating : 0;
  };

  // Get bookmarked books data (for compatibility with existing code)
  const getBookmarkedBooks = () => {
    return bookmarks.map((b) => b.book_data);
  };

  // For backward compatibility
  const addBookmark = async (book) => {
    await toggleBookmark(book);
  };

  // For backward compatibility
  const removeBookmark = async (bookId) => {
    const book = { id: bookId }; // Minimal book object for toggleBookmark
    await toggleBookmark(book);
  };

  const value = {
    bookmarks: getBookmarkedBooks(),
    ratings,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    getUserRating,
    updateBookRating,
    loading,
    refreshBookmarks: fetchBookmarks,
    refreshRatings: fetchRatings,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}
