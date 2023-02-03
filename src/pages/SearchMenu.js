import { React, useEffect, useState } from 'react';
import { Results } from './Results';
export function SearchMenu() {

    const [journeys, setJourneys] = useState([]);
    const [loaded, setLoaded] = useState('notloading');
    const [selectedDestination, setSelectedDestination] = useState(null);

    function clickTest() {
        console.log("test")
    }

    function handleCardClick(destination) {
        setSelectedDestination(destination);
    }

    function handleBackClick() {
        setSelectedDestination(null);
    }

    async function handleSubmit(e) {
        setLoaded('loading');
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        // You can pass formData as a fetch body directly:
        // You can work with it as a plain object.
        const formJson = Object.fromEntries(formData.entries());
        console.log("prefetch")
        console.log(formJson)
        fetch('api/sendJourneys', {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formJson)
        }).then(res =>
            res.json()
        ).then(data => {
            console.log(data);
            setJourneys(data);
            setLoaded('loaded');
        });
    }



    return (
        <>
            <div id="main-form-container">
                <form method="POST" onSubmit={handleSubmit}>
                    <label for="from_location">From:</label>
                    <select id="select-from" name="from_location" required>
                        <option value="">Select Location</option>
                        <option value="8000253">Mönchengladbach</option>
                        <option value="8098096">Stuttgart</option>
                    </select>
                    <div id="time-frame">
                        <h2>Please pick your time of travel: </h2>
                        <label for="from_time">From</label>
                        <input id="from-time" class="date-selection" type="date" name="from_time"></input>
                        <label>Until</label>
                        <input class="date-selection" type="date" name="to_time"></input>
                    </div>
                    <input class="button-send" type="submit" value="Start searching"></input>
                </form>
            </div >

            {loaded === 'loading' && <div class="loader"></div>}
            {loaded === 'loaded' && !selectedDestination && <Results journeys={journeys} onCardClick={handleCardClick} />}
            {selectedDestination && <SelectedDestination destination={selectedDestination} onBackClick={() => setSelectedDestination(null)} />}


        </>
    );
}



function SelectedDestination({ destination , onBackClick}) {
    return (
      <div class="selected-destination">
        <h2>Details for Destination: {destination.destination.name}</h2>
        <p>Price: {destination.journeysTo[0].price.amount}</p>
        <button class="back-button" onClick={onBackClick}>Back to Results</button>
      </div>
    );
  }