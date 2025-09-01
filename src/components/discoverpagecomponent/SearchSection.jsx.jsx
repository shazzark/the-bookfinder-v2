import SearchInput from "./SearchInput";

export default function SearchSection({
  searchQuery,
  suggestions,
  showSuggestions,
  onInputChange,
  onSelectSuggestion,
}) {
  return (
    <div className="w-full relative">
      <SearchInput
        value={searchQuery}
        onChange={onInputChange}
        suggestions={showSuggestions ? suggestions : []}
        onSelectSuggestion={onSelectSuggestion}
      />
    </div>
  );
}
