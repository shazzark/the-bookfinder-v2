// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BookmarkIcon } from "@heroicons/react/24/solid";

function BookCover({ imageLinks, volumeInfo, handleBookmark, bookmarked }) {
  return (
    <div className="flex justify-center md:justify-start">
      <div className="relative">
        <motion.img
          src={
            imageLinks.thumbnail ||
            imageLinks.smallThumbnail ||
            "/placeholder-book.jpg"
          }
          alt={volumeInfo.title}
          className="w-40 h-60 sm:w-48 sm:h-72 object-cover rounded-xl shadow-lg mx-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.button
          onClick={handleBookmark}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
          whileTap={{ scale: 0.9 }}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <BookmarkIcon
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              bookmarked ? "text-yellow-500 fill-current" : "text-gray-400"
            }`}
          />
        </motion.button>
      </div>
    </div>
  );
}

export default BookCover;
