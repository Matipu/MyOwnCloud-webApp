class FileComunication {
    // initNewFile() {
    //     const requestOptions = {
    //         method: 'POST',
    //         body: JSON.stringify({path: 'tst', name: 'test'}),
    //         headers: { 
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin' : '"*', 
    //             'Access-Control-Allow-Credentials' : true,
    //             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    //         }
    //     };
    //     fetch('http://localhost:8081/file', requestOptions)
    //         .then(function (response) {
    //             console.log(response);
    //             return response.json();
    //         });
    // }

    createFile(file) {
        var data = new FormData();
        data.append("file", file);

        const requestOptions = {
            "Content-Type": 'multipart/form-data',
            method: "POST",
            body: data
        };
        fetch('http://localhost:8081/file', requestOptions)
            .then(response => response.json())
            .then(function (response) {
                console.log(response);
                console.log(response.id);
                return response.id;
            });
    }
}

export default FileComunication;
