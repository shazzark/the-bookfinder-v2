import SimpleBookRating from "../discoverpagecomponent/SimpleRating";

function BookInfo({
  volumeInfo,
  authors,
  userRating,
  handleRatingChange,
  book,
}) {
  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
        {volumeInfo.title}
      </h3>

      <p className="text-gray-600 text-sm mb-3">{authors.join(", ")}</p>

      {volumeInfo.description && (
        <p className="text-gray-700 text-xs line-clamp-3 mb-3">
          {volumeInfo.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        {/* User rating component */}
        <div onClick={(e) => e.stopPropagation()}>
          <SimpleBookRating
            value={userRating} // Pass the rating from provider
            onChange={(rating) => handleRatingChange(book, rating)}
          />
          <span className="text-xs text-gray-500 ml-1">
            {userRating > 0 ? userRating : volumeInfo.averageRating || "N/A"}
          </span>
        </div>

        {volumeInfo.publishedDate && (
          <span className="text-xs text-gray-500">
            {new Date(volumeInfo.publishedDate).getFullYear()}
          </span>
        )}
      </div>
    </div>
  );
}

export default BookInfo;
