import React from "react";
import { Link } from "react-router-dom";
import "./styles/SearchResults.css";
export default function SearchResults(props) {
  return (
    <div className="row search-results">
      {props.searchTerm ? (
        <React.Fragment>
          <h5 className="col-sm-12">
            Displaying results for "{props.searchTerm}"
            <span className="btn float-right annotate-link">
              <Link to={{ pathname: "/annotate", images: props.results }}>
                Proceed to Annotate <span className="fa fa-arrow-right"></span>
              </Link>
            </span>
          </h5>
        </React.Fragment>
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
