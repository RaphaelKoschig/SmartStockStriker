function getUsers() {
    return fetch("http://raphko.net/api/getusers.php")
        .then((response) => response.json())
        .then((responseJson) => {
                    callback(responseJson)
        })
        .catch((error) => {
            console.error(error)
        });
}

function getUser(mail, password, callback) {
    var formData = new FormData();
        formData.append('mail', mail)
        formData.append('password', password)
        return fetch("http://raphko.net/api/getuser.php", {
        method: 'POST',
          body: formData
        })
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
}

function insertUser(name, mail, password, callback) {
    var formData = new FormData();
    formData.append('name', name)
    formData.append('mail', mail)
    formData.append('password', password)
    return fetch("http://raphko.net/api/insertuser.php", {
    method: 'POST',
      body: formData
    })
        .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson);
        }).catch((error) => {
            console.error(error);
        })
}

function updateUser(mail, password) {
    var formData = new FormData();
    formData.append('mail', mail)
    formData.append('password', password)
    fetch("http://raphko.net/api/updateuser.php", {
        method: 'PATCH',
        body: formData
    }).then(response => {
        console.log("user updated")
    }).catch((error) => {
        console.error(error);
    })
}

export { getUsers, getUser, insertUser, updateUser }