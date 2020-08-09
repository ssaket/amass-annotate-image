import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./styles/ObjectPanel.css";
export default class ObjectPanel extends Component {
  state = { objects: [] };
  handleAddObject = () => {
    let objects = this.state.objects;
    objects.push(0);
    this.setState({ objects: objects });
  };
  render() {
    return (
      <div className="object-panel">
        <div className="objects">
          {this.state.objects.map((obj) => (
            <Form.Check custom type="radio" label="radio" id="custom-radio" />
          ))}
        </div>
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
