import { useNavigate } from "react-router-dom";

function SimilarBooks({ similarBooks }) {
  const navigate = useNavigate();

  const handleSimilarBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <h2 className="text-2xl font-semibold mb-6">Similar Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {similarBooks.map((similarBook) => (
          <div
            key={similarBook.id}
            className="cursor-pointer group"
            onClick={() => handleSimilarBookClick(similarBook.id)}
          >
            <div className="flex flex-col items-center h-full">
              <div className="mb-3 w-full flex justify-center">
                <img
                  src={
                    similarBook.volumeInfo?.imageLinks?.thumbnail ||
                    "/placeholder-book.jpg"
                  }
                  alt={similarBook.volumeInfo.title}
                  className="h-48 object-contain"
                />
              </div>
              <div className="text-center flex-grow flex flex-col justify-between">
                <h3 className="font-medium text-sm px-2 group-hover:text-blue-600">
                  {similarBook.volumeInfo.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  {similarBook.volumeInfo.authors?.[0]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarBooks;
