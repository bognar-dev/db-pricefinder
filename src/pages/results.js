export function Results({ journeys, onCardClick }) {

    return (
        <div class="card-container">
            {journeys.map((data, idx) => (

                <div class="card" key={idx} onClick={() => onCardClick(data)}>
                    <div class="container">
                        <h2>{data.destination.name}</h2>
                        <hr></hr>
                        <p>from: {data.journeysTo[0].price.amount} {data.journeysTo[0].price.currency}</p>
                    </div>
                </div>

            ))}
        </div>
    );
}