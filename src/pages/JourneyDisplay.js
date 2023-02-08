import { React, useEffect, useState } from 'react';

const JourneyDisplay = ({ journeyData, handleJourneyClick }) => {
  if (journeyData === undefined) {
    return;
  }


  if (journeyData.legs.length >= 2) {
    return (
      <div class="card" onClick={() => handleJourneyClick(journeyData)} >

        <p> Origin: {journeyData.legs[0].origin.name}, Destination: {journeyData.legs[(journeyData.legs.length-1)].destination.name}
        </p>
        <p>
          Departure: {journeyData.legs[0].departure}, Arrival: {journeyData.legs[(journeyData.legs.length-1)].arrival}
        </p>

      </div>

    );
  }
  return (
    <div class="card" onClick={() =>handleJourneyClick(journeyData)} >

      <p> Origin: {journeyData.legs[0].origin.name}, Destination: {journeyData.legs[0].destination.name}
          </p>
          <p>
            Departure: {journeyData.legs[0].departure}, Arrival: {journeyData.legs[0].arrival}
          </p>
    </div>

  );
};

export default JourneyDisplay;
