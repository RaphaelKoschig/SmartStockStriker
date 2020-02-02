import { IEXCLOUD_SECRET_KEY } from 'react-native-dotenv'

    function getQuote(symbol, callback) {
        return fetch("https://cloud.iexapis.com/stable/stock/"+symbol+"/quote?token=" + IEXCLOUD_SECRET_KEY)
            .then((response) => response.json())
            .then((responseJson) => {
                        callback(responseJson)
            })
            .catch((error) => {
                alert('Symbole boursier incorrect !')
            });
    }

export { getQuote }