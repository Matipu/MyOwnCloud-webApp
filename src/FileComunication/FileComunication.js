class FileComunication {

    async createFile(file, icon) {
        var data = new FormData();
        data.append("file", file);
        if(icon !== null) {
            data.append("icon", icon);
        }

        const requestOptions = {
            "Content-Type": 'multipart/form-data',
            method: "POST",
            body: data
        };
        await fetch('http://localhost:8081/file', requestOptions);
    }

    async getAllFiles() {
        return await (await fetch("http://localhost:8081/file")).json()
    }
}

export default FileComunication;
