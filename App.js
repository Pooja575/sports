import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SportsList from './components/SportsList';

const App = () => {
  const [sports, setSports] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchSportsData();
  }, []);

  const fetchSportsData = async () => {
    try {
      const response = await axios.get('https://api.the-odds-api.com/v4/sports?apiKey=e2455acb1c45d5bafad5239f40afbcc9');
      console.log(response.data); // Log the API response to inspect its structure
      setSports(response.data);
      setFilteredSports(response.data);
    } catch (error) {
      console.error('Error fetching sports data:', error);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    const filtered = sports.filter(sport =>
      sport.name.toLowerCase().includes(searchValue.toLowerCase()) // Adjust field name as needed
    );
    console.log(filtered); // Log filtered results for debugging
    setFilteredSports(filtered);
  };

  const handleSort = () => {
    const sorted = [...filteredSports].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name); // Adjust field name as needed
      } else {
        return b.name.localeCompare(a.name); // Adjust field name as needed
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
