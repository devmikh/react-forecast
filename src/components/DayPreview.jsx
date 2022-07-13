export default function DayPreview(props) {

  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  function getHighestTemperature() {
    const temps = props.timestamps.map(timestamp => timestamp.temp);
    return Math.max(...temps);
  }

  function getLowestTemperature() {
    const temps = props.timestamps.map(timestamp => timestamp.temp);
    return Math.min(...temps);
  }

  function getAverageWeatherIcon() {
    const icons = props.timestamps.map(timestamp => timestamp.icon);
    console.log(icons);
  }
  getAverageWeatherIcon();

  return (
    <div className="day-preview">
      <h2>{`${weekdays[props.weekday]}, July ${props.date}`}</h2>
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