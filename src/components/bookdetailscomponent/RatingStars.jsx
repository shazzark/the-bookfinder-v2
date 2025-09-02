import { StarIcon } from "@heroicons/react/24/solid";

function RatingStars({
  hoverRating,
  setHoverRating,
  userRating,
  volumeInfo,
  handleRatingClick,
  book,
}) {
  return (
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
  );
}

export default RatingStars;
