export default function Results({ journeys = [], onCardClick }) {

    return (
        <div class="card-container">
            {journeys.map((data, idx) => (

                <div class="card" key={idx} onClick={() => onCardClick(data)}>
                    <div class="container">
                        <h4>{data.destination.name}</h4>
                        <hr></hr>
                        <p>from: {data.journeysTo[0].price.amount} {data.journeysTo[0].price.currency}</p>
                    </div>
                </div>

            ))}
        </div>
    );
}
