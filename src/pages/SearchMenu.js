import { React, useEffect, useState } from 'react';
import Results from './Results.js';
import SelectedDestination from './SelectedDestination.js';

export default function SearchMenu() {

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
                    <h2>Select your start location:</h2>
                    <select class="location-select" name="from_location" required>
                        <option value="">Select Location</option>
                        <option value="8000253">Mönchengladbach</option>
                        <option value="8098096">Stuttgart</option>
                    </select>
                        <h2>Please pick your time of travel: </h2>
                    <div id="time-frame">
                        <label for="from_time">From</label>
                        <input id="from-time" class="date-selection" type="date" name="from_time"></input>
                        <label>Until</label>
                        <input class="date-selection" type="date" name="to_time"></input>
                    </div>
                    <input class="form-button" type="submit" value="Start searching"></input>
                </form>
            </div >

            {loaded === 'loading' && <div class="loader"></div>}
            {loaded === 'loaded' && !selectedDestination && <Results journeys={journeys} onCardClick={handleCardClick} />}
            {selectedDestination && <SelectedDestination destination={selectedDestination} onBackClick={() => setSelectedDestination(null)} />}


        </>
    );
}



