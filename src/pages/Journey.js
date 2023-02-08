import { React, useEffect, useState } from 'react';

const Journey = ({ selectedJourney , onBackClick}) => {


    if(selectedJourney===undefined){
        console.log(selectedJourney)
        return(
            <>
            <div>Hothinfg</div>
            <button class="back-button" onClick={onBackClick}>Back</button>
            </>
        )
    }
  return (
    <div class="card">
      {selectedJourney.legs.map((leg, index) => (
        <div key={index}>
          <p>
            Origin: {leg.origin.name}, Destination: {leg.destination.name}
          </p>
          <p>
            Departure: {leg.departure}, Arrival: {leg.arrival}
          </p>
          <p>Line: {leg.line.name}</p>
        </div>
      ))}
       <button class="back-button" onClick={onBackClick}>Back</button>
    </div>
   
  );
};

export default Journey;
