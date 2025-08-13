import { useState } from "react";
import SuggestionsDropdown from "./SuggestionsDropdown";
import SearchIcon from "../ui/SearchIcon";
// import SearchIcon from "./SearchIcon";
// import SuggestionsDropdown from "./SuggestionsDropdown";

const SearchInput = ({
  value,
  onChange,
  suggestions = [],
  onSelectSuggestion,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSuggestionClick = (suggestion) => {
    onSelectSuggestion(suggestion);
    onChange({ target: { value: "" } });
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent transition-all duration-200">
        <SearchIcon />
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search books..."
          disabled={disabled}
          className="w-full py-2 px-2 text-sm text-gray-900 bg-transparent border-none focus:outline-none"
        />
      </div>

      {isFocused && suggestions.length > 0 && (
        <SuggestionsDropdown
          suggestions={suggestions}
          onSelectSuggestion={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default SearchInput;
