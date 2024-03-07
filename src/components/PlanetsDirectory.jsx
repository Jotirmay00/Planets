import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import PlanetCard from "./PlanetCard";
import Pagination from "./Pagination";

const PlanetsDirectory = () => {
  // State variables
  const [planets, setPlanets] = useState([]); // Stores planet data
  const [nextPage, setNextPage] = useState(""); // Stores URL for next page of planets
  const [prevPage, setPrevPage] = useState(""); // Stores URL for previous page of planets
  const [currentPage, setCurrentPage] = useState(1); // Stores current page number
  const [loading, setLoading] = useState(false); // Indicates if data is being loaded

  // Function to fetch planets data from SWAPI
  const fetchPlanets = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setPlanets(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setCurrentPage(getPageNumberFromUrl(url)); // Update current page number
    } catch (error) {
      console.error("Error fetching planets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to extract page number from URL
  const getPageNumberFromUrl = (url) => {
    if (!url) return 1;
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1]) : 1;
  };

  // Fetch planets data when component mounts
  useEffect(() => {
    fetchPlanets("https://swapi.dev/api/planets/?format=json");
  }, []);

  // Function to handle fetching next page of planets
  const handleNextPage = async () => {
    if (nextPage) {
      await fetchPlanets(nextPage);
    }
  };

  // Function to handle fetching previous page of planets
  const handlePrevPage = async () => {
    if (prevPage) {
      await fetchPlanets(prevPage);
    }
  };

  // Render component
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page title */}
      <h1 className="text-4xl font-bold mb-4 pb-4 text-center text-white bg-black rounded-full">Planets Directory</h1>
      
      {/* Loading spinner */}
      <div className="relative">
        {loading && <Spinner />}
        
        {/* Grid for displaying planet cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {planets.map((planet) => (
            <PlanetCard key={planet.url} planet={planet} />
          ))}
        </div>
        
        {/* Pagination component */}
        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
};

export default PlanetsDirectory;
