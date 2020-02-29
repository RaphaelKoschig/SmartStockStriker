function buyShares($number, $price, $symbol, $id) {
    var formData = new FormData();
    formData.append('number', $number)
    formData.append('price', $price)
    formData.append('symbol', $symbol)
    formData.append('id', $id)
    return fetch("http://raphko.net/api/buyshares.php", {
    method: 'POST',
      body: formData
    })
        .then((response) => {
            console.log("shares bought")
        }).catch((error) => {
            console.error(error);
        })
}

function sellShares($number, $price, $symbol, $id) {
    var formData = new FormData();
    formData.append('number', $number)
    formData.append('price', $price)
    formData.append('symbol', $symbol)
    formData.append('id', $id)
    return fetch("http://raphko.net/api/sellshares.php", {
    method: 'POST',
      body: formData
    })
        .then((response) => {
            console.log("shares sold")
        }).catch((error) => {
            console.error(error);
        })
}

export { buyShares, sellShares }