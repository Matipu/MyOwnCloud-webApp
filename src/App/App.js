import './App.css';
import React, { Component } from 'react'
import DragAndDrop from './../DragAndDrop/DragAndDrop';
import FileList from './../FileList/FileList';
import ControlPanel from './../ControlPanel/ControlPanel';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './react-contextmenu.css'

import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {

  path = '/'

  constructor() {
    super();
    this.fileListRef = React.createRef();
    this.controlPanelRef = React.createRef();
  }

  handleDrop = async (documents) => {
    this.fileListRef.current.handleDrop(documents, this.path);
  }

  changePath = async (path) => {
    this.path = path;
    this.fileListRef.current.changePath(path);
    this.controlPanelRef.current.changePath(path);
  }

  handleNewFolder = async () => {
    this.fileListRef.current.createFolder("new folder", this.path);
    //this.fileListRef.current.changePath(this.path);
  }

  handleFileClick = async (file) => {
    if(file.contentType === "folder") {
      this.changePath(this.path + file.name+"/");
    }
  }

  render() {
    return (
      <div className="App">
      <ControlPanel ref={this.controlPanelRef} changePath={this.changePath}></ControlPanel>
      <DragAndDrop handleDrop={this.handleDrop}>
        <div className="dndPanel">
        </div>
      </DragAndDrop>
      <div>

      <ContextMenu id="same_unique_identifier">
        <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
          Zmień nazwę
        </MenuItem>
        <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
          Usuń
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{foo: 'bar'}} onClick={this.handleNewFolder}>
          Nowy folder
        </MenuItem>
      </ContextMenu>

      </div>
      <ContextMenuTrigger id="same_unique_identifier">
        <FileList ref={this.fileListRef} id="same_unique_identifier" clickOnFolder={this.handleFileClick}/>
      </ContextMenuTrigger>
    </div>
    );
  }
}
