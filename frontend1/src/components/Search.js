import React, { useState } from "react";
import axios from "axios";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // Added state for suggestions

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    try {
      const response = await axios.get(`search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    handleSearch();
  };

  // Implement auto-suggestions logic here
  const handleAutoSuggestions = async (inputValue) => {
    // Add your code to fetch and set suggestions based on inputValue
    // For example, you can fetch suggestions from your backend or filter searchResults
    const filteredSuggestions = searchResults.filter((result) =>
      result.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleAutoSuggestions(e.target.value); // Call auto-suggestions when typing
        }}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display auto-suggestions */}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}

      {/* Display search results */}
      {searchResults.map((result) => (
        <div className="bg-secondary">
          <ul>
            <a
              className="text-light"
              key={result._id}
              href={`/song/${result._id}`} // Replace with the appropriate URL
            >
              {result && result.name}
            </a>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Search;
