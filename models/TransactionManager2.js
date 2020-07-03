// Deuxième version avec appels API

function buyShares(number, price, symbol, id, callback) {
    var formData = new FormData();
    formData.append('number', number)
    formData.append('price', price)
    formData.append('totalprice', (number * price))
    formData.append('symbol', symbol)
    formData.append('id', id)
    return fetch("http://raphko.net/api/buyshares.php", {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson)
        }).catch((error) => {
            console.error(error);
        })
}

function sellShares(number, price, symbol, id, callback) {
    var formData = new FormData();
    formData.append('number', number)
    formData.append('price', price)
    formData.append('totalprice', (number * price))
    formData.append('symbol', symbol)
    formData.append('id', id)
    return fetch("http://raphko.net/api/sellshares.php", {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson)
        }).catch((error) => {
            console.error(error);
        })
}

function getUserTransactionsGroup(id, callback) {
    var formData = new FormData();
    formData.append('user_id', id)
    return fetch("http://raphko.net/api/getusertransactionsgroup.php", {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson)
        })
        .catch((error) => {
            console.error(error);
        });
}

export { buyShares, sellShares, getUserTransactionsGroup }