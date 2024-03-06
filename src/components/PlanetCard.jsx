import React from "react";
import ResidentsDisplay from "./Residents";
import FilmsDisplay from "./Films";

const PlanetCard = ({ planet }) => {
  return (
    <div className="rounded-lg shadow-lg shadow-slate-100 border transform transition duration-300 hover:scale-105 text-white bg-opacity-50 backdrop-filter backdrop-blur-sm p-6 bg-slate-600">
      <h2 className="text-xl font-semibold mb-2 text-slate-300">{planet.name}</h2>
      <p>
        <span className="font-semibold text-slate-300">Climate : </span> {planet.climate}
      </p>
      <p>
        <span className="font-semibold text-slate-300">Population : </span> {planet.population}
      </p>
      <p>
        <span className="font-semibold text-slate-300">Terrain : </span> {planet.terrain}
      </p>
      <ResidentsDisplay residentUrls={planet.residents} />
      <FilmsDisplay films={planet.films} />
    </div>
  );
};

export default PlanetCard;
