import React, { useState, useEffect } from "react";

const FilmsDisplay = ({ films }) => {
  // State variables
  const [showDetails, setShowDetails] = useState(false); // Indicates if film details should be displayed
  const [filmDetails, setFilmDetails] = useState([]); // Stores film details data
  const [errorMessage, setErrorMessage] = useState(""); // Stores error message if any

  // Effect to fetch film details when films prop changes
  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        // Fetch film details for each URL in films
        const promises = films.map((url) =>
          fetch(url).then((response) => response.json())
        );
        const filmsData = await Promise.all(promises);
        setFilmDetails(filmsData);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching film details:", error);
        setErrorMessage("Error fetching film details. Please try again later.");
      }
    };

    fetchFilmDetails();
  }, [films]); // Dependency: films

  // Function to toggle showDetails state
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Render component
  return (
    <div>
      {/* Button to toggle showing film details */}
      <button
        onClick={toggleDetails}
        className="focus:outline-none font-semibold text-slate-300 transition hover:text-blue-500"
      >
        {showDetails ? "Hide Films Details" : "Film Details :"}
      </button>

      {/* Error message */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {/* Display film details if showDetails is true */}
      {showDetails && (
        <div className="mt-2 max-h-40 overflow-y-auto">
          <h3 className="text-lg font-semibold">Films:</h3>
          {/* Check if filmDetails array is not empty */}
          {filmDetails.length > 0 ? (
            // Map through filmDetails and display film details
            filmDetails.map((film, index) => (
              <div
                key={film.url}
                className={`mt-2 ${
                  index !== filmDetails.length - 1
                    ? " pb-4 border-b border-gray-500"
                    : ""
                }`}
              >
                <p>
                  <span className="font-semibold">Title:</span> {film.title}
                </p>
                <p>
                  <span className="font-semibold">Director:</span>{" "}
                  {film.director}
                </p>
                <p>
                  <span className="font-semibold">Producer:</span>{" "}
                  {film.producer}
                </p>
                <p>
                  <span className="font-semibold">Release Date:</span>{" "}
                  {film.release_date}
                </p>
                <p>
                  <span className="font-semibold">Opening Crawl:</span>{" "}
                  {film.opening_crawl}
                </p>
              </div>
            ))
          ) : (
            // Display message if no film details found
            <p className="text-red-500 mt-2">No film details available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FilmsDisplay;
