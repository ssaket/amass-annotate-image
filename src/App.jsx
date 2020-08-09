import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import SearchImagesPage from "./components/SearchImagesPage";
import AnnotateImagesPage from "./components/AnnotateImagesPage";
export default class App extends Component {
  render() {
    return (
      <div className="image-amass-app container-fluid">
        <Switch>
          <Route path="/annotate" component={AnnotateImagesPage}></Route>
          <Route path="/" component={SearchImagesPage}></Route>
        </Switch>
      </div>
    );
  }
}
