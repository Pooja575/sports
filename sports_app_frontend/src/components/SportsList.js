import React from 'react';

const SportsList = ({ sports }) => {
  console.log('Sports List Data:', sports); // Debugging line

  if (!sports || sports.length === 0) {
    return <p>No sports available</p>;
  }

  return (
    <ul>
      {sports.map((sport) => (
        <li key={sport._id || sport.key}>{sport.title}</li>
      ))}
    </ul>
  );
};

export default SportsList;
