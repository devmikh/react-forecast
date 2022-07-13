import './App.css';
import React from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Search from './components/Search';
import DayPreview from './components/DayPreview';

function App() {

  const [city, setCity] = React.useState("Coquitlam");
  const [weatherData, setWeatherData] = React.useState([]);

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleClick() {
    getWeatherData();
  }

  function createTimestampObject(entry) {
    const timestamp = {
      time: entry.dt,
      temp: Math.round(entry.main.temp - 273.15), // celsius
      description: entry.weather[0].description,
      clouds: entry.clouds.all,                   // percentage
      wind: entry.wind.speed,                     // meters per second
      precipitation: entry.pop * 100,             // percentage
      humidity: entry.main.humidity,
      icon: entry.weather[0].icon.slice(0, -1)              // percentage
    };
    return timestamp;
  }

  function getWeatherData() {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
          .then(response => {

            const days = [];
            let today = new Date(response.data.list[0].dt * 1000);

            for (let i = 0; i < response.data.list.length; i++) {

              let entry = response.data.list[i];
              const currentTimestamp = new Date(entry.dt * 1000);

              // First 8 timestamps get added to day 1 in any case
              if (i < 8) {

                // First day element gets created on the first loop
                if (i === 0) {
                  // Day object is created with date and month taken from current timestamp
                  const day = {
                    date: currentTimestamp.getDate(),
                    month: currentTimestamp.getMonth(),
                    timestamps: []
                  };
                  /*  Create timestamp object with all weather data related to this timestamp
                      And push it to timestamps array */
                  day.timestamps.push(createTimestampObject(entry));
                  days.push(day);
                } else {
                  days[0].timestamps.push(createTimestampObject(entry));
                }
              }
              
              // Other timestamps get added to days 2, 3, 4 and 5, no further
              if (currentTimestamp.getDate() > today.getDate() && currentTimestamp.getDate() < today.getDate() + 5) {
                
                // If day object is missing in the array, create it
                if (!days.some(day => day.date === currentTimestamp.getDate())) {
                  const day = {
                    date: currentTimestamp.getDate(),
                    month: currentTimestamp.getMonth(),
                    timestamps: []
                  };
                  day.timestamps.push(createTimestampObject(entry));
                  days.push(day);

                } else {

                  /* Search for a day object with the same date as the timestamp's
                  so we can add it to the correct day */
                  const index = days.findIndex(day => day.date === currentTimestamp.getDate());
                  days[index].timestamps.push(createTimestampObject(entry));
                  
                }

              }

            }

            setWeatherData(days);
          })
  }

  React.useEffect(() => {
    getWeatherData();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const dayPreviewElements = weatherData.map(day => {
    const date = new Date(day.timestamps[0].time * 1000);
    return <DayPreview
            key={nanoid()}
            weekday={date.getDay()}
            date={date.getDate()}
            timestamps={day.timestamps}
          />;
  });

  return (
    <div className="App">
      <Search
        handleChange={handleChange}
        handleClick={handleClick}
        city={city}
      />
      {weatherData &&
      <div className="day-previews">
        {dayPreviewElements}
      </div>}
    </div>
  );
}

export default App;
