import React from "react";
import { FaSearchLocation } from 'react-icons/fa';


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
      ><FaSearchLocation />
      </button>
    </div>
  )
}