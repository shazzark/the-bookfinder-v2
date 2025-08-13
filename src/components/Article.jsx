import { useBooks } from "../hooks/books";
import BookThemeLoadingSpinner from "../ui/BookThemeLoadingSpinner";
import NavigationButton from "../ui/NavigationButton";
import BooksTab from "./BookTabs";
import DiscoverHeader from "./DiscoverHeader";
import UserProfile from "../utils/UserProfile";

export default function Article({ activeTab, setActiveTab }) {
  const { searchBooks } = useBooks();
  const {
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

  const isFirstPage = currentPage === 0;
  const isLastPage = (currentPage + 1) * 4 >= totalBooks;

  const handleSearch = (query) => {
    searchBooks(query);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(0);
  };

  return (
    <main className="lg:col-span-2 space-y-2 relative">
      {/* Pass a click handler to header so clicking user icon switches tab */}
      <DiscoverHeader
        onSearch={handleSearch}
        onProfileClick={() => setActiveTab("profile")}
      />

      <article className="bg-gray-100 p-6 rounded-lg shadow-sm h-[35.1rem] flex flex-col relative overflow-auto">
        <div className="flex-1 min-h-0 overflow-hidden">
          {loading && currentPage === 0 && activeTab === "books" ? (
            <div className="h-full flex items-center justify-center">
              <BookThemeLoadingSpinner />
            </div>
          ) : (
            <>
              {activeTab === "books" && (
                <BooksTab
                  selectedGenre={selectedGenre}
                  onGenreChange={handleGenreChange}
                  books={books}
                  loading={loading}
                  error={error}
                />
              )}

              {activeTab === "bookmarks" && (
                <div className="p-4 text-gray-600">
                  {/* Replace with your bookmarks component */}
                  <p>No bookmarks yet.</p>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="p-4 text-gray-600">
                  {/* Replace with your notes component */}
                  <p>No notes yet.</p>
                </div>
              )}

              {activeTab === "profile" && <UserProfile />}
            </>
          )}
        </div>

        {/* Only show pagination buttons in Books tab */}
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
