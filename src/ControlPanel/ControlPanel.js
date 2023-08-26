import React, { Component } from 'react'
import './ControlPanel.css';

export default class ControlPanel extends Component {
  
  constructor() {
    super()
    this.state = {
      splittedPath: []
    };
  }

  changePath = async (path) => {
    this.setState({ 
      path: path,
      splittedPath: path.replaceAll("/", "/#").split("#").filter(e =>  e)
    })
  }

  getLinkToPathPart = (index) => {
    var actualPath = "";
    for (var i = 0; i < index + 1; i++) {
      actualPath += this.state.splittedPath[i];
    }
    return actualPath;
  }

  render() {
      return (
        <div className="ControlPanel">
        <span className="logo" onClick={() => this.props.changePath("/")}>
          <h2>CLOUD</h2>
        </span>

        <span>
        {this.state.splittedPath.map((splittedPath, index) => (
                <span className="pathPart" onClick={() => this.props.changePath(this.getLinkToPathPart(index))}>{splittedPath}</span>
        ))}

        </span>
        </div>
      )
  }
}
