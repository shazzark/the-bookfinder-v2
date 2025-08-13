// src/components/BookCard.jsx
import { StarIcon } from "@heroicons/react/24/solid";

function BookCard({ book }) {
  // Extract book info from API response
  const volumeInfo = book.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const categories = volumeInfo.categories || [];
  const authors = volumeInfo.authors || [];

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="w-20 h-28 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
          {imageLinks.thumbnail ? (
            <img
              src={imageLinks.thumbnail}
              alt={volumeInfo.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
              Cover
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold line-clamp-1">{volumeInfo.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-1">
            {authors.join(", ")}
          </p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(volumeInfo.averageRating || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              {volumeInfo.averageRating || "N/A"}
            </span>
          </div>
          <p className="text-sm text-gray-700 mt-2 line-clamp-2">
            {volumeInfo.description || "No description available"}
          </p>
          <div className="mt-2 flex justify-between">
            <span className="text-xs text-gray-500">
              {volumeInfo.publishedDate || "Unknown date"}
            </span>
            {categories.length > 0 && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full line-clamp-1">
                {categories[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
