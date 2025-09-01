// SimpleBookRating.jsx
import { useState, useEffect } from "react";

export default function SimpleBookRating({ value, onChange }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(value || 0);

  // Update internal state when value prop changes
  useEffect(() => {
    setCurrentRating(value || 0);
  }, [value]);

  const handleStarClick = (e, rating) => {
    e.stopPropagation(); // Prevent event from bubbling
    setCurrentRating(rating); // Update local state immediately
    if (onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex" onClick={(e) => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={(e) => handleStarClick(e, star)}
          className="focus:outline-none p-0.5"
          aria-label={`Rate ${star} stars`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-4 h-4 ${
              star <= (hoverRating || currentRating || 0)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
