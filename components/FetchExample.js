import React from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import { IEXCLOUD_SECRET_KEY } from 'react-native-dotenv'

export default class FetchExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    componentDidMount() {
        return fetch('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_0a85c2b70b54464f81a834392e0bbba3')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        isLoading: false,
                        quote: responseJson
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { quote } = this.state;
        console.log(this.state.dataSource);

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Text>Stock Option {quote.companyName}</Text>
                <Text>{quote.symbol}, {quote.latestPrice}</Text>

            </View>
        );
    }
}
