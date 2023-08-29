import "./Panel.css";
import React, { Component } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import FileComunication from './../FileComunication/FileComunication'

export default class Panel extends Component {

  constructor(props) {
    super(props);
    this.id = this.props.document.id;
    this.state = {
      editText: false,
      text: this.props.document.name,
      icon: this.computeIcon()
    };
    
  }

  onClick = async () => {
    this.props.clickOnPanel(this.props.document);
  };

  onTextClick = async (e) => {
    e.stopPropagation();
    this.setState({editText:true});
  };

  changeName = async () => {
    this.setState({editText:true});
  };

  delete = async () => {
    this.props.delete(this.props.document.name, this.props.document.id);
  };

  downloadFile = async () => {
    await new FileComunication().downloadFile(this.props.document.id);
  };

  _handleKeyDown = async (e) => {
    console.log(e)
    if (e.key === 'Enter') {
      this.setState({editText:false});
      await this.props.changeName(this.props.document.id, this.state.text);
    }
  }

  handleChange = async (event) => {
    this.setState({text:event.target.value});
  }

  loadIcon = async () => {
    var content = await ((new FileComunication()).getFileIcon(this.props.document.id))
    this.setState({icon:"data:" + this.props.document.contentType + ";base64," + content});
  }
  
  downloadFile = async () => {
    this.props.downloadFile(this.props.document.name, this.props.document.id)
  }

  computeIcon = () => {
    var content;
    if (this.props.document.contentType === "folder") {
      content =
        "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAB+UlEQVR4nO3dPU4bURhG4QNIuGIFIGgQfboUbCAKS6ClQ0gsI1ugJh17SBdIBUXEBgwNFT+moXGKwRIZpnBh3/uOfR7pNtcu5pujsTUuPCBJkiRJOQbACXAFjIDxjNYjcAHslRul/zaBG2YXoWs9AfulBuqzAfOPMVkPwE6ZsfrrhDIxJusSWCsyWU/9oWyQMXBaZLKeeqF8kFdgt8RwfVQ6xmT9AlYLzNc7tYKMgR/AyvxHzNU1/Lj4USyHV+AvcA6cAW9dbzJIHTfAAXDffsEg9VwDX2ldKX6J1vMFOGpvGqSuw/aGH1l1jYCNjxsGqe+/Bn5khTFIGINIkrTAvgN31P0ZfhnWEPjWPvldN4ZDYKtjX7M3BLY/bninXp936skMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhuoKMih/F8npub3QFuS1wIGp8OtddQc4LHIgaP6d504DmkW61/4p70dc1sD5NEGgecG+U+cbYnDbGxDpwTPO88xpPkF609QL8fj+nU18ZkiRJkjRv/wDDtFUqN7/HQQAAAABJRU5ErkJggg==";
    } else if (this.props.document.contentType.includes("image")) {
      this.loadIcon()
      return null;
    } else {
      content = "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";
    }
    return "data:" + this.props.document.contentType + ";base64," + content;
  }

  render() {

    return (
      <ContextMenuTrigger id={this.props.document.id}>
      <ContextMenu id={this.props.document.id}>
      <MenuItem onClick={this.downloadFile}>
          Pobierz
        </MenuItem>
        <MenuItem onClick={this.changeName}>
          Zmień nazwę
        </MenuItem>
        <MenuItem onClick={this.delete}>
          Usuń
        </MenuItem>
      </ContextMenu>
      <div className="Panel" onClick={this.onClick}>
        
          <div className="imageContainer">
            <img src={this.state.icon} alt="loading" />
          </div>
          <div className="fileName" onClick={this.onTextClick}>
            {this.state.editText?
              <input className="center-block" type="text" value={this.state.text} onKeyDown={this._handleKeyDown} onChange={this.handleChange}/>
            :
              <p>{this.props.document.name}</p>
            }
          </div>
      </div>
      </ContextMenuTrigger>
    );
  }
}
