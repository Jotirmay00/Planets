import React, { useState, useEffect } from "react";

const ResidentsDisplay = ({ residentUrls }) => {
  const [residents, setResidents] = useState([]);
  const [showResidents, setShowResidents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (showResidents) {
      const fetchResidents = async () => {
        setLoading(true);
        try {
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
  }, [residentUrls, showResidents]);

  const toggleShowResidents = () => {
    setShowResidents(!showResidents);
  };

  return (
    <div>
      <button
        onClick={toggleShowResidents}
        className="text-slate-300 font-semibold focus:outline-none transition hover:text-blue-500"
      >
        {showResidents ? "Hide Residents" : "Residents :"}
      </button>
      {loading && <div className="mt-4 text-center">Loading...</div>}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {showResidents && residents.length > 0 && !loading ? (
        <div className="mt-4 max-h-40 overflow-y-auto">
          <h3 className="text-lg font-semibold">Residents:</h3>
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
        showResidents &&
        !loading &&
        !errorMessage && <p className="text-red-500">No residents found.</p>
      )}
    </div>
  );
};

export default ResidentsDisplay;
