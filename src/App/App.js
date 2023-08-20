import './App.css';
import React from 'react'
import Panel from './../Panel/Panel';
import DragAndDrop from './../DragAndDrop/DragAndDrop';
import FileComunication from './../FileComunication/FileComunication'

import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'



function chunkArray(myArray, chunk_size){
  var results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }
  
  while(chunk_size > results[results.length-1].length) {
    results[results.length-1].push(null);
  }
  
  return results;
}

class App extends React.Component {

  size = 5;

  handleDrop = (documents) => {
    new FileComunication().createFile(documents[0])

    let fileList =  [...this.state.documents]
    for (var i = 0; i < documents.length; i++) {
      if (!documents[i].name) return
        fileList.push(documents[i].name)
    }

    this.setState({ 
      documents: fileList,
      splittedDocuments: chunkArray(this.state.documents, this.size) 
    })
  }

  constructor() {
    super()
    var documentsArray = [
      "Panel", 
      "Panel", 
      "Panel", 
      "Panel", 
      "Panel", 
      "Panel", 
      "Panel"
    ];
    this.state = {
      documents: [...documentsArray],
      splittedDocuments: chunkArray(documentsArray, this.size)
    };
  }

  renderPanel(document) {
    if(document != null) {
      return (<Panel> document </Panel>)
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
