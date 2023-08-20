import './Panel.css';
import React, { Component } from 'react'

export default class Panel extends Component {
  render() {
    console.log(this.props.document)
    var content = "data:" + this.props.document.contentType + ";base64," + this.props.document.iconContent;
    console.log(content)
      return (
        <div className="Panel">
          <img src={content} alt= "dot"/>
          <p>{this.props.document.name}</p>
        </div>
      )
  }
}

