const SuggestionItem = ({ suggestion, onSelect }) => {
  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
      onMouseDown={() => onSelect(suggestion)}
    >
      <div className="font-medium">{suggestion.title}</div>
      {suggestion.authors && (
        <div className="text-xs text-gray-500">
          {suggestion.authors.join(", ")}
        </div>
      )}
    </div>
  );
};

export default SuggestionItem;
