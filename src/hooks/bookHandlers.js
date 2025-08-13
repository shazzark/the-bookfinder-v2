import { useState } from "react";

// src/handlers/bookHandlers.js
export const useBookHandlers = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  return {
    isBookmarked,
    rating,
    hoverRating,
    setRating,
    setHoverRating,
    handleBookmark,
    handleRating,
  };
};
