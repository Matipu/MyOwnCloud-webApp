import "./EventQueue.css";
import React, { Component } from "react";
import FileComunication from './../FileComunication/FileComunication'

export default class EventQueue extends Component {
  constructor() {
    super()
    this.state = {processes: [], actualProcessingCount:0};
    this.processesCount = 0;
    this.fileComunication = new FileComunication();
  }

  createFile = async(file, path) => {
    return await this.runEvent("Dodawanie pliku: " + file.name, this.fileComunication.createFile, [file, path])
  }

  changeName = async(fileId, name) => {
    return await this.runEvent("Zmiana nazwy pliku na: " + name, this.fileComunication.changeName, [fileId, name])
  }

  createFolder = async(name, path) => {
    return await this.runEvent("Tworzenie folderu: " + name, this.fileComunication.createFolder, [name, path])
  }

  deleteFile = async(name, fileId) => {
    return await this.runEvent("Usuwanie pliku: " + name, this.fileComunication.deleteFile, [fileId])
  }

  runEvent = async(text, method, parameters) => {

    await this.waitUntil(() => this.state.actualProcessingCount < 3)
    this.processesCount++;
    var id = this.processesCount;
    var processes = [...this.state.processes];
    processes.push({id: this.processesCount, method:method, text:text, parameters:parameters});
    this.setState({processes: processes});
    this.setState({actualProcessingCount: this.state.actualProcessingCount+1});

    var result = await method(...parameters);

    var processesAfterEvent = [...this.state.processes];
    processesAfterEvent.splice(this.findFileProcessesInArray(processesAfterEvent, id), 1);
    this.setState({processes: processesAfterEvent});
    this.setState({actualProcessingCount: this.state.actualProcessingCount-1});

    return result;
  }

  findFileProcessesInArray(processes, id) {
    for( var i = 0; i < processes.length; i++){ 
      if ( processes[i].id === id) { 
          return i
      }
    }
  }

  waitUntil = (condition) => {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
          console.log(this.actualProcessingCount)
            if (!condition()) {
                return
            }

            clearInterval(interval)
            resolve()
        }, 100)
    })
  }

  render() {
    return (
      <div>
      { this.state.actualProcessingCount > 0 ? 
        <div className="eventQueue">
          {this.state.processes.map(process => 
            <div className="event" key={process.id}><p>{process.text} </p></div>
          )}
        </div>
        :null
      }
      </div>
    );
  }
}

