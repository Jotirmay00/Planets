import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import PlanetCard from "./PlanetCard";
import Pagination from "./Pagination";

const PlanetsDirectory = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPlanets = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setPlanets(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setCurrentPage(getPageNumberFromUrl(url));
    } catch (error) {
      console.error("Error fetching planets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanets("https://swapi.dev/api/planets/?format=json");
  }, []);

  const handleNextPage = async () => {
    if (nextPage) {
      await fetchPlanets(nextPage);
    }
  };

  const handlePrevPage = async () => {
    if (prevPage) {
      await fetchPlanets(prevPage);
    }
  };

  const getPageNumberFromUrl = (url) => {
    if (!url) return 1;
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1]) : 1;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center text-white bg-black rounded-full">Planets Directory</h1>
      <div className="relative">
        {loading && <Spinner />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {planets.map((planet) => (
            <PlanetCard key={planet.url} planet={planet} />
          ))}
        </div>
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
