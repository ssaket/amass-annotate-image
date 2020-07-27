import React from "react";
import "./styles/SearchResults.css";
export default function SearchResults(props) {
  return (
    <div className="row search-results">
      {props.searchTerm ? (
        <h5 className="col-sm-12">Displaying results for {props.searchTerm}</h5>
      ) : (
        ""
      )}
      <div className="col-sm-12">
        <div className="result-images">
          {props.results.map((result) => {
            return (
              <div key={result.id} className="column">
                <img
                  src={result.src}
                  alt={result.name}
                  className="result-img"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
