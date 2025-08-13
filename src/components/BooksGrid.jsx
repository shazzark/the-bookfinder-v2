import { useNavigate } from "react-router-dom";
import BookThemeLoadingSpinner from "../ui/BookThemeLoadingSpinner";
import BookCard from "./BookCard";

function BooksGrid({ loading, books, error }) {
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Show spinner and 4 skeleton cards */}
        <div className="col-span-full flex justify-center opacity-50">
          <BookThemeLoadingSpinner />
        </div>
        {[...Array(4)].map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="border rounded-lg p-4 animate-pulse"
          >
            <div className="flex gap-4">
              <div className="w-20 h-28 bg-gray-200 rounded-md"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 bg-gray-200 rounded-full"
                    ></div>
                  ))}
                </div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {books.slice(0, 4).map((book) => (
        <div
          key={book.id}
          onClick={() => handleBookClick(book.id)}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}

export default BooksGrid;
