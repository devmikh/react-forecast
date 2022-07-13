import React from "react";

export default function Search(props) {

  return (
    <div className="search">
      <input 
        className="search-input"
        type="text"
        placeholder="Enter City"
        name="city"
        value={props.city}
        onChange={props.handleChange}
      />
      <button
        onClick={props.handleClick}
        className="search-button"
      >Forecast!
      </button>
    </div>
  )
}