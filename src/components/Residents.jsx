import React, { useState, useEffect } from "react";

const ResidentsDisplay = ({ residentUrls }) => {
  // State variables
  const [residents, setResidents] = useState([]); // Stores resident data
  const [showResidents, setShowResidents] = useState(false); // Indicates if residents should be displayed
  const [loading, setLoading] = useState(false); // Indicates if data is being loaded
  const [errorMessage, setErrorMessage] = useState(""); // Stores error message if any

  // Effect to fetch residents data when showResidents or residentUrls change
  useEffect(() => {
    // Fetch residents data if showResidents is true
    if (showResidents) {
      const fetchResidents = async () => {
        setLoading(true);
        try {
          // Fetch resident data for each URL in residentUrls
          const promises = residentUrls.map((url) =>
            fetch(url).then((response) => response.json())
          );
          const residentsData = await Promise.all(promises);
          setResidents(residentsData);
          setErrorMessage("");
        } catch (error) {
          console.error("Error fetching residents:", error);
          setErrorMessage("Error fetching residents. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchResidents();
    }
  }, [residentUrls, showResidents]); // Dependencies: residentUrls and showResidents

  // Function to toggle showResidents state
  const toggleShowResidents = () => {
    setShowResidents(!showResidents);
  };

  // Render component
  return (
    <div>
      {/* Button to toggle showing residents */}
      <button
        onClick={toggleShowResidents}
        className="text-slate-300 font-semibold focus:outline-none transition hover:text-blue-500"
      >
        {showResidents ? "Hide Residents" : "Residents :"}
      </button>

      {/* Loading indicator */}
      {loading && <div className="mt-4 text-center">Loading...</div>}

      {/* Error message */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {/* Display residents if showResidents is true */}
      {showResidents && residents.length > 0 && !loading ? (
        <div className="mt-4 max-h-40 overflow-y-auto">
          <h3 className="text-lg font-semibold">Residents:</h3>
          {/* Map through residents and display their information */}
          {residents.map((resident, index) => (
            <div
              key={resident.url}
              className={`mt-2 ${
                index !== residents.length - 1
                  ? " pb-4 border-b border-gray-500"
                  : ""
              }`}
            >
              <p>
                <span className="font-semibold">Name:</span> {resident.name}
              </p>
              <p>
                <span className="font-semibold">Height:</span> {resident.height}
              </p>
              <p>
                <span className="font-semibold">Mass:</span> {resident.mass}
              </p>
              <p>
                <span className="font-semibold">Gender:</span> {resident.gender}
              </p>
            </div>
          ))}
        </div>
      ) : (
        // Display message if no residents found
        showResidents &&
        !loading &&
        !errorMessage && <p className="text-red-500">No residents found.</p>
      )}
    </div>
  );
};

export default ResidentsDisplay;
