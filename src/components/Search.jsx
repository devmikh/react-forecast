import React from "react";

export default function Search(props) {

  return (
    <div>
      <input 
        type="text"
        placeholder="Enter City"
        name="city"
        value={props.city}
        onChange={props.handleChange}
      />
      <button onClick={props.handleClick}>Forecast!</button>
    </div>
  )
}