import './App.css';
import React from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Search from './components/Search';
import DayPreview from './components/DayPreview';
import DayDetails from './components/DayDetails';

function App() {

  const [city, setCity] = React.useState("Coquitlam");
  const [weatherData, setWeatherData] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState();
  const [selectedTimestamp, setSelectedTimestamp] = React.useState();

  function handleChange(event) {
    setCity(event.target.value);
  }

  function searchCity() {
    getWeatherData();
  }

  function selectDay(day) {
    setSelectedDay(day);
    setSelectedTimestamp(day.timestamps[0]);
  }

  function selectTimestamp(timestamp) {
    setSelectedTimestamp(timestamp);
  }

  // Helper functions
  function getMonthName(date) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[date.getMonth()]
  }

  function getWeekday(date) {
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekdays[date.getDay()];
  }

  function createTimestampObject(entry) {
    const timestamp = {
      time: entry.dt,
      temp: Math.round(entry.main.temp - 273.15), // celsius
      description: entry.weather[0].description,
      clouds: entry.clouds.all,                   // percentage
      wind: Math.round(entry.wind.speed * 3.6),   // km/h
      precipitation: Math.round(entry.pop * 100), // percentage
      humidity: entry.main.humidity,              // percentage
      icon: entry.weather[0].icon.slice(0, -1)              
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
              const currentDate = new Date(entry.dt * 1000);

              // First 8 timestamps get added to day 1 in any case
              if (i < 8) {

                // First day element gets created on the first loop
                if (i === 0) {
                  // Day object is created with date and month taken from current timestamp
                  const day = {
                    date: currentDate.getDate(),
                    month: getMonthName(currentDate),
                    weekday: getWeekday(currentDate),
                    city: response.data.city.name,
                    country: response.data.city.country,
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
              if (currentDate.getDate() > today.getDate() && currentDate.getDate() < today.getDate() + 5) {
                
                // If day object is missing in the array, create it
                if (!days.some(day => day.date === currentDate.getDate())) {
                  const day = {
                    date: currentDate.getDate(),
                    month: getMonthName(currentDate),
                    weekday: getWeekday(currentDate),
                    city: response.data.city.name,
                    country: response.data.city.country,
                    timestamps: []
                  };
                  day.timestamps.push(createTimestampObject(entry));
                  days.push(day);

                } else {

                  /* Search for a day object with the same date as the timestamp's
                  so we can add it to the correct day */
                  const index = days.findIndex(day => day.date === currentDate.getDate());
                  days[index].timestamps.push(createTimestampObject(entry));
                  
                }

              }

            }

            setWeatherData(days);
            setSelectedDay(days[0]);
            setSelectedTimestamp(days[0].timestamps[0]);
          })
  }

  React.useEffect(() => {
    getWeatherData();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const dayPreviewElements = weatherData.map(day => {
    return <DayPreview
            key={nanoid()}
            day={day}
            handleClick={() => selectDay(day)}
            isSelected={day === selectedDay ? true : false}
          />;
  });

  return (
    <div className="App">
      <Search
        handleChange={handleChange}
        handleClick={searchCity}
        city={city}
      />
      <div className="day-previews">
        {dayPreviewElements}
      </div>
      {selectedDay &&
        <DayDetails
          day={selectedDay}
          selectedTimestamp={selectedTimestamp}
          handleClick={selectTimestamp}
      />}
    </div>
  );
}

export default App;
