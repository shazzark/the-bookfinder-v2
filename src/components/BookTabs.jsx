// import GenreFilter from "../GenreFilter";
// import BooksGrid from "../BooksGrid";
import BooksGrid from "./BooksGrid";
import GenreFilter from "./GenreFilter";

function BooksTab({ selectedGenre, onGenreChange, books, loading, error }) {
  return (
    <>
      <GenreFilter
        selectedGenre={selectedGenre}
        onGenreChange={onGenreChange}
      />
      <BooksGrid books={books} loading={loading} error={error} />
    </>
  );
}

export default BooksTab;
