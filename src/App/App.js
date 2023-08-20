import './App.css';
import React from 'react'
import Panel from './../Panel/Panel';
import DragAndDrop from './../DragAndDrop/DragAndDrop';
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

class App extends React.Component {

  size = 5;

  handleDrop = async (documents) => {
    var file = documents[0];
    console.log("file" + file)
    console.log(file)

    var icon = await new IconCreator().createIcon(file);

    await new FileComunication().createFile(file, icon)
    let fileList =  [...this.state.documents]
    for (var i = 0; i < documents.length; i++) {
      fileList.push(file)
    }

    this.loadFiles()
    
    window.location.reload();
  }

  loadFiles = async() => {
    var response = await (new FileComunication().getAllFiles())

    console.log("test")
    this.setState({ 
      documents: response,
      splittedDocuments: chunkArray(response, this.size)
    })
  } 

  constructor() {
    super()
    this.loadFiles()

    this.state = {
      documents: [],
      splittedDocuments: []
    };
  }

  renderPanel(document) {
    console.log(document)
    if(document != null) {
      return (<Panel document={document}/>)
    };
  }

  render() {
    return (
      <div className="App">
      <DragAndDrop handleDrop={this.handleDrop}>
        <div className="dndPanel">
          
        </div>
      </DragAndDrop>
        <Container fluid>
          {this.state.splittedDocuments.map(documents => (
            <Row>
              {documents.map(document => (
                <Col><div className="panel">
                  {this.renderPanel(document)}
                </div></Col>
              ))}
            </Row>
          ))}
        </Container>
      </div>
    );
  }
}

export default App;
