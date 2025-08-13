import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

export default function BookMeta({ book }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{book.volumeInfo.title}</h1>
      <p className="text-xl text-gray-600 mb-4">
        {book.volumeInfo.authors?.join(", ")}
      </p>

      <div className="flex items-center mb-6">
        <div className="flex items-center mr-6">
          <StarSolidIcon className="h-5 w-5 text-yellow-400" />
          <span className="ml-1">
            {book.volumeInfo.averageRating || "4.5"}/5
          </span>
        </div>
        <span className="text-gray-500">{book.volumeInfo.pageCount} pages</span>
      </div>
    </>
  );
}
