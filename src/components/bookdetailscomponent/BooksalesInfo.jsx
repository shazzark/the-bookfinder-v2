// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

function BooksalesInfo({ book, volumeInfo }) {
  return (
    <div>
      {book.saleInfo && (
        <div className="mt-6 flex justify-center md:justify-start">
          <motion.a
            href={
              book.saleInfo.buyLink ||
              `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(
                volumeInfo.title + " book"
              )}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBagIcon className="h-5 w-5" />
            <span>
              {book.saleInfo.retailPrice
                ? `Buy for $${book.saleInfo.retailPrice.amount}`
                : "Find This Book"}
            </span>
          </motion.a>
        </div>
      )}
    </div>
  );
}

export default BooksalesInfo;
