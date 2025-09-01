// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { useBookSuggestions } from "../../hooks/useBookSuggestions";
import SideHeader from "../navigation/SideHeader";
import SearchSection from "./SearchSection.jsx";
// import SearchSection from "./SearchSection";

export default function DiscoverHeader({ onSearch, onProfileClick }) {
  const {
    searchQuery,
    suggestions,
    showSuggestions,
    handleInputChange,
    handleSelectSuggestion,
  } = useBookSuggestions(onSearch);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-100 p-4 rounded-lg"
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <SearchSection
            searchQuery={searchQuery}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            onInputChange={handleInputChange}
            onSelectSuggestion={handleSelectSuggestion}
          />
        </div>
        <div className="flex-shrink-0">
          <SideHeader onProfileClick={onProfileClick} compact />
        </div>
      </div>
    </motion.header>
  );
}
