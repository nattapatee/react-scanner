import * as React from 'react'
import { Component } from 'react'
import './WebTwain.css';
import Dynamsoft from 'dwt';
import { applyConfg, updateVisibility } from './config';
import { Scanner } from "./scanner";

export class WebTwain extends Component {
  scanner = new Scanner()
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
  }

  ready() {
    applyConfg(Dynamsoft);
    updateVisibility(Dynamsoft);
    Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', () => this.scanner.init());
  }
  componentDidMount = () => {
    this.ready()
  }
  scanClick = (e) => {
    this.scanner.scan();
  }
  insertImageClick = (e) => {
    this.scanner.insertLocalImage();
  }
  httpImageClick = (e) => {
    this.scanner.insertHttpImage();
  }
  uploadPdf = (e) => {
    this.scanner.uploadPdfToServer();
  }
  render() {
    return (
      <div>
        <button onClick={this.scanClick}>Scan Document</button>
        {/* <button onClick={this.insertImageClick}>Insert Images</button>
        <button onClick={this.httpImageClick}>Http Images</button> */}
        <button onClick={this.uploadPdf}>Upload</button>
        <br />
        <div>
          <div id="dwtcontrolContainer" style={{ float: "left", marginRight: "20px" }}></div>
          <div id="dwtcontrolContainerLargeViewer" style={{ float: "left" }}></div>
        </div>
      </div>
    );
  }
}
