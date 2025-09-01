export default function SearchInput({
  value,
  onChange,
  suggestions = [],
  onSelectSuggestion,
  disabled,
}) {
  return (
    <div className="relative w-full">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2   focus-within:border-transparent transition-all duration-200">
        <div className="pl-3 pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search books..."
          disabled={disabled}
          className="w-full p-2 border-0 focus:ring-0 text-sm bg-transparent"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => onSelectSuggestion(suggestion)}
            >
              <div className="font-medium">{suggestion.title}</div>
              {suggestion.authors && (
                <div className="text-xs text-gray-500">
                  {suggestion.authors.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
