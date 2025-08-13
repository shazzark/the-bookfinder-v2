import { useBookSuggestions } from "../hooks/useBookSuggestions";
import SearchSection from "./SearchSection.jsx";
// import SearchSection from "./SearchSection";
import SideHeader from "./SideHeader";

function DiscoverHeader({ onSearch, searching = false, onProfileClick }) {
  const {
    searchQuery,
    suggestions,
    showSuggestions,
    handleInputChange,
    handleSelectSuggestion,
  } = useBookSuggestions(onSearch);

  return (
    <header className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        {/* Search Section - takes priority space */}
        <div className="flex-1 min-w-0">
          <SearchSection
            searchQuery={searchQuery}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            onInputChange={handleInputChange}
            onSelectSuggestion={handleSelectSuggestion}
            disabled={searching}
          />
        </div>

        {/* Side Header - collapses on small screens */}
        <div className="flex-shrink-0">
          <SideHeader onProfileClick={onProfileClick} compact />
        </div>
      </div>
    </header>
  );
}

export default DiscoverHeader;
