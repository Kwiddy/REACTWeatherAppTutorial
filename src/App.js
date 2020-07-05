import React, { useState } from 'react';

const api = {
  key: "9fe2d37b58eabd53ca5da89d0b51fe35",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setWeather(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return day + " " + date + " " + month + " " + year
  }

  const changeBckgrnd = (d) => {
    let tempCol = "";
    if (d < 16) {
      tempCol = "#5CCACC";
    } else {
      tempCol = "#F5D245";
    }
    document.documentElement.style
      .setProperty('--backgroundPrim', tempCol);
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter a location..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
        <div className="weather">{weather.weather[0].main}</div>
          </div>
        <div className ="additionalInfo">
          <b>Feels like:</b> {weather.main.feels_like}°c {changeBckgrnd(Math.round(weather.main.temp))} <br/>
          <b>Max. Temperature:</b> {weather.main.temp_max}°c <br/>
          <b>Min. Temperature:</b> {weather.main.temp_min}°c <br/>
          <br/> 
          <b>Humidity:</b> {weather.main.humidity}% <br/>
          <b>Wind speed:</b> {weather.wind.speed}mph <br/>
        </div>
        </div>
        ) : (
          <div className="defaultHome">
            No Location Selected
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
