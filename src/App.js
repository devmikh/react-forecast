import './App.css';
import React from 'react';
import axios from 'axios';
import Search from './components/Search';

function App() {

  const [city, setCity] = React.useState("");

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleClick() {
    getWeatherData();
  }

  // const myVar = process.env.REACT_APP_API_KEY;
  function getWeatherData() {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
          .then(response => {
            console.log(response);
          })
  }

  return (
    <div className="App">
      <Search
        handleChange={handleChange}
        handleClick={handleClick}
        city={city}
      />
    </div>
  );
}

export default App;
