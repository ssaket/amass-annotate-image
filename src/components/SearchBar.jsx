import React, { Component } from "react";
import "./styles/SearchBar.css";
export default class searchBar extends Component {
  state = { searchTerm: "" };

  setSearchTerm = (e) => {
    let newValue = e.target.value;
    this.setState({ searchTerm: newValue });
  };

  render() {
    return (
      <div className="row search">
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control search-box"
            placeholder="Enter an image to be searched...   "
            value={this.state.searchTerm}
            onChange={(e) => this.setSearchTerm(e)}
          />
        </div>
        <button
          className="btn search-btn col-sm-2 w-100"
          onClick={() => this.props.getResults(this.state.searchTerm)}
        >
          Search
        </button>
      </div>
    );
  }
}
