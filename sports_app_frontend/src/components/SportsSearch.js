// src/components/SportsSearch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SportsSearch = () => {
  const [sports, setSports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSports, setFilteredSports] = useState([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get('/api/sports');
        setSports(response.data);
      } catch (error) {
        console.error('Error fetching sports data:', error);
      }
    };
    fetchSports();
  }, []);

  useEffect(() => {
    const searchSports = async () => {
      try {
        const response = await axios.get('/api/search', {
          params: { term: searchTerm },
        });
        setFilteredSports(response.data);
      } catch (error) {
        console.error('Error searching sports data:', error);
      }
    };
    if (searchTerm) {
      searchSports();
    } else {
      setFilteredSports(sports);
    }
  }, [searchTerm, sports]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a sport..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredSports.map((sport) => (
          <li key={sport.key}>
            <h2>{sport.title}</h2>
            <p>{sport.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportsSearch;
