import Select from "react-select";
import { GENRES } from "../../hooks/Genres";

function GenreFilter({ selectedGenre, onGenreChange }) {
  const options = GENRES.map((genre) => ({
    value: genre,
    label: genre,
  }));

  return (
    <div className="mb-4 relative">
      <div className="flex items-center gap-2">
        <span className="text-sm">Filter:</span>
        <div className="w-48">
          <Select
            options={options}
            value={
              selectedGenre
                ? { value: selectedGenre, label: selectedGenre }
                : null
            }
            onChange={(selectedOption) =>
              onGenreChange(selectedOption ? selectedOption.value : "")
            }
            placeholder="Select genre..."
            isClearable
            isSearchable
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default GenreFilter;
