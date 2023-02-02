import { React, useEffect, useState } from 'react';
import { Results } from './Results';
export function SearchMenu() {

    const [journeys, setJourneys] = useState([]);
    const [loaded, setLoaded] = useState(false);
    async function handleSubmit(e) {
        setLoaded(false);
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
       ).then(data =>{
           console.log(data);
            setJourneys(data);
            setLoaded(true);
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
                        TimeFrame:<br></br>
                        Start:
                        <input class="date-selection" type="date" name="from_time"></input>
                        End:
                        <input class="date-selection" type="date" name="to_time"></input>
                    </div>
                    <input class="button-send" type="submit" value="Start searching"></input>
                </form>
            </div >
            {loaded ? (
       <Results journeys = {journeys}/>
      ) : (
        <p></p>
      )
      }
        
        </>
    );
}



