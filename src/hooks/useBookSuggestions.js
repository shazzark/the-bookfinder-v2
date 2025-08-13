import { useState } from "react";

export const useBookSuggestions = (onSearch) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}&maxResults=5`
        );
        const data = await response.json();
        const bookSuggestions =
          data.items?.map((item) => ({
            id: item.id,
            title: item.volumeInfo?.title || "Untitled",
            authors: item.volumeInfo?.authors || ["Unknown Author"],
          })) || [];
        setSuggestions(bookSuggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchSuggestions(value);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    onSearch(suggestion.title);
    setSuggestions([]);
  };

  return {
    searchQuery,
    suggestions,
    showSuggestions,
    handleInputChange,
    handleSelectSuggestion,
  };
};
