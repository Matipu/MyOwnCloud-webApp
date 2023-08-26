import './App.css';
import React, { Component } from 'react'
import DragAndDrop from './../DragAndDrop/DragAndDrop';
import FileList from './../FileList/FileList';

import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
  constructor() {
    super();
    this.fileListRef = React.createRef();
    console.log(this.fileListRef)
  }

  handleDrop = async (documents) => {
    console.log(this.fileListRef)
    this.fileListRef.current.handleDrop(documents);
  }

  render() {
    return (
      <div className="App">
      <DragAndDrop handleDrop={this.handleDrop}>
        <div className="dndPanel">
          
        </div>
      </DragAndDrop>
      <FileList ref={this.fileListRef} />
      </div>
    );
  }
}
