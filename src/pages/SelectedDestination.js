


default export function SelectedDestination({ destination, onBackClick }) {
  return (
    <div class="selected-destination single-card">
      <h2>Details for {destination.destination.name}:</h2>
      {destination.journeysTo.map((journeys, idx) => (
        <div key={idx}> Depature: {new Date(journeys.legs[0].departure).toString()} </div>
      ))}
      <button class="back-button" onClick={onBackClick}>Back to Results</button>
    </div>
  );
}