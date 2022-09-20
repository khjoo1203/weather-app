import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  console.log('cities?', cities);
  return (
    <div class="black">
      <Button
        variant={`${selectedCity == null ? 'outline-warning' : 'warning'}`}
        onClick={() => handleCityChange('current')}
      >
        현재위치
      </Button>
      {cities.map((city, index) => (
        <Button
          variant={`${selectedCity == city ? 'outline-warning' : 'warning'}`}
          key={index}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
