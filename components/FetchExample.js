import React from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import { IEXCLOUD_SECRET_KEY } from 'react-native-dotenv'

export default class FetchExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    //Get every quotes :
    //https://cloud.iexapis.com/beta/ref-data/symbols?token=
    //Get one quote :
    //https://cloud.iexapis.com/stable/stock/fb/quote?token=
    //Flatlist of quotes :
    /*
    <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={quote}
          renderItem={({item}) => <Text>{item.symbol}, {item.name}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    */
    //View of one quote :
    /*
                 <View style={{ flex: 1, paddingTop: 20 }}>
                 <Text>Stock Option {quote.companyName}</Text>
                 <Text>{quote.symbol}, {quote.latestPrice}</Text>
             </View>
    */


    componentDidMount() {
        return fetch("https://cloud.iexapis.com/stable/stock/aapl/quote?token=" + IEXCLOUD_SECRET_KEY)
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
