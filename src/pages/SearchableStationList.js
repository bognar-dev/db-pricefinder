import React, { useState, useEffect } from 'react';
import * as stationData from '/public/stations.json';

const SearchableStationList = ({ onStationSelection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [stations, setStations] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setStations(stationData.default);
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedStation(null);
    if (searchTerm.length >= 3) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  const handleStationSelection = (id) => {
    const selected = stations.find(station => station.id === id);
    setSelectedStation(selected);
    setSearchTerm(selected.name);
    setDropdownOpen(false);
    onStationSelection(selected);
  };

  const filteredStations = 
    stations.filter(
    station => station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input class="location-select"type="text" value={searchTerm} onChange={handleSearchTermChange} />
      {dropdownOpen && (
        <ul>
          {filteredStations.map(station => (
            <li tabIndex="-1" key={station.id} onClick={() => handleStationSelection(station.id)}>
              {station.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableStationList;