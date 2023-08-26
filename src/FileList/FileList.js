import './FileList.css';
import React, { Component } from 'react'
import Panel from './../Panel/Panel';
import FileComunication from './../FileComunication/FileComunication'
import IconCreator from './../IconCreator/IconCreator'
import {isMobile} from 'react-device-detect';

import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

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
    this.loadFiles("/")
  }

  addFile = async(file) => {
    let fileList =  [...this.state.documents]
    fileList.push(file)
    await this.setState({ 
      documents: fileList,
      splittedDocuments: chunkArray(fileList, this.size)
    })

    this.forceUpdate()
  }

  handleDrop = async (documents, path) => {
    for( var i = 0; i < documents.length; i++){ 
      this.createFile(documents[i], path)
    }
  }

  createFile = async (file, path) => {
    var icon = await new IconCreator().createIcon(file);
    this.addFile(await new FileComunication().createFile(file, icon, path))
  }

  createFolder = async (name, path) => {
    this.addFile(await new FileComunication().createFolder(name, path))
  }

  changePath = async (path) => {
    this.loadFiles(path)
    this.forceUpdate()
  }

  loadFiles = async(path) => {
    this.setState({
      documents: [],
      splittedDocuments: []
    });
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

  deleteFile = async(fileId) => {
    console.log(fileId)
    var response = await (new FileComunication()).deleteFile(fileId)
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
    await (new FileComunication()).changeName(fileId, text)
    this.forceUpdate()
  } 

  renderPanel(document) {
    if(document != null) {
        return <Panel document={document} changeName={this.changeFileName} clickOnPanel={this.props.clickOnFolder} delete={this.deleteFile}/>
    };
  }
  
  render() {
      return (
        <div className="FileList">

          <Container fluid>
          {this.state.splittedDocuments.map(documents => (
            <Row>
              {documents.map(document => (
                <Col className={isMobile?"px-md-1":"px-md-3"} xs={isMobile?6:2}><div className="panel">
                  {this.renderPanel(document)}
                </div></Col>
              ))}
            </Row>
          ))}
        </Container>
        </div>
      )
  }
}
