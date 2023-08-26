import './FileList.css';
import React, { Component } from 'react'
import Panel from './../Panel/Panel';
import FileComunication from './../FileComunication/FileComunication'
import IconCreator from './../IconCreator/IconCreator'

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
  
  size = 6;

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
    var file = documents[0];
    var icon = await new IconCreator().createIcon(file);
    this.addFile(await new FileComunication().createFile(file, icon, path))
  }

  createFolder = async (name, path) => {
    this.addFile(await new FileComunication().createFolder(name, path))
  }

  changePath = async (path) => {
    this.loadFiles(path)
  }

  loadFiles = async(path) => {
    var response = await (new FileComunication().getAllFiles(path))

    this.setState({ 
      documents: response,
      splittedDocuments: chunkArray(response, this.size)
    })
  } 

  constructor() {
    super()
    this.state = {
      documents: [],
      splittedDocuments: []
    };
    this.loadFiles("/")
  }

  renderPanel(document) {
    if(document != null) {
      return (<Panel document={document} clickOnPanel={this.props.clickOnFolder}/>)
    };
  }

  render() {
      return (
        <div className="FileList">
          <Container fluid>
          {this.state.splittedDocuments.map(documents => (
            <Row>
              {documents.map(document => (
                <Col xs={2}><div className="panel">
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
