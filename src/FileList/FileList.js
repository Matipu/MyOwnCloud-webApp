import './FileList.css';
import React, { Component } from 'react'
import Panel from './../Panel/Panel';
import FileComunication from './../FileComunication/FileComunication'
import EventQueue from './../EventQueue/EventQueue'
import {isMobile} from 'react-device-detect';

import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function chunkArray(myArray, chunk_size){
  var array = [...myArray]
  if(array.length === 0) { 
    return [];
  }
  var results = [];
  while (array.length) {
    results.push(array.splice(0, chunk_size));
  }
  
  while(chunk_size > results[results.length-1].length) {
    results[results.length-1].push(null);
  }
  
  return results;
}

export default class FileList extends Component {
  
  constructor() {
    super()
    if(isMobile) {
      this.size = 2
    } else {
      this.size = 6;
    }
    this.state = {
      documents: [],
      splittedDocuments: []
    };
    this.eventQueueRef = React.createRef();

    this.loadFiles("/")
  }

  addFile = async(file) => {
    let fileList =  [...this.state.documents]
    fileList.push(file)
    this.setState({ 
      documents: fileList,
      splittedDocuments: chunkArray(fileList, this.size)
    })
  }

  handleDrop = async (documents, path) => {
    for( var i = 0; i < documents.length; i++){ 
      this.createFile(documents[i], path)
    }
  }

  createFile = async (file, path) => {
    var result = await this.eventQueueRef.current.createFile(file, path);
    this.addFile(result)
  }

  createFolder = async (name, path) => {
    var result = await this.eventQueueRef.current.createFolder(name, path);
    this.addFile(result)
  }

  changePath = async (path) => {
    this.loadFiles(path)
    this.forceUpdate()
  }

  loadFiles = async(path) => {
    this.state = {
      documents: [],
      splittedDocuments: []
    };
    var response = await (new FileComunication().getAllFiles(path))

    this.setState({ 
      documents: response,
      splittedDocuments: chunkArray(response, this.size)
    })
  }

  getPreviousFile = async (fileId) => {
    let fileList =  this.state.documents
    var actualPosition = this.findFilePositionInArray(fileList, fileId)
    for( var i = actualPosition-1; i >= 0; i--){ 
      if ( fileList[i].contentType !== "folder") { 
        return fileList[i]
      }
    }
  }

  getNextFile= async (fileId) => {
    let fileList =  this.state.documents
    var actualPosition = this.findFilePositionInArray(fileList, fileId)
    for( var i = actualPosition+1; i < fileList.length; i++){ 
      if ( fileList[i].contentType !== "folder") { 
        return fileList[i]
      }
    }
  }

  findFilePositionInArray(fileList, fileId) {
    for( var i = 0; i < fileList.length; i++){ 
      if ( fileList[i].id === fileId) { 
          return i
      }
    }
  }

  deleteFile = async(name, fileId) => {
    var response = await this.eventQueueRef.current.deleteFile(name, fileId);
    if(response.ok) {
      let fileList =  [...this.state.documents]
      fileList.splice(this.findFilePositionInArray(fileList, fileId), 1);
      await this.setState({ 
        documents: fileList,
        splittedDocuments: chunkArray(fileList, this.size)
      })
    }
    this.forceUpdate()
  } 

  changeFileName = async(fileId, text) => {
    let fileList =  this.state.documents
    var actualPosition = this.findFilePositionInArray(fileList, fileId)
    fileList[actualPosition].name = text;
    await this.eventQueueRef.current.changeName(fileId, text);
    this.forceUpdate()
  } 

  renderPanel(document) {
    if(document != null) {
        return <Col key={document.id+"col"} className={isMobile?"px-md-1":"px-md-3"} xs={isMobile?6:2}><div className="panel">
            <Panel  key ={document.id} document={document} changeName={this.changeFileName} clickOnPanel={this.props.clickOnFolder} delete={this.deleteFile}/>
          </div></Col>
    };
  }
  
  render() {
      return (
        <div className="FileList">
          {this.state.splittedDocuments.map((documents, index) => (
            <Row key={index}>
              {documents.map(document => (this.renderPanel(document)))}
            </Row>
          ))}
          <EventQueue ref={this.eventQueueRef}></EventQueue>
        </div>
      )
  }
}
