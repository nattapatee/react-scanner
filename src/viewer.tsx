import * as React from "react"
import { Scanner } from "./scanner";
import { applyConfg, updateVisibility } from "./config";
import { CSSProperties } from "react";

type State = {}
type Props = {}

declare var Dynamsoft: any;

export class Viewer extends React.Component<State, Props> {

    scanner = new Scanner()

    constructor(props) {
        super(props)
    }

    ready() {
        applyConfg(Dynamsoft);
        updateVisibility(Dynamsoft);

        Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', () => this.scanner.init());
    }

    componentDidMount() {
        this.ready();
    }


    scanClick = (e) => {
        this.scanner.scan();
    }

    loadImageClick = (e) => {
        this.scanner.uploadLocalImage();
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

        let main = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        } as CSSProperties;

        let style = {
            display: "flex",
            margin: "5px",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        } as CSSProperties;

        let control = {
            display: "flex",
            alignSelf: "flex-start"
        }

        return (
            <div style={main}>
                <div>
                    <button onClick={this.insertImageClick}>Insert Images</button>
                    <button onClick={this.httpImageClick}>Http Images</button>
                    <button onClick={this.uploadPdf}>Upload</button>
                </div>
                <div className="container" style={style}>
                    <div id="dwtcontrolContainer"></div>
                    <div id="dwtcontrolContainerLargeViewer"></div>
                    <div style={control}>
                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}