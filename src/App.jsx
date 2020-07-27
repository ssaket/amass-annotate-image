import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Api from "./components/API/SearchManager";
import SearchResults from "./components/SearchResults";
export default class App extends Component {
  state = {
    results: [
      {
        id: "g-krQzQo9mI",
        name: "London",
        src:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1MTYwOH0",
      },
      {
        id: "poAmO7xk0ZM",
        name: "London",
        src:
          "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1MTYwOH0",
      },
      {
        id: "g-a",
        name: "London",
        src:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1MTYwOH0",
      },
      {
        id: "c",
        name: "London",
        src:
          "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1MTYwOH0",
      },
      {
        id: "g-ws",
        name: "London",
        src:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1MTYwOH0",
      },
      {
        id: "wa",
        name: "London",
        src:
          "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1MTYwOH0",
      },
    ],
    searchTerm: "",
  };

  getResults = (searchTerm) => {
    this.setState({ searchTerm: searchTerm });
    Api(searchTerm).then((data) => {
      console.log(data);
    });
   
    // this.setState({ results: data });
  };

  render() {
    return (
      <div className="image-amass-app container">
        <div className="row">
          <div className="col-sm-11">
            <SearchBar getResults={this.getResults}></SearchBar>
          </div>
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
