import "./FilePreview.css";
import React, { Component } from "react";
import FileComunication from './../FileComunication/FileComunication'

export default class FilePreview extends Component {

  constructor(props) {
    super(props)
    this.file = props.file
    this.state = ({image:null})
    this.loadImage()
  }

  loadImage = async() => {
    var content = await ((new FileComunication()).getFileContent(this.file.id))
    var imagePreview = "data:" + this.file.contentType + ";base64," + content
    this.setState({image:imagePreview})
  }

  changeFile = async(file) => {
    if(file == null) {
      return;
    }

    this.file = file
    this.setState({image:null})

    var content = await ((new FileComunication()).getFileContent(this.file.id))
    var imagePreview = "data:" + this.file.contentType + ";base64," + content
    this.setState({image:imagePreview})
  }

  nextFile = async(e) => {
    e.stopPropagation();
    this.props.nextFile(this.file.id)
  }

  previousFile = async(e) => {
    e.stopPropagation();
    this.props.previousFile(this.file.id)
  }

  render() {
    return (
      <div className="filePreview" onClick={this.props.closeFilePreview}>\
          <div className="filePreviewImageContainer">
            { this.state.image != null ? <img src={this.state.image} alt="loading" /> : null }
          </div>
          <div className="filePreviewControllerPanel">
            
          <span onClick={this.previousFile}>&#60;&#60;&#60; </span> 
          <span>{this.file.name}</span> 
          <span onClick={this.nextFile}>&#62;&#62;&#62;</span>
          </div>
      </div>
    );
  }
}