// components/BookmarkList.jsx
// src/components/BookmarkList.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function BookmarkList() {
  const { bookmarks, toggleBookmark, getUserRating } = useBookmarks();
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleBookmarkClick = async (e, book) => {
    e.stopPropagation(); // Prevent navigation when bookmarking
    const success = await toggleBookmark(book);
    if (success !== undefined) {
      toast.success("Bookmark removed");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.map((book) => {
        const userRating = getUserRating(book.id);

        return (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleBookClick(book.id)}
          >
            <div className="relative">
              <img
                src={
                  book.volumeInfo?.imageLinks?.thumbnail ||
                  "/placeholder-book.jpg"
                }
                alt={book.volumeInfo.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={(e) => handleBookmarkClick(e, book)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                aria-label="Remove bookmark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">
                {book.volumeInfo.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {book.volumeInfo.authors?.join(", ")}
              </p>

              {/* Display user's rating if available */}
              {userRating > 0 && (
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`h-4 w-4 ${
                          star <= userRating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    Your rating: {userRating}/5
                  </span>
                </div>
              )}

              {userRating === 0 && (
                <div className="mb-2 text-sm text-gray-500">Not rated yet</div>
              )}

              <p className="text-xs text-gray-500 line-clamp-3">
                {book.volumeInfo.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
