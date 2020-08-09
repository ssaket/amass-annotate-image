import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Api from "./API/SearchManager";
import SearchResults from "./SearchResults";
import SearchConfig from "./SearchConfig";
import "./styles/SearchImagesPage.css";
export default class SearchImagesPage extends Component {
  state = {
    results: [],
    searchTerm: "",
  };

  getResults = (searchTerm) => {
    this.setState({ searchTerm: searchTerm });
    Api(searchTerm).then((data) => {
      this.setState({ results: data });
      localStorage.setItem("results", JSON.stringify(data));
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="row heading">
          <h1 className="text-center w-100">Amass Images</h1>
        </div>
        <div className="row">
          <div className="col-sm-11">
            <SearchBar getResults={this.getResults}></SearchBar>
          </div>
        </div>
        <div className="row search-config-wrapper">
          <SearchConfig></SearchConfig>
        </div>
        <hr />

        <SearchResults
          results={this.state.results}
          searchTerm={this.state.searchTerm}
        ></SearchResults>
      </React.Fragment>
    );
  }
}
