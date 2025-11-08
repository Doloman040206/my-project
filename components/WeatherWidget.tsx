import React, { useEffect, useState } from 'react';

export function PublicWeatherWidget() {
  const fetchWeather = async () => {
    const responce = await fetch('/api/weather');
    const data = await responce.json();
    console.warn('fetchWeather response', data);
    setWeather(data.weather);
  };

  const [weather, setWeather] = useState('');
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
      <div
        style={{ fontSize: '1.2rem', marginLeft: '30px', marginTop: '20px', fontWeight: 'bold' }}
      >
        Weather is {weather}
      </div>
      <img
        src="./img/103.jpg"
        alt="weather"
        style={{ width: '300px', marginLeft: '530px', marginTop: '40px', marginBottom: '20px' }}
      />
    </>
  );
}
