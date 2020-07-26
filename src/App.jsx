import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import getApiData from "./components/Api";
import SearchResults from "./components/SearchResults";
export default class App extends Component {
  state = { results: "" };

  getResults = (searchTerm) => {
    let data = getApiData(searchTerm);
    this.setState({ results: data });
  };

  render() {
    return (
      <div className="image-amass-app container">
        <div className="row">
          <div className="col-sm-11">
            <SearchBar getResults={this.getResults}></SearchBar>
          </div>
          {/* <div className="col-sm-1">
            <button
              className="btn btn-primary w-100"
              onClick={() => this.getResults()}
            >
              Search
            </button>
          </div> */}
        </div>
        <div className="row">
          <SearchResults results={this.state.results}></SearchResults>
        </div>
      </div>
    );
  }
}
