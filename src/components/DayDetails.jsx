import { nanoid } from 'nanoid';

export default function DayDetails({day, handleClick}) {

  function getTimeLabel(seconds) {
    const date = new Date(seconds * 1000);
    return `${date.getHours()}:00`;
  }

  const timestampElements = day.timestamps.map(timestamp => {
    return (
      <div key={nanoid()} onClick={() => handleClick(timestamp)}>
        <h2>{getTimeLabel(timestamp.time)}</h2>
      </div>
    )
  });


  return (
    <div>
      <h1>{day.date}</h1>
      {timestampElements}
    </div>
  )
}