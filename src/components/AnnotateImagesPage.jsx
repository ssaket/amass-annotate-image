import React, { Component } from "react";
import { Link } from "react-router-dom";
import ObjectPanel from "./ObjectPanel";
import ImagesPanel from "./ImagesPanel";
import ImageInfo from "./ImageInfo.jsx";
import AnnotationInfo from "./AnnotationInfo";
import "./styles/AnnotateImagesPage.css";
import AnnotateImageManager from "../annotate/main.jsx";

export default class AnnotateImagesPage extends Component {
  state = { heroImageLink: "" };
  getImage = (image) => {
    this.setState({ heroImageLink: image.src });
    console.log(image.src);
    var canvas = document.getElementById('annotateCanvas');
    const am = AnnotateImageManager;
  };
  toggleDrawOption = (e) => {
    let elem = e.target;
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
                  <canvas id="annotateCanvas" resize></canvas>
                )}
              </div>
              <div className="draw-btn-wrapper w-50">
                <button
                  className="w-50 draw-btns box active"
                  onClick={(e) => this.toggleDrawOption(e)}
                >
                  Box Select
                </button>
                <button
                  className="w-50 draw-btns pencil"
                  onClick={(e) => this.toggleDrawOption(e)}
                >
                  Pencil Select
                </button>
              </div>
              <div className="save-btn-wrapper w-50 text-right">
                <button className="w-25 save-btn">Save</button>
                <button className="w-25 skip-btn">Skip</button>
              </div>
            </div>
            <div className="row">
              <div className="message-container">Message...</div>
            </div>
          </div>
          <div className="col-sm-2">
            <ImageInfo></ImageInfo>
            <AnnotationInfo></AnnotationInfo>
          </div>
        </div>
      </div>
    );
  }
}
