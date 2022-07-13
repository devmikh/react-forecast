export default function DayPreview() {
  return (
    <div className="day-preview">
      <h2>Wednesday, July 13</h2>
      <img
        className="day-preview--icon"
        src="https://openweathermap.org/img/wn/10d@4x.png"/>
      <div className="day-preview--temperature">
        <h4 className="day-preview--temperature--highest">+26&#8451;</h4>
        <h4 className="day-preview--temperature--highest">+14&#8451;</h4>
      </div>
      
    </div>
  )
}