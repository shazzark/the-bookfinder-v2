// src/pages/BookDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/books";
import { useEffect, useState } from "react";
import BookHeader from "../components/BookHeader";
import SimilarBooks from "../components/SimilarBooks";
import {
  getBookDetails,
  getSimilarBooks,
  handleDownload,
  handleReadNow,
} from "../hooks/bookLogic";
import { useBookHandlers } from "../hooks/bookHandlers";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, loading } = useBooks();
  const {
    setRating,
    isBookmarked,
    rating,
    hoverRating,
    setHoverRating,
    handleBookmark,
    handleRating,
  } = useBookHandlers();

  const [book, setBook] = useState(null);
  const [bookLoading, setBookLoading] = useState(false);

  useEffect(() => {
    if (books.length > 0) {
      const foundBook = getBookDetails(books, id);
      if (foundBook) {
        setBook(foundBook);
        setRating(foundBook?.volumeInfo?.averageRating || 0);
        return;
      }
    }

    setBookLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}?projection=full`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setRating(data?.volumeInfo?.averageRating || 0);
      })
      .catch((err) => console.error("Error fetching book:", err))
      .finally(() => setBookLoading(false));
  }, [books, id, setRating]);

  if (loading || bookLoading)
    return <div className="text-center py-12">Loading...</div>;
  if (!book)
    return <div className="text-center py-12">Book not found (ID: {id})</div>;

  const similarBooks = getSimilarBooks(books, id, book?.volumeInfo?.categories);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/discover")}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors z-10"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="text-sm font-medium hidden sm:inline">
            Back to Discover
          </span>
          <span className="text-sm font-medium sm:hidden">Back</span>
        </button>

        <div className="mt-8 sm:mt-2">
          <BookHeader
            book={book}
            isBookmarked={isBookmarked}
            handleDownload={() => handleDownload(book)}
            handleReadNow={() => handleReadNow(book)}
            handleBookmark={handleBookmark}
            rating={rating}
            hoverRating={hoverRating}
            handleRating={handleRating}
            setHoverRating={setHoverRating}
          />
          {similarBooks.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <SimilarBooks similarBooks={similarBooks} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
