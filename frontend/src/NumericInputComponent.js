// NumericInputComponent.js

import React, { useState } from 'react';

const NumericInputComponent = () => {
  const [foodData, setFoodData] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [responseJson, setResponseJson] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4200/food/${inputValue}`);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Data received:', data);
      setFoodData(data);
      setResponseJson(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error fetching food data:', error);
      setResponseJson('Error fetching food data.');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    fetchData();
  };

  return (
    <div>
      <h2>Food Details</h2>
      <p>Food ID: {inputValue}</p>
      <label>
        Enter a numeric value:
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleSearchClick}>Buscar</button>
      <p>Food Data:</p>
      <textarea
        rows="10"
        cols="50"
        value={responseJson}
        readOnly
        style={{ whiteSpace: 'pre-wrap' }}
      />
    </div>
  );
};

export default NumericInputComponent;