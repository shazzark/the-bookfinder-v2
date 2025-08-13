import SearchInput from "./SearchInput";

const SearchSection = ({
  searchQuery,
  suggestions,
  showSuggestions,
  onInputChange,
  onSelectSuggestion,
  disabled,
}) => (
  <div className="w-2/4 relative">
    <SearchInput
      value={searchQuery}
      onChange={onInputChange}
      suggestions={showSuggestions ? suggestions : []}
      onSelectSuggestion={onSelectSuggestion}
      disabled={disabled}
    />
  </div>
);

export default SearchSection;
