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

      <ContextMenu id="fileListContextMenuIdentifier">
        <MenuItem data={{foo: 'bar'}} onClick={this.handleNewFolder}>
          Nowy folder
        </MenuItem>
      </ContextMenu>

      
      <ContextMenuTrigger id="fileListContextMenuIdentifier">
        <FileList ref={this.fileListRef} clickOnFolder={this.handleFileClick}/>
      </ContextMenuTrigger>
    </div>
    );
  }
}
