import React, { useState, useEffect } from "react";

const FilmsDisplay = ({ films }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [filmDetails, setFilmDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
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
  }, [films]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <button
        onClick={toggleDetails}
        className="focus:outline-none font-semibold text-slate-300 transition hover:text-blue-500"
      >
        {showDetails ? "Hide Films Details" : "Film Details :"}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {showDetails && (
        <div className="mt-2 max-h-40 overflow-y-auto">
          <h3 className="text-lg font-semibold">Films:</h3>
          {filmDetails.length > 0 ? (
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
            <p className="text-red-500 mt-2">No film details available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FilmsDisplay;
