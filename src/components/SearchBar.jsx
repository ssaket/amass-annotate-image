import React from "react";
import Api from "./API/SearchManager";

export default function SearchBar() {
  return (
    <div className="search">
      <input
        type="text"
        className="form-control"
        placeholder="Enter an image to be searched...   "
      />
      <Api></Api>
    </div>
  );
}
