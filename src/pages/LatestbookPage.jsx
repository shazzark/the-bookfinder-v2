// src/pages/LatestBooks.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useBookmarks } from "../hooks/useBookmarks";
import SimpleBookRating from "../components/discoverpagecomponent/SimpleRating";
import BookmarkButton from "../components/Latestbokpagecomponent/BookmarkButton";
import BackButton from "../components/Latestbokpagecomponent/BackButton";
import BookInfo from "../components/Latestbokpagecomponent/BookInfo";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorLoadingSpinner from "../ui/ErrorLoadingSpinner";

function LatestBooks() {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark, getUserRating, updateBookRating } =
    useBookmarks();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestBooks();
  }, []);

  const fetchLatestBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=20&printType=books`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch latest books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleBookmarkClick = (e, book) => {
    e.stopPropagation();
    toggleBookmark(book);
  };

  const handleRatingChange = async (book, rating) => {
    // Update the rating in your bookmarks/ratings system
    await updateBookRating(book.id, rating);
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorLoadingSpinner error={error} fetchLatestBooks={fetchLatestBooks} />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <BackButton navigate={navigate} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
          variants={itemVariants}
        >
          Latest Books
        </motion.h1>

        {books.length === 0 ? (
          <motion.div className="text-center py-12" variants={itemVariants}>
            <p className="text-gray-500 text-lg">No latest books found.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => {
              const bookmarked = isBookmarked(book.id);
              const userRating = getUserRating(book.id); // Get user's rating from provider
              const volumeInfo = book.volumeInfo || {};
              const imageLinks = volumeInfo.imageLinks || {};
              const authors = volumeInfo.authors || [];

              return (
                <motion.div
                  key={book.id}
                  className="cursor-pointer group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  onClick={() => handleBookClick(book.id)}
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
                    <BookmarkButton
                      book={book}
                      bookmarked={bookmarked}
                      handleBookmarkClick={handleBookmarkClick}
                    />
                  </div>

                  {/* {bookinfo and user rating component} */}
                  <BookInfo
                    volumeInfo={volumeInfo}
                    authors={authors}
                    userRating={userRating}
                    handleRatingChange={handleRatingChange}
                    book={book}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default LatestBooks;
