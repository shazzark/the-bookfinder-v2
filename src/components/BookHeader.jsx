import BookActions from "./BookActions";
import BookMeta from "./BookMeta";
import BookRating from "./BookRating";
import BookCategories from "./BookCategories";
import BookDescription from "./BookDescription";

export default function BookHeader({
  book,
  isBookmarked,
  handleDownload,
  handleReadNow,
  handleBookmark,
  rating,
  hoverRating,
  handleRating,
  setHoverRating,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-12">
      {/* Book Cover Image - Responsive */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center">
        <div className="relative w-full max-w-xs mx-auto">
          <img
            src={
              book.volumeInfo?.imageLinks?.thumbnail || "/placeholder-book.jpg"
            }
            alt={book.volumeInfo.title}
            className="w-full h-auto rounded-lg shadow-lg object-contain"
            style={{
              maxHeight: "400px",
              minHeight: "200px",
              aspectRatio: "2/3",
            }}
          />
        </div>
        <BookActions
          isBookmarked={isBookmarked}
          handleDownload={handleDownload}
          handleReadNow={handleReadNow}
          handleBookmark={handleBookmark}
        />
      </div>

      {/* Book Details */}
      <div className="flex-1">
        <BookMeta book={book} />
        <BookRating
          rating={rating}
          hoverRating={hoverRating}
          handleRating={handleRating}
          setHoverRating={setHoverRating}
        />
        <BookDescription book={book} />
        <BookCategories book={book} />
      </div>
    </div>
  );
}
