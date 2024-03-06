import React from "react";
import PlanetsDirectory from "./components/PlanetsDirectory";
import backgroundImage from "./assets/background.jpg"; // Import the background image

function App() {
  return (
    <div className="h-full" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <PlanetsDirectory />
    </div>
  );
}

export default App;
