import { BookmarkIcon } from "@heroicons/react/24/solid";

function BookmarkButton({ book, bookmarked, handleBookmarkClick }) {
  return (
    <button
      onClick={(e) => handleBookmarkClick(e, book)}
      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <BookmarkIcon
        className={`w-5 h-5 ${
          bookmarked ? "text-yellow-500 fill-current" : "text-gray-400"
        }`}
      />
    </button>
  );
}

export default BookmarkButton;
