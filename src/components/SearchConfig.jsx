import React, { Component } from "react";
import "./styles/SearchConfig.css";
import { searchManager } from "./API/SearchManager";
import { Form } from "react-bootstrap";
export default class SearchConfig extends Component {
  state = {
    configState: [
      {
        name: "Unsplash",
        selected: true,
        configs: [],
      },
      { name: "Flickr", selected: true, configs: [] },
      { name: "Pexels", selected: true, configs: [] },
      { name: "Pixabay", selected: true, configs: [] },
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
    const elem = e.target;
    let c = this.state.configState;
    c.forEach((item) => {
      if (item.name === elem.value) {
        item.selected = elem.checked;
      }
    });

    this.setState({ configState: c });
    if (elem.checked) {
      searchManager.addSource(elem.getAttribute("name"));
    } else {
      searchManager.removeSource(elem.getAttribute("name"));
    }
  };
  render() {
    return (
      <div className="col-sm-12 search-config-wrapper">
        <div className="sources col-sm-6 offset-sm-3">
          {/* <b>Sources:</b> */}
          <ul className="config-list">
            <Form>
              {this.state.configState.map((config) => {
                return (
                  <li className="config-item" key={config.name}>
                    <Form.Check
                      type="checkbox"
                      id={config.name}
                      label={config.name}
                      name={config.name}
                      checked={config.selected}
                      value={config.name}
                      onChange={(e) => this.handleSelect(e, config.name)}
                    />
                  </li>
                );
              })}
            </Form>
          </ul>
        </div>
        {/* <p className="config-title" onClick={(e) => this.toggleSlider(e)}>
          <b>Search Configuration</b> <i className="fa fa-chevron-down"></i>
        </p>
        <div id="slider" className="config-content slider"></div> */}
      </div>
    );
  }
}
