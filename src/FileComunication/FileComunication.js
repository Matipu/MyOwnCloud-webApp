import IconCreator from "./../IconCreator/IconCreator";
import download from "downloadjs";

const url = "192.160.1.102:8081";
export default class FileComunication {
  async getFileContent(id) {
    var requestUrl = "http://" + url + "/file/content?id=" + encodeURIComponent(id);
    var response = await (await fetch(requestUrl)).json();
    return response.content;
  }

  async getFileIcon(id) {
    var requestUrl = "http://" + url + "/file/icon?id=" + encodeURIComponent(id);
    var response = await (await fetch(requestUrl)).json();
    return response.content;
  }

  async downloadFile(id) {
    var requestUrl = "http://" + url + "/file/download?id=" + encodeURIComponent(id);
    var response  = await fetch(requestUrl);
    response.headers.forEach(console.log);
    console.log(response.headers)
    var fileName = response.headers.get('fileName')
    var fileContentType = response.headers.get('fileContentType')
    console.log(fileName)
    console.log(fileContentType)
    var blob = await (response).blob();
    download(blob, fileName, fileContentType);
  }

  async createFile(file, path) {
    var icon = await new IconCreator().createIcon(file);
    var data = new FormData();
    data.append("path", path);
    data.append("file", file);
    if (icon !== null) {
      data.append("icon", icon);
    }
    const requestOptions = {
      "Content-Type": "multipart/form-data",
      method: "POST",
      body: data,
    };
    const response = await fetch("http://" + url + "/file", requestOptions);

    return (await response.json()).file;
  }

  async getAllFiles(path) {
    var requestUrl = "http://" + url + "/file?path=" + encodeURIComponent(path);
    return await (await fetch(requestUrl)).json();
  }

  async changeName(fileId, name) {
    var response = await sendData("PATCH", "http://" + url + "/file?id=" + encodeURIComponent(fileId), { name: name });
    return response;
  }

  async createFolder(name, path) {
    var response = await sendData("POST", "http://" + url + "/folder", {
      name: name,
      path: path,
    });
    return (await response.json()).file;
  }

  async deleteFile(fileId) {
    return await sendData("DELETE", "http://" + url + "/file?id=" + encodeURIComponent(fileId), {});
  }
}

async function sendData(method, url = "", data = {}) {
  const response = await fetch(url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response;
}
