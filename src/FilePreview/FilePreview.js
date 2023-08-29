import "./FilePreview.css";
import React, { Component } from "react";
import FileComunication from "./../FileComunication/FileComunication";
import { Download } from "react-bootstrap-icons";

export default class FilePreview extends Component {
  constructor(props) {
    super(props);
    this.file = props.file;
    this.state = { image: null };
    this.loadImage(props.file);
  }

  loadImage = async (file) => {
    var contentIcon = await new FileComunication().getFileIcon(file.id);
    var imagePreviewIcon = "data:" + file.contentType + ";base64," + contentIcon;
    this.setState({ image: imagePreviewIcon });

    var content = await new FileComunication().getFileContent(file.id);
    var imagePreview = "data:" + file.contentType + ";base64," + content;
    this.setState({ image: imagePreview });
  };

  changeFile = async (file) => {
    if (file == null) {
      return;
    }

    this.file = file;
    this.setState({ image: null });

    this.loadImage(file);
  };

  nextFile = async (e) => {
    e.stopPropagation();
    this.props.nextFile(this.file.id);
  };

  previousFile = async (e) => {
    e.stopPropagation();
    this.props.previousFile(this.file.id);
  };

  downloadFile = async (e) => {
    e.stopPropagation();
    this.props.downloadFile(this.file.name, this.file.id)
  };

  render() {
    return (
      <div className="filePreview" onClick={this.props.closeFilePreview}>
        <Download className="icon" color="white" size={33} onClick={this.downloadFile} />
        <div className="previousFileArrow" onClick={this.previousFile}>
          <p>&#60;</p>
        </div>
        <div className="nextFileArrow" onClick={this.nextFile}>
          <p>&#62;</p>
        </div>

        <div className="filePreviewImageContainer">{this.state.image != null ? <img src={this.state.image} alt="loading" /> : null}</div>
        <div className="filePreviewControllerPanel">
          <span>{this.file.name}</span>
        </div>
      </div>
    );
  }
}
