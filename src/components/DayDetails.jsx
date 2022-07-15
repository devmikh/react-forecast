import { nanoid } from 'nanoid';

export default function DayDetails({day, selectedTimestamp, handleClick}) {

  function getTimeLabel(seconds) {
    const date = new Date(seconds * 1000);
    return `${date.getHours()}:00`;
  }

  const boldStyles = {
    fontWeight: "bold"
  };

  const regStyles = {
    fontWeight: "regular"
  }

  const timestampElements = day.timestamps.map(timestamp => {
    return (
      <div
        key={nanoid()}
        onClick={() => handleClick(timestamp)}
        className="day-details--timestamp"
        style={timestamp === selectedTimestamp ? boldStyles : regStyles}
      >
        <img src={`http://openweathermap.org/img/wn/${timestamp.icon}d@2x.png`} alt="weather icon" />
        <p>{getTimeLabel(timestamp.time)}</p>
      </div>
    )
  });


  return (
    <div className="day-details">
      <div className="day-details--header">
        <div className="day-details--header--overview">
          <img src={`http://openweathermap.org/img/wn/${selectedTimestamp.icon}d@4x.png`} alt="weather-icon" />
          <div>
            <h2>{selectedTimestamp.temp > 0 ? `+${selectedTimestamp.temp}` : selectedTimestamp.temp}</h2>
            <h2>{selectedTimestamp.description}</h2>
          </div>
          <div className="day-details--header--overview--data">
            <h3>Precipitation: {selectedTimestamp.precipitation}%</h3>
            <h3>Humidity: {selectedTimestamp.humidity}%</h3>
            <h3>Wind: {selectedTimestamp.wind} km/h</h3>
          </div>
        </div>
        <div className="day-details--header--location">
          <h3>{day.city}, {day.country}</h3>
          <h3>{`${day.weekday}, ${day.month} ${day.date}`}</h3>
          <h3>{getTimeLabel(selectedTimestamp.time)}</h3>
        </div>
      </div>
      
      <div className="day-details--timestamps">
        {timestampElements}
      </div>
    </div>
  )
}