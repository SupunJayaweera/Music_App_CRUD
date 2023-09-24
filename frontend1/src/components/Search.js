import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const searchContainerRef = useRef(null); // Added state for suggestions

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
    setSearchResults([]);
  };

  // Implement auto-suggestions logic here
  const handleAutoSuggestions = async (inputValue) => {
    setSearchQuery(inputValue); // Set the search query as you type
    if (!inputValue.trim()) {
      setSuggestions([]); // Clear suggestions if the input is empty
      return;
    }

    try {
      const response = await axios.get(`search?query=${inputValue}`);
      setSuggestions(response.data); // Set suggestions based on the input value
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Add an event listener to detect clicks outside the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        // Clicked outside the search container, clear the search results
        setSearchResults([]);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="container">
        <form className="d-flex justify-content-between">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleAutoSuggestions(e.target.value); // Call auto-suggestions when typing
            }}
          />

          <button
            type="button"
            className="btn btn-outline-light my-2 my-sm-0"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>
      {/* Display auto-suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-secondary bg-gradient p-2 text-dark bg-opacity-75 rounded-3">
          <ul>
            {suggestions.map((suggestion) => (
              <li
                className="text-light"
                key={suggestion._id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display search results */}
      {searchResults.map((result) => (
        <div className="bg-success bg-gradient p-2 text-dark bg-opacity-75 rounded-3">
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
