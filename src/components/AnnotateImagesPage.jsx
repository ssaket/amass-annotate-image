import React, { Component } from "react";
import { Link } from "react-router-dom";
import ObjectPanel from "./ObjectPanel";
import ImagesPanel from "./ImagesPanel";
import "./styles/AnnotateImagesPage.css";
export default class AnnotateImagesPage extends Component {
  state = { heroImageLink: "" };
  getImage = (image) => {
    this.setState({ heroImageLink: image.src });
    console.log(image.src);
  };

  render() {
    return (
      <div className="annotate-page-wrapper">
        <span className="btn back-link">
          <Link to="/">
            <span className="fa fa-arrow-left"></span>Search something else
          </Link>
        </span>
        <div className="row">
          <div className="col-sm-3">
            <div className="left-col">
              <ObjectPanel></ObjectPanel>
              <ImagesPanel
                images={this.props.location.images}
                getImage={this.getImage}
              ></ImagesPanel>
            </div>
          </div>
          <div className="col-sm-7">
            <div className="row">
              <div className="hero-image-container">
                {this.state.heroImageLink === "" ? (
                  <h1 className="no-image text-center">
                    <span className="fa fa-exclamation-circle"></span> Please
                    Select an Image
                  </h1>
                ) : (
                  <img src={this.state.heroImageLink} alt="hero Image" />
                )}
              </div>
            </div>
            <div className="row">
              <div className="message-container">Message...</div>
            </div>
          </div>
          <div className="col-sm-2">info</div>
        </div>
      </div>
    );
  }
}
