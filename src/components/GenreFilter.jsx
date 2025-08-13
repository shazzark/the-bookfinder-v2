import { useState } from "react";
import { GENRES } from "../hooks/Genres";

function GenreFilter({ selectedGenre, onGenreChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGenres = GENRES.filter((genre) =>
    genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (genre) => {
    onGenreChange(genre);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="mb-4 relative">
      <div className="flex items-center gap-2">
        <span className="text-sm">Filter:</span>
        <div className="relative">
          {/* Input that looks like a select but behaves like search */}
          <div
            className="border rounded-md px-3 py-2 text-sm w-40 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedGenre || "Select genre..."}
          </div>

          {/* Dropdown similar to search suggestions */}
          {isOpen && (
            <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {/* Search input inside dropdown */}
              <div className="p-2 border-b">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search genres..."
                  className="w-full p-1 text-sm border rounded"
                  autoFocus
                />
              </div>

              {/* Genre suggestions */}
              {filteredGenres.map((genre) => (
                <div
                  key={genre}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSelect(genre)}
                >
                  {genre}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenreFilter;
