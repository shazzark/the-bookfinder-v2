function BookDescription({
  volumeInfo,
  showFullDescription,
  toggleDescription,
  description,
  shortDescription,
}) {
  return (
    <>
      {volumeInfo.description && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {showFullDescription ? description : shortDescription}
          </p>
          {description.length > 300 && (
            <button
              onClick={toggleDescription}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default BookDescription;
