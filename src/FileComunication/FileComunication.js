class FileComunication {

    async createFile(file, icon, path) {
        var data = new FormData();
        
        data.append("path", path);
        data.append("file", file);
        if(icon !== null) {
            data.append("icon", icon);
        }

        const requestOptions = {
            "Content-Type": 'multipart/form-data',
            method: "POST",
            body: data
        };
        const response = await fetch('http://localhost:8081/file', requestOptions);
        
        return (await response.json()).file;
    }

    async getAllFiles(path) {
        var url = "http://localhost:8081/file?path=" + encodeURIComponent(path);
        console.log(url)
        return await (await fetch( url)).json()
    }

    async createFolder(name, path) {
        var response = await this.sendData('POST', 'http://localhost:8081/folder', { name: name, path: path })
        return (await response.json()).file;
    }

    async deleteFile(fileId) {
        return await this.sendData('DELETE', 'http://localhost:8081/file?id=' + encodeURIComponent(fileId), {})
    }

    async sendData(method, url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: method,
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data)
        });
        return response;
      }
}

export default FileComunication;
