// src/pages/BookDetails.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/books";
import { useEffect, useState } from "react";
import { getBookDetails, getSimilarBooks } from "../hooks/bookLogic";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  BookmarkIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { useBookmarks } from "../hooks/useBookmarks";
import SimilarBooks from "../components/bookdetailscomponent/SimilarBooks";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, loading } = useBooks();
  const {
    isBookmarked,
    toggleBookmark,
    getUserRating,
    updateBookRating,
    loading: bookmarksLoading,
  } = useBookmarks();

  const [book, setBook] = useState(null);
  const [bookLoading, setBookLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (books.length > 0) {
      const foundBook = getBookDetails(books, id);
      if (foundBook) {
        setBook(foundBook);
        return;
      }
    }

    setBookLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}?projection=full`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
      })
      .catch((err) => console.error("Error fetching book:", err))
      .finally(() => setBookLoading(false));
  }, [books, id]);

  // Update user rating when book or bookmarks context changes
  useEffect(() => {
    if (book) {
      const rating = getUserRating(book.id);
      setUserRating(rating);
    }
  }, [book, getUserRating]);

  const handleRating = async (book, rating) => {
    if (book) {
      await updateBookRating(book.id, rating);
      setUserRating(rating);

      // If the book isn't bookmarked yet, bookmark it when rated
      if (!isBookmarked(book.id)) {
        await toggleBookmark(book);
      }
    }
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();
    if (book) {
      await toggleBookmark(book);
    }
  };

  const handleRatingClick = (e, star, book) => {
    e.preventDefault();
    e.stopPropagation();
    handleRating(book, star);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading || bookLoading || bookmarksLoading)
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (!book)
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-semibold text-gray-800">Book not found</h2>
        <p className="text-gray-600 mt-2">ID: {id}</p>
        <button
          onClick={() => navigate("/discover")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Discover
        </button>
      </div>
    );

  const similarBooks = getSimilarBooks(books, id, book?.volumeInfo?.categories);
  const volumeInfo = book.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const bookmarked = isBookmarked(book.id);
  const description = volumeInfo.description || "";
  const shortDescription =
    description.length > 300
      ? `${description.substring(0, 300)}...`
      : description;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Back Button */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-6">
          <button
            onClick={() => navigate("/discover")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Discover</span>
          </button>
        </div>

        {/* Book Header */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Book Cover */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <motion.img
                  src={
                    imageLinks.thumbnail ||
                    imageLinks.smallThumbnail ||
                    "/placeholder-book.jpg"
                  }
                  alt={volumeInfo.title}
                  className="w-40 h-60 sm:w-48 sm:h-72 object-cover rounded-xl shadow-lg mx-auto"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.button
                  onClick={handleBookmark}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
                  whileTap={{ scale: 0.9 }}
                  aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  <BookmarkIcon
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      bookmarked
                        ? "text-yellow-500 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                </motion.button>
              </div>
            </div>

            {/* Book Details */}
            <div className="flex-grow">
              <motion.h1
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center md:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {volumeInfo.title}
              </motion.h1>

              {volumeInfo.subtitle && (
                <p className="text-lg sm:text-xl text-gray-600 mb-4 text-center md:text-left">
                  {volumeInfo.subtitle}
                </p>
              )}

              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 justify-center md:justify-start">
                {volumeInfo.authors && (
                  <div className="flex items-center gap-1 text-gray-700 text-sm sm:text-base">
                    <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    <span className="truncate max-w-[150px] sm:max-w-none">
                      {volumeInfo.authors.join(", ")}
                    </span>
                  </div>
                )}

                {volumeInfo.publishedDate && (
                  <div className="flex items-center gap-1 text-gray-700 text-sm sm:text-base">
                    <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    <span>
                      {new Date(volumeInfo.publishedDate).getFullYear()}
                    </span>
                  </div>
                )}

                {volumeInfo.pageCount && (
                  <div className="flex items-center gap-1 text-gray-700 text-sm sm:text-base">
                    <BookOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    <span>{volumeInfo.pageCount} pages</span>
                  </div>
                )}
              </div>

              {userRating > 0 && (
                <div className="mb-4 text-center md:text-left">
                  <p className="text-base sm:text-lg font-medium text-gray-800">
                    Your rating: {userRating}/5
                  </p>
                </div>
              )}

              {/* Rating stars */}
              <div className="mb-6 flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={(e) => handleRatingClick(e, star, book)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1"
                      >
                        <StarIcon
                          className={`h-5 w-5 sm:h-6 sm:w-6 ${
                            star <= (hoverRating || userRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {userRating > 0
                      ? userRating
                      : volumeInfo.averageRating || "Not rated"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {volumeInfo.ratingsCount
                    ? `${volumeInfo.ratingsCount} ratings`
                    : "Be the first to rate!"}
                </p>
              </div>

              {volumeInfo.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {showFullDescription ? description : shortDescription}
                  </p>
                  {description.length > 300 && (
                    <button
                      onClick={toggleDescription}
                      className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
                    >
                      {showFullDescription ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              )}

              {volumeInfo.categories && (
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {volumeInfo.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {similarBooks.length > 0 && (
          <div className="px-4 sm:px-6 pb-6 sm:pb-8">
            <SimilarBooks similarBooks={similarBooks} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default BookDetails;
