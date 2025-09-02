// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import {
  BookOpenIcon,
  CalendarIcon,
  UserIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import BookDescription from "./BookDescription";
import RatingStars from "./RatingStars";
import BooksalesInfo from "./BooksalesInfo";
function BookDetailsInfo({
  book,
  volumeInfo,
  userRating,
  hoverRating,
  setHoverRating,
  handleRatingClick,
  showFullDescription,
  toggleDescription,
  description,
  shortDescription,
}) {
  return (
    <div>
      <div className="flex-grow">
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center md:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {volumeInfo.title}
        </motion.h1>
        {volumeInfo.subtitle && (
          <p className="text-lg sm:text-xl text-gray-600 mb-4 text-center md:text-left">
            {volumeInfo.subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 justify-center md:justify-start">
          {volumeInfo.authors && (
            <div className="flex items-center gap-1 text-gray-700 text-sm sm:text-base">
              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              <span className="truncate max-w-[150px] sm:max-w-none">
                {volumeInfo.authors.join(", ")}
              </span>
            </div>
          )}

          {volumeInfo.publishedDate && (
            <div className="flex items-center gap-1 text-gray-700 text-sm sm:text-base">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              <span>{new Date(volumeInfo.publishedDate).getFullYear()}</span>
            </div>
          )}

          {volumeInfo.pageCount && (
            <div className="flex items-center gap-1 text-gray-700 text-sm sm:text-base">
              <BookOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              <span>{volumeInfo.pageCount} pages</span>
            </div>
          )}
        </div>
        {userRating > 0 && (
          <div className="mb-4 text-center md:text-left">
            <p className="text-base sm:text-lg font-medium text-gray-800">
              Your rating: {userRating}/5
            </p>
          </div>
        )}
        {/* Rating stars */}
        <RatingStars
          hoverRating={hoverRating}
          setHoverRating={setHoverRating}
          userRating={userRating}
          volumeInfo={volumeInfo}
          handleRatingClick={handleRatingClick}
          book={book}
        />
        {/* {book description} */}
        <BookDescription
          volumeInfo={volumeInfo}
          showFullDescription={showFullDescription}
          toggleDescription={toggleDescription}
          description={description}
          shortDescription={shortDescription}
        />
        {volumeInfo.categories && (
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {volumeInfo.categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        {/* {BOOKsales info} */}
        <BooksalesInfo book={book} volumeInfo={volumeInfo} />
      </div>
    </div>
  );
}

export default BookDetailsInfo;
