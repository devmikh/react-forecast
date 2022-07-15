export default function DayPreview({day, handleClick}) {


  function getHighestTemperature() {
    const temps = day.timestamps.map(timestamp => timestamp.temp);
    return Math.max(...temps);
  }

  function getLowestTemperature() {
    const temps = day.timestamps.map(timestamp => timestamp.temp);
    return Math.min(...temps);
  }

  function getAverageWeatherIcon() {
    const icons = day.timestamps.map(timestamp => timestamp.icon);
    console.log(icons);
    let mf = 1;
    let m = 0;
    let item;
    for (let i = 0; i < icons.length; i++) {
      for (let j = i; j < icons.length; j++) {
        if (icons[i] === icons[j]) {
          m++;
        }
        if (mf < m) {
          mf = m;
          item = icons[i];
        }
      }
      m = 0;
    }
    return item;
  }

  return (
    <div className="day-preview" onClick={handleClick}>
      <h2>{`${day.weekday}, ${day.month} ${day.date}`}</h2>
      <img
        className="day-preview--icon"
        src={`https://openweathermap.org/img/wn/${getAverageWeatherIcon()}d@4x.png`}
        alt="weather icon"/>
      <div className="day-preview--temperature">
        <h4 className="day-preview--temperature--highest">{getHighestTemperature()}&#8451;</h4>
        <h4 className="day-preview--temperature--highest">{getLowestTemperature()}&#8451;</h4>
      </div>
      
    </div>
  )
}