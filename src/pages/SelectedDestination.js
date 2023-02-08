import JourneyDisplay from "./JourneyDisplay";
import Journey from "./Journey";
import { React, useEffect, useState } from 'react';

export default function SelectedDestination({ destination, onBackClick }) {
  const [selectedJourney, setSelectedJourney] = useState(null);


  

  function handleJourneyClick(journey) {
    setSelectedJourney(journey);

  }
  const toNiceDate = (d) => {
    return d.toLocaleDateString() + "Time: " + d.getHours() + ":" + d.getMinutes();
  }
  if (destination === undefined) {
    return <></>
  }
  return (
    <div class="selected-destination single-card">
      <h2>Details for {destination.destination.name}:</h2>
      {!selectedJourney && destination.journeysTo.map((journeys, idx) => (
        <div class="card-container">
         <JourneyDisplay journeyData={journeys} handleJourneyClick={handleJourneyClick} />
        </div>
      ))}
      {selectedJourney && <Journey selectedJourney={selectedJourney} onBackClick={() => setSelectedJourney(null)} />}
      {!selectedJourney&& <button class="back-button" onClick={onBackClick}>Back to Results</button>}
    </div>
  );
}