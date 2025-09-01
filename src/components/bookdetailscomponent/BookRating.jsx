// BookRating.jsx
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function BookRating({ userRating, onRatingChange }) {
  // This component now uses a 1-5 scale
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Rate this book</h3>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onRatingChange(star)} // Now just 'star' (1-5)
            className="focus:outline-none"
          >
            {(hoverRating || userRating) >= star ? (
              <StarSolidIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <StarOutlineIcon className="h-6 w-6 text-yellow-400" />
            )}
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {hoverRating || userRating || 0}/5
          {/* Show 0 if no rating yet */}
        </span>
      </div>
    </div>
  );
}

export default BookRating;
