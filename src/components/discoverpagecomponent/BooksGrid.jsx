// src/components/discoverpagecomponent/BooksGrid.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import BookCard from "./BookCard";

export default function BooksGrid({ books, error, updateBookRating }) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 text-center text-red-500 bg-red-50 rounded-lg"
      >
        <p>Error loading books. Please try again.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {books.slice(0, 4).map((book, index) => (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <BookCard book={book} updateBookRating={updateBookRating} />
        </motion.div>
      ))}
    </motion.div>
  );
}
