import "./App.css";
import React, { Component } from "react";
import DragAndDrop from "./../DragAndDrop/DragAndDrop";
import FileList from "./../FileList/FileList";
import ControlPanel from "./../ControlPanel/ControlPanel";
import FilePreview from "./../FilePreview/FilePreview";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "./react-contextmenu.css";

import "bootstrap/dist/css/bootstrap.css";

export default class App extends Component {
  path = "/";

  constructor() {
    super();
    this.fileListRef = React.createRef();
    this.controlPanelRef = React.createRef();
    this.filePreviewRef = React.createRef();

    this.state = {
      previewFile: null,
    };
  }

  handleDrop = async (documents) => {
    this.fileListRef.current.handleDrop(documents, this.path);
  };

  changePath = async (path) => {
    this.path = path;
    this.fileListRef.current.changePath(path);
    this.controlPanelRef.current.changePath(path);
  };

  handleNewFolder = async () => {
    this.fileListRef.current.createFolder("new folder", this.path);
  };

  handleFileClick = async (file) => {
    if (file.contentType === "folder") {
      this.changePath(this.path + file.name + "/");
    } else {
      this.setState({ previewFile: file });
    }
  };

  closeFilePreview = async () => {
    this.setState({ previewFile: null });
  };

  setPreviousFileToPreview = async (id) => {
    this.filePreviewRef.current.changeFile(await this.fileListRef.current.getPreviousFile(id));
  };

  setnextFileToPreview = async (id) => {
    this.filePreviewRef.current.changeFile(await this.fileListRef.current.getNextFile(id));
  };

  render() {
    return (
      <DragAndDrop handleDrop={this.handleDrop}>
        <div className="App">
          <ControlPanel
            ref={this.controlPanelRef}
            changePath={this.changePath}
          ></ControlPanel>


          <ContextMenu id="fileListContextMenuIdentifier">
            <MenuItem data={{ foo: "bar" }} onClick={this.handleNewFolder}>
              Nowy folder
            </MenuItem>
          </ContextMenu>
          {this.state.previewFile != null ? (
            <FilePreview
              closeFilePreview={this.closeFilePreview}
              ref={this.filePreviewRef}
              file={this.state.previewFile}
              previousFile={this.setPreviousFileToPreview}
              nextFile={this.setnextFileToPreview}
            />
          ) : null}
          <ContextMenuTrigger id="fileListContextMenuIdentifier">
            <FileList
              ref={this.fileListRef}
              clickOnFolder={this.handleFileClick}
            />
          </ContextMenuTrigger>
          </div>
      </DragAndDrop>
    );
  }
}
