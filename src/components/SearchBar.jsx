import React, { Component } from "react";

export default class searchBar extends Component {
  state = { searchTerm: "" };

  setSearchTerm = (e) => {
    let newValue = e.target.value;
    this.setState({ searchTerm: newValue });
  };

  render() {
    return (
      <div>
        <div className="search">
          <input
            type="text"
            className="form-control"
            placeholder="Enter an image to be searched...   "
            value={this.state.searchTerm}
            onChange={(e) => this.setSearchTerm(e)}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => this.props.getResults(this.state.searchTerm)}
        >
          Search
        </button>
      </div>
    );
  }
}
