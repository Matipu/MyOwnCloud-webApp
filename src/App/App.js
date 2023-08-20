import './App.css';
import Panel from './../Panel/Panel';

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
    results[results.length-1].push("test");
  }
  
  return results;
}

function App() {
  const documents = ["Panel", "Panel", "Panel", "Panel", "Panel", "Panel", "Panel"];
  const size = 3;
  var splittedDocuments = chunkArray(documents, size);
  
  return (
    <div className="App">
      <Container fluid>
        {splittedDocuments.map(documents => (
          <Row>
            {documents.map(document => (
              <Col><div class = "panel"><Panel>{document}</Panel></div></Col>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default App;
