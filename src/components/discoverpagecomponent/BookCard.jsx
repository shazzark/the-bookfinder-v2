// src/components/BookCard.jsx
// src/components/BookCard.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { useBookmarks } from "../../hooks/useBookmarks";
import SimpleBookRating from "./SimpleRating";

export default function BookCard({ book, updateBookRating }) {
  const { isBookmarked, toggleBookmark, getUserRating } = useBookmarks();
  const navigate = useNavigate();

  // Add safety check for undefined book
  if (!book) {
    return (
      <div className="border rounded-lg p-4 bg-gray-100 animate-pulse">
        <div className="flex gap-4">
          <div className="w-20 h-28 bg-gray-300 rounded-md"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const volumeInfo = book.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const categories = volumeInfo.categories || [];
  const authors = volumeInfo.authors || [];
  const bookmarked = isBookmarked(book.id);
  const userRating = getUserRating(book.id);

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    const success = await toggleBookmark(book);
    if (success !== undefined) {
      // Toast message is handled in the toggleBookmark function
    }
  };

  const handleBookClick = () => {
    navigate(`/books/${book.id}`);
  };

  // Handle rating from the SimpleBookRating component
  const handleRatingChange = async (rating) => {
    if (updateBookRating) {
      await updateBookRating(book.id, rating);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="border rounded-lg p-4 hover:shadow-md transition-shadow relative cursor-pointer bg-white"
      onClick={handleBookClick}
    >
      {/* Bookmark button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBookmarkClick}
        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md z-10"
        aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-5 h-5 ${
            bookmarked ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>

      {/* Book content */}
      <div className="flex gap-4">
        <motion.div
          whileHover={{ rotate: 2 }}
          className="w-20 h-28 bg-gray-200 rounded-md overflow-hidden flex-shrink-0"
        >
          {imageLinks.thumbnail ? (
            <img
              src={imageLinks.thumbnail}
              alt={volumeInfo.title || "Book cover"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
              Cover
            </div>
          )}
        </motion.div>

        <div className="flex-1">
          <h3 className="font-bold line-clamp-1">
            {volumeInfo.title || "Untitled"}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">
            {authors.length > 0 ? authors.join(", ") : "Unknown author"}
          </p>

          {/* ⭐ Interactive Rating */}
          <div className="flex items-center mt-1">
            <SimpleBookRating
              value={userRating || 0}
              onChange={handleRatingChange}
            />
            <span className="text-xs text-gray-500 ml-1">
              {userRating > 0 ? `${userRating}/5` : "Rate this book"}
            </span>
          </div>

          <p className="text-sm text-gray-700 mt-2 line-clamp-2">
            {volumeInfo.description || "No description available"}
          </p>

          <div className="mt-2 flex justify-between">
            <span className="text-xs text-gray-500">
              {volumeInfo.publishedDate || "Unknown date"}
            </span>
            {categories.length > 0 && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full line-clamp-1">
                {categories[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
