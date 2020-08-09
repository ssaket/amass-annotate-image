import React from "react";
import { Link } from "react-router-dom";
import "./styles/SearchResults.css";
export default function SearchResults(props) {
  const resultData =
    props.results.length !== []
      ? props.results
      : JSON.parse(localStorage.getItem("results"));
  return (
    <div className="row search-results">
      {props.searchTerm ? (
        <React.Fragment>
          <h5 className="col-sm-5 offset-sm-1">
            Displaying results for "{props.searchTerm}"
          </h5>
          <span className="btn float-right annotate-link col-sm-5 text-right">
            <Link to={{ pathname: "/annotate", images: props.results }}>
              Proceed to Annotate <span className="fa fa-arrow-right"></span>
            </Link>
          </span>
        </React.Fragment>
      ) : (
        ""
      )}
      <div className="col-sm-10 offset-sm-1">
        <div className="result-images">
          {resultData.map((result) => {
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
