// src/pages/BookDetails.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/books";
import { useEffect, useState } from "react";
import { getBookDetails, getSimilarBooks } from "../hooks/bookLogic";

import { useBookmarks } from "../hooks/useBookmarks";
import SimilarBooks from "../components/bookdetailscomponent/SimilarBooks";

import LoadingSpinner from "../ui/LoadingSpinner";
import BookDetailsInfo from "../components/bookdetailscomponent/BookDetailsInfo";
import BookCover from "../components/bookdetailscomponent/BookCover";
import BackButton from "../components/bookdetailscomponent/BackButton";

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

  if (loading || bookLoading || bookmarksLoading) return <LoadingSpinner />;

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
        <BackButton navigate={navigate} />
        {/* Book Header */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Book Cover */}
            <BookCover
              imageLinks={imageLinks}
              volumeInfo={volumeInfo}
              handleBookmark={handleBookmark}
              bookmarked={bookmarked}
            />
            {/* Book Details */}
            <BookDetailsInfo
              book={book}
              volumeInfo={volumeInfo}
              userRating={userRating}
              hoverRating={hoverRating}
              setHoverRating={setHoverRating}
              handleRatingClick={handleRatingClick}
              showFullDescription={showFullDescription}
              toggleDescription={toggleDescription}
              description={description}
              shortDescription={shortDescription}
            />
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
