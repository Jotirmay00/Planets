import React from "react";
import ResidentsDisplay from "./Residents";
import FilmsDisplay from "./Films";

// PlanetCard component displays information about a single planet
const PlanetCard = ({ planet }) => {
  return (
    // Container for the planet card with styling
    <div className="relative rounded-lg shadow-lg shadow-slate-100 border transform transition duration-300 hover:scale-105 text-white bg-opacity-50 backdrop-filter backdrop-blur-sm p-6 bg-slate-600">
      {/* Planet name */}
      <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold mb-2 text-white text-center bg-slate-700 py-2 px-4 rounded-full shadow-sm shadow-slate-100" style={{ maxWidth: "80%" }}>
        {planet.name}
      </h2>
      
      {/* Climate */}
      <p>
        <span className="font-semibold text-slate-300">Climate : </span> {planet.climate}
      </p>
      
      {/* Population */}
      <p>
        <span className="font-semibold text-slate-300">Population : </span> {planet.population}
      </p>
      
      {/* Terrain */}
      <p>
        <span className="font-semibold text-slate-300">Terrain : </span> {planet.terrain}
      </p>
      
      {/* Component to display residents */}
      <ResidentsDisplay residentUrls={planet.residents} />
      
      {/* Component to display films */}
      <FilmsDisplay films={planet.films} />
    </div>
  );
};

export default PlanetCard;
