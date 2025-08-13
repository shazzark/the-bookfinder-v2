import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

function BookRating({ rating, hoverRating, handleRating, setHoverRating }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Rate this book</h3>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHoverRating(star * 2)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRating(star * 2)}
            className="focus:outline-none"
          >
            {(hoverRating || rating) >= star * 2 ? (
              <StarSolidIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <StarOutlineIcon className="h-6 w-6 text-yellow-400" />
            )}
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {hoverRating ? hoverRating : rating}/10
        </span>
      </div>
    </div>
  );
}

export default BookRating;
