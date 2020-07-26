import React from "react";

export default function SearchBar() {
  return (
    <div className="search">
      <input
        type="text"
        className="form-control"
        placeholder="Enter an image to be searched...   "
      />
    </div>
  );
}
