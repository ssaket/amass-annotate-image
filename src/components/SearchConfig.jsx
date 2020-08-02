import React, { Component } from "react";
import "./styles/SearchConfig.css";

export default class SearchConfig extends Component {
  state = {
    configState: [
      { name: "Unsplash", selected: false, configs: [] },
      { name: "Flickr", selected: false, configs: [] },
      { name: "Pexels", selected: false, configs: [] },
      { name: "Pixabay", selected: false, configs: [] },
    ],
  };
  componentDidMount() {}
  toggleSlider = (e) => {
    const sliderElem = document.getElementById("slider");
    sliderElem.classList.toggle("closed");
  };
  render() {
    return (
      <div className="col-sm-12 search-config-wrapper">
        <p className="config-title" onClick={(e) => this.toggleSlider(e)}>
          <b>Search Configuration</b> <i className="fa fa-chevron-down"></i>
        </p>
        <div id="slider" className="config-content slider">
          <p>Sources:</p>
          <ul className="config-list">
            {this.state.configState.map((config) => {
              return (
                <li className="config-item">
                  <input type="checkbox" className="config-checkbox" />
                  {config.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
