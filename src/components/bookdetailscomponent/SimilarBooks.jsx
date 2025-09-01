// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { StarIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { useBookmarks } from "../../hooks/useBookmarks";

function SimilarBooks({ similarBooks }) {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const handleSimilarBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleBookmarkClick = (e, book) => {
    e.stopPropagation(); // Prevent navigation when clicking bookmark
    toggleBookmark(book);
  };

  // Prevent rating clicks from triggering navigation
  const handleRatingClick = (e) => {
    e.stopPropagation();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="border-t border-gray-200 pt-8 mt-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-2xl font-semibold mb-6 text-gray-800"
        variants={itemVariants}
      >
        Similar Books You Might Like
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarBooks.map((similarBook) => {
          const bookmarked = isBookmarked(similarBook.id);
          const volumeInfo = similarBook.volumeInfo || {};
          const imageLinks = volumeInfo.imageLinks || {};
          const authors = volumeInfo.authors || [];

          return (
            <motion.div
              key={similarBook.id}
              className="cursor-pointer group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              onClick={() => handleSimilarBookClick(similarBook.id)}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <img
                  src={imageLinks.thumbnail || "/placeholder-book.jpg"}
                  alt={volumeInfo.title}
                  className="h-40 object-contain shadow-md transition-transform duration-300 group-hover:scale-105"
                />

                {/* Bookmark button */}
                <button
                  onClick={(e) => handleBookmarkClick(e, similarBook)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
                  aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  <BookmarkIcon
                    className={`w-5 h-5 ${
                      bookmarked
                        ? "text-yellow-500 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                  {volumeInfo.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3">
                  {authors.join(", ")}
                </p>

                <div
                  className="flex items-center justify-between"
                  onClick={handleRatingClick}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(volumeInfo.averageRating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      {volumeInfo.averageRating || "N/A"}
                    </span>
                  </div>

                  {volumeInfo.publishedDate && (
                    <span className="text-xs text-gray-500">
                      {new Date(volumeInfo.publishedDate).getFullYear()}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default SimilarBooks;
