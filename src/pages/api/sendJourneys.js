import { createDbHafas } from 'db-hafas';
import prices from 'db-prices';
import moment from 'moment-timezone';





export default async function handler(req, res) {

  console.log(req.body);
  const journeys = await priceSearch(req.body.from_location,req.body.from_time,req.body.to_time);
  const journeysFiltered = await filterJourneys(journeys,500);
  console.log(journeysFiltered);
  res.status(200).json(journeysFiltered);
}


async function priceSearch(location, startTime, endTime) {
  const tz = 'Europe/Berlin'
  // some monday in the future
  const when = moment.tz(Date.now(), tz)
  try {
      const journeys = await prices(location, '8011160', when);
      return journeys;
  } catch (err) {
      const journeys = await hafasSearch(location, startTime);

      return journeys;
  }

}



async function hafasSearch(location, startTime, endTime) {
  const destinations = [
      { name: 'Munich', id: '8000261' },
      { name: 'Paris', id: '8700011' },
      { name: 'Amsterdam-Centraal', id: '8400058' },
      { name: 'London St-Pancras', id: '7004428' },
      {name: 'Bruxelles-Midi', id:'8800004'},
      {name:'Hamburg Hbf', id:'8002549'}
  ]
  const allJourneys = [];
  const hafas = createDbHafas('db-priceFinder');
  // MGL to München Hbf
  for (const d of destinations) {
      const j = await hafas.journeys(location, d.id, {
          results: 20,
          departure: new Date(startTime),
          transfers: 4,
          transferTime: 3,
      });
      allJourneys.push({ destination: d, journeysTo: j.journeys });
  }
  //console.log(allJourneys);
  return allJourneys;

}

const filterJourneys = async (journeys, maxPrice) => {
  journeys.forEach(d => {
      /* d.journeysTo.forEach(j=>{
          console.log(j.price)
      }) */
      //console.log(d.journeysTo.price);
      d.journeysTo = d.journeysTo.filter(j => j.price != null)
          .filter(j => j.price.amount != null || j.price.amount != undefined)
          .filter(a => a.price.amount <= maxPrice)
          .sort((a, b) => a.price.amount - b.price.amount);
  })
  return journeys.filter(d => !(d.journeysTo.length === 0));

}

