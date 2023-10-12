import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MusicPlayerPopup from "./MusicPlayerPopup";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const searchContainerRef = useRef(null); // Added state for suggestions

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    setSuggestions([]);
    try {
      const response = await axios.get(`search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setSuggestions([]); // Clear all suggestions
  };

  // Implement auto-suggestions logic here
  const handleAutoSuggestions = async (inputValue) => {
    setSearchQuery(inputValue);

    if (!inputValue.trim()) {
      setSuggestions([]); // Clear suggestions if the input is empty
      return;
    }

    try {
      const response = await axios.get(`search?query=${inputValue}`);
      const fetchedSuggestions = response.data;

      // Filter and keep only suggestions that contain the matching text
      const filteredSuggestions = fetchedSuggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      // Sort filtered suggestions based on matching text
      const sortedSuggestions = filteredSuggestions.sort((a, b) => {
        const aMatch = a.name.toLowerCase().includes(inputValue.toLowerCase());
        const bMatch = b.name.toLowerCase().includes(inputValue.toLowerCase());

        if (aMatch && !bMatch) {
          return -1;
        } else if (!aMatch && bMatch) {
          return 1;
        } else {
          return 0;
        }
      });

      setSuggestions(sortedSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleResultClick = (result) => {
    setSelectedResult(result); // Set the selected result when a result is clicked
  };

  // Add an event listener to detect clicks outside the search container
  useEffect(() => {
    console.log("useEffect is running");

    const handleClickOutside = (event) => {
      console.log("searchContainerRef.current:", searchContainerRef.current);
      console.log("event.target:", event.target);
      if (event.target != null) {
        // event.target.style.display = "none";
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        // Clicked outside the search container, clear the suggestions
        setSuggestions([]);
        //setSearchResults([]);
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
      <div className="container" ref={searchContainerRef}>
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
        <div
          className="bg-success bg-gradient p-2 text-dark bg-opacity-75 rounded-3"
          key={result._id}
          onClick={() => handleResultClick(result)} // Handle result click
        >
          <ul>{result && result.name}</ul>
        </div>
      ))}

      {/* Display the MusicPlayerPopup when a result is selected */}
      {selectedResult && (
        <MusicPlayerPopup
          songUrl={selectedResult.songUrl}
          onClose={() => setSelectedResult(null)} // Add a close handler
        />
      )}
    </div>
  );
}

export default Search;
