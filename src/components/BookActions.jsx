import {
  ArrowDownTrayIcon,
  BookOpenIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

export default function BookActions({
  isBookmarked,
  handleDownload,
  handleReadNow,
  handleBookmark,
}) {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
        Download
      </button>

      <button
        onClick={handleReadNow}
        className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md"
      >
        <BookOpenIcon className="h-5 w-5" />
        Read Now
      </button>

      <button
        onClick={handleBookmark}
        className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md"
      >
        {isBookmarked ? (
          <BookmarkSolidIcon className="h-5 w-5 text-blue-600" />
        ) : (
          <BookmarkIcon className="h-5 w-5" />
        )}
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </button>
    </div>
  );
}
