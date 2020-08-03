import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./styles/ObjectPanel.css";
export default class ObjectPanel extends Component {
  state = { objects: [] };
  handleAddObject = () => {};
  render() {
    return (
      <div className="object-panel">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => this.handleAddObject()}
        >
          <span className="fa fa-plus-square"></span> Add New Object
        </Button>
      </div>
    );
  }
}
