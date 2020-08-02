import React, { Component } from "react";
import "./styles/SearchConfig.css";
import { searchManager } from "./API/SearchManager";
import Unsplash from "./API/Unsplash";
import Flickr from "./API/Flickr";
import Pexels from "./API/Pexels";
import Pixabay from "./API/Pixabay";
export default class SearchConfig extends Component {
  state = {
    configState: [
      {
        name: "Unsplash",
        selected: false,
        configs: [],
        object: new Unsplash(),
      },
      { name: "Flickr", selected: false, configs: [] },
      { name: "Pexels", selected: false, configs: [] },
      { name: "Pixabay", selected: false, configs: [] },
    ],
  };
  componentDidMount() {
    // searchManager.addSource(new Unsplash());
  }
  toggleSlider = (e) => {
    const sliderElem = document.getElementById("slider");
    sliderElem.classList.toggle("closed");
  };
  handleSelect = (e, name) => {
    console.log(e, name);
    const elem = e.target;
    if (elem.checked) {
      searchManager.addSource(elem.getAttribute("name"));
    } else {
      searchManager.removeSource(elem.getAttribute("name"));
    }
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
                <li className="config-item" key={config.name}>
                  <input
                    type="checkbox"
                    className="config-checkbox"
                    name={config.name}
                    value={config.name}
                    onClick={(e) => this.handleSelect(e, config.name)}
                  />
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
