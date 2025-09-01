// import SuggestionItem from "./SuggestionItem";

import SuggestionItem from "./SuggestionItem";

const SuggestionsDropdown = ({ suggestions, onSelectSuggestion }) => {
  return (
    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
      {suggestions.map((suggestion) => (
        <SuggestionItem
          key={suggestion.id}
          suggestion={suggestion}
          onSelect={onSelectSuggestion}
        />
      ))}
    </div>
  );
};

export default SuggestionsDropdown;
