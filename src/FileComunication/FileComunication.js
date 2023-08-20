class FileComunication {
    createNewFile() {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({path: 'tst', name: 'test'}),
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '"*', 
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
           
        };
        fetch('http://localhost:8081/file', requestOptions)
            .then(function (response) {
                console.log(response);
                return response.json();
              });
    }
}

export default FileComunication;
