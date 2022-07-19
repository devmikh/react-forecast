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
        className={`day-details--timestamp ${timestamp === selectedTimestamp ? "day-details--timestamp-selected" : ""}`}
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
          <div className="day-details--header--overview--temperature-description">
            <p className="day-details--header--overview--temperature">{selectedTimestamp.temp > 0 ? `+${selectedTimestamp.temp}` : selectedTimestamp.temp}&#8451;</p>
            <p className="day-details--header--overview--description">{selectedTimestamp.description}</p>
          </div>
          <div className="day-details--header--overview--data">
            <p>Precipitation: {selectedTimestamp.precipitation}%</p>
            <p>Humidity: {selectedTimestamp.humidity}%</p>
            <p>Wind: {selectedTimestamp.wind} km/h</p>
          </div>
        </div>
        <div className="day-details--header--location">
          <p className="day-details--header--location--city">{day.city}, {day.country}</p>
          <p>{`${day.weekday}, ${day.month} ${day.date}`}</p>
          <p>{getTimeLabel(selectedTimestamp.time)}</p>
        </div>
      </div>
      
      <div className="day-details--timestamps">
        {timestampElements}
      </div>
    </div>
  )
}