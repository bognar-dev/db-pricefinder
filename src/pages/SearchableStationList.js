import React, { useState, useEffect } from 'react';
import stations from '/public/allstations.csv';

const SearchableStationList = () => {
  const hallo = "";
  const [searchTerm, setSearchTerm] = useState('');
  const [stationsList, setStationsList] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setStationsList(stations);
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setSuggestions(stationsList.filter(station => station.name.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const handleStationSelection = (_id) => {
    setSelectedStation(stationsList.find(station => station._id === _id));
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map(station => (
            <li key={station._id} onClick={() => {
              setSearchTerm(station.name);
              setSuggestions([]);
              handleStationSelection(station._id);
            }}>
              {station.name}
            </li>
          ))}
        </ul>
      )}
      {selectedStation && (
        <div>
          You have selected: {selectedStation.name} ({selectedStation._id})
        </div>
      )}
    </div>
  );
};

export default SearchableStationList;
