import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SportsList from './components/SportsList';

const App = () => {
  const [sports, setSports] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-sports');
        console.log('Fetched sports data:', response.data); // Debugging line
        if (Array.isArray(response.data)) {
          setSports(response.data);
          setFilteredSports(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching sports data:', error);
      }
    };

    fetchSportsData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = sports.filter((sport) =>
      sport.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSports(filtered);
  };

  const handleSort = () => {
    const sorted = [...filteredSports].sort((a, b) => a.title.localeCompare(b.title));
    setFilteredSports(sorted);
  };

  return (
    <div>
      <h1>Sports Dashboard</h1>
      <input
        type="text"
        placeholder="Search sports..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleSort}>Sort by Title</button>
      <SportsList sports={filteredSports} />
    </div>
  );
};

export default App;
