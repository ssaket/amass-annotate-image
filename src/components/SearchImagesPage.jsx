import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Api from "./API/SearchManager";
import SearchResults from "./SearchResults";
import SearchConfig from "./SearchConfig";
export default class SearchImagesPage extends Component {
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
      <React.Fragment>
        <div className="row">
          <div className="col-sm-11">
            <SearchBar getResults={this.getResults}></SearchBar>
          </div>
        </div>
        <div className="row search-config-wrapper">
          <SearchConfig></SearchConfig>
        </div>
        <hr />
        <div className="row">
          <SearchResults
            results={this.state.results}
            searchTerm={this.state.searchTerm}
          ></SearchResults>
        </div>
      </React.Fragment>
    );
  }
}
