// src/components/discoverpagecomponent/BookTabs.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import BooksGrid from "./BooksGrid";

export default function BooksTab({
  selectedGenre,
  onGenreChange,
  books,
  loading,
  error,
  updateBookRating,
}) {
  const GENRES = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Thriller",
    "Biography",
    "History",
    "Science",
    "Self-Help",
  ];

  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 relative"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">Filter:</span>
          <div className="w-48">
            <select
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="">Select genre...</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-64 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-500">Loading books...</p>
          </div>
        </motion.div>
      ) : (
        <BooksGrid
          books={books}
          loading={loading}
          error={error}
          updateBookRating={updateBookRating}
        />
      )}
    </div>
  );
}
