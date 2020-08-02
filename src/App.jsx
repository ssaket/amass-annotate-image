import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Api from "./components/API/SearchManager";
import SearchResults from "./components/SearchResults";
import SearchConfig from "./components/SearchConfig";
export default class App extends Component {
  state = {
    results: [],
    searchTerm: "",
  };

  getResults = (searchTerm) => {
    this.setState({ searchTerm: searchTerm });
    Api(searchTerm).then((data) => {
      console.log(data);
      this.setState({ results: data });
    });
  };

  render() {
    return (
      <div className="image-amass-app container">
        <div className="row">
          <div className="col-sm-11">
            <SearchBar getResults={this.getResults}></SearchBar>
          </div>
        </div>
        <div className="row search-config-wrapper">
          <SearchConfig></SearchConfig>
        </div>
        <div className="row">
          <SearchResults
            results={this.state.results}
            searchTerm={this.state.searchTerm}
          ></SearchResults>
        </div>
      </div>
    );
  }
}
