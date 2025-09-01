// src/components/discoverpagecomponent/Article.jsx
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useBooks } from "../../hooks/books";
import UserProfile from "../../utils/UserProfile";
import DiscoverHeader from "./DiscoverHeader";
import NavigationButton from "../button/NavigationButton";
import BooksTab from "./BookTabs";
import BookmarksTab from "./BookmarkTabs";
import { useBookmarks } from "../../hooks/useBookmarks";

export default function Article({ activeTab, setActiveTab }) {
  const {
    searchBooks,
    books,
    loading,
    error,
    selectedGenre,
    setSelectedGenre,
    currentPage,
    nextPage,
    prevPage,
    totalBooks,
    setCurrentPage,
  } = useBooks();

  const { updateBookRating } = useBookmarks();

  const isFirstPage = currentPage === 0;
  const isLastPage = (currentPage + 1) * 4 >= totalBooks;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSearch = (query) => {
    searchBooks(query);
    toast.info(`Searching for "${query}"`);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(0);
    toast.info(`Filtering by ${genre || "all genres"}`);
  };

  return (
    <main className="lg:col-span-2 space-y-2 relative">
      <DiscoverHeader
        onSearch={handleSearch}
        onProfileClick={() => setActiveTab("profile")}
      />

      <article className="bg-neutral-100 p-6 rounded-lg shadow-sm h-[35.1rem] flex flex-col relative overflow-auto">
        <div className="flex-1 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === "books" && (
                <BooksTab
                  selectedGenre={selectedGenre}
                  onGenreChange={handleGenreChange}
                  books={books}
                  loading={loading}
                  error={error}
                  updateBookRating={updateBookRating}
                />
              )}

              {activeTab === "bookmarks" && <BookmarksTab />}

              {activeTab === "notes" && (
                <div className="p-4 text-gray-600 h-full flex items-center justify-center">
                  <p>No notes yet.</p>
                </div>
              )}

              {activeTab === "profile" && <UserProfile />}
            </motion.div>
          </AnimatePresence>
        </div>

        {activeTab === "books" && (
          <NavigationButton
            onPrev={prevPage}
            onNext={nextPage}
            disabledPrev={isFirstPage || loading}
            disabledNext={isLastPage || loading}
          />
        )}
      </article>
    </main>
  );
}
