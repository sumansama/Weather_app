import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '6de24e505682c27de9845b6661ca0340'; // <-- Your API key

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setError('');
      setWeather(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">🌤️ Weather App</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Check</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-box">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p className="description">{weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p className="temp">🌡️ {weather.main.temp} °C</p>
            <p className="humidity">💧 Humidity: {weather.main.humidity}%</p>
            <p className="wind">🌬️ Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

