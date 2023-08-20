class FileComunication {

    createFile(file, icon) {
        var data = new FormData();
        data.append("file", file);
        data.append("icon", icon);

        const requestOptions = {
            "Content-Type": 'multipart/form-data',
            method: "POST",
            body: data
        };
        fetch('http://localhost:8081/file', requestOptions)
            .then(response => response.json())
            .then(function (response) {
                return response.id;
            });
    }

    async getAllFiles() {
        return await (await fetch("http://localhost:8081/file")).json()
    }
}

export default FileComunication;
