export default function DayPreview({day, handleClick}) {

  const date = new Date(day.timestamps[0].time * 1000);

  // Helper functions
  function getMonthName() {
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[date.getMonth()]
  }

  function getDate() {
    return date.getDate();
  }

  function getWeekday() {
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekdays[date.getDay()];
  }

  function getHighestTemperature() {
    const temps = day.timestamps.map(timestamp => timestamp.temp);
    return Math.max(...temps);
  }

  function getLowestTemperature() {
    const temps = day.timestamps.map(timestamp => timestamp.temp);
    return Math.min(...temps);
  }

  // function getAverageWeatherIcon() {
  //   const icons = props.timestamps.map(timestamp => timestamp.icon);
  //   // console.log(icons);
  // }
  // getAverageWeatherIcon();

  

  return (
    <div className="day-preview" onClick={handleClick}>
      <h2>{`${getWeekday()}, ${getMonthName()} ${getDate()}`}</h2>
      <img
        className="day-preview--icon"
        src="https://openweathermap.org/img/wn/10d@4x.png"
        alt="weather icon"/>
      <div className="day-preview--temperature">
        <h4 className="day-preview--temperature--highest">{getHighestTemperature()}&#8451;</h4>
        <h4 className="day-preview--temperature--highest">{getLowestTemperature()}&#8451;</h4>
      </div>
      
    </div>
  )
}