import React from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import Input from '../components/Input';
import { Button } from 'react-native-elements';
import { getQuote } from '../models/QuoteManager';
import { UserManager } from '../models/UserManager';
import { TransactionManager } from '../models/TransactionManager';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SearchQuoteScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            symbolIsValid: null,
            symbol: "",
            number: 0,
            quote: {
                "companyName": "_________",
                "symbol": "",
                "latestPrice": "0.00",
            },
        }
    }



    render() {
        const { symbolIsValid } = this.state;
        const { symbol } = this.state;
        const { quote } = this.state;
        const { number } = this.state;
        const navigation = this.props.navigation;
        const usermail = navigation.getParam('usermail', 'Noname');

        const user = new UserManager();
        const transaction = new TransactionManager();

        const _onSearchPressed = () => {
            if (!symbolIsValid) {
                alert('Veuillez tapez des caractères valides !')
            }
            else {
                getQuote(symbol, (quote) => {
                    this.setState({ quote: quote })
                })
            }
        }

        const _onBuyPressed = () => {
            user.getUserId(usermail, (userId) => {
                transaction.buyShares(number, quote.latestPrice, quote.symbol, userId, (success) => {
                    this.props.navigation.navigate('Dashboard');
                })
            })
        }

        const _onSellPressed = () => {
            user.getUserId(usermail, (userId) => {
                transaction.sellShares(number, quote.latestPrice, quote.symbol, userId, (success) => {
                    this.props.navigation.navigate('Dashboard');
                })
            })
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>$MART $TOCK $TRIKER</Text>
                    <Text style={styles.titleSearch}>Indiquez un symbole boursier</Text>
                </View>
                <View style={styles.content}>
                    <Input
                        style={[styles.input, {
                            borderColor: symbolIsValid ? '#17c702' : 'black',
                            borderWidth: symbolIsValid ? 2 : 1
                        }]}
                        placeholder="Symbol (ex: AAPL/FB/NFLX)"
                        placeholderTextColor="grey"
                        pattern='^[a-zA-Z0-9]{2,}$'
                        onValidation={symbolIsValid => this.setState({ symbolIsValid })}
                        onChangeText={(text) => this.setState({ symbol: text })}
                        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    />
                    <Button
                        buttonStyle={styles.button_plain}
                        title="CHERCHER"
                        onPress={_onSearchPressed}
                    />
                    <View style={styles.quote_container}>
                        <Text>Stock Option de : </Text>
                        <Text>{quote.companyName}</Text>
                        <Text>Dernière valeur en bourse : </Text>
                        <Text>{quote.latestPrice} $</Text>
                    </View>
                    <Input
                        style={styles.input_howmany}
                        placeholder="combien ?"
                        placeholderTextColor="grey"
                        pattern='^[0-9]{1,}$'
                        onValidation={numberIsValid => this.setState({ numberIsValid })}
                        onChangeText={(text) => this.setState({ number: text })}
                        keyboardType='numeric'
                    />
                    <View style={{
                        flexDirection: 'row'
                    }
                    }>
                        <Button
                            buttonStyle={[styles.button_plain, styles.button_transact]}
                            title="VENDRE"
                            onPress={_onSellPressed}
                        />
                        <Button
                            buttonStyle={[styles.button_plain, styles.button_transact]}
                            title="ACHETER"
                            onPress={_onBuyPressed}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                        <Text style={styles.text_unlogin}>Dashboard</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    content: {
        flex: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: 'green',
    },
    title: {
        fontSize: responsiveFontSize(3.5),
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        color: '#3f99b5',
        marginBottom: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#d6d7da',
        borderBottomColor: '#d6d7da',
        alignItems: 'center',
        padding: 2,
    },
    titleSearch: {
        fontSize: responsiveFontSize(3),
        color: '#000',
    },
    input: {
        height: responsiveHeight(5),
        width: responsiveWidth(60),
        paddingHorizontal: 30,
        marginTop: 20,
    },
    input_howmany: {
        borderColor: 'black',
        borderWidth: 1,
        width: responsiveWidth(20),
        height: responsiveHeight(7),
        paddingHorizontal: responsiveWidth(1.5),
        marginTop: responsiveHeight(5),
    },
    button_plain: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#3f99b5',
        padding: 10,
        width: responsiveWidth(60),
    },
    button_transact: {
        width: responsiveWidth(30),
        margin: responsiveWidth(3)
    },
    quote_container: {
        alignItems: 'center',
        marginTop: 30,
    },
    footer: {
        flex: 1,
    },
    text_unlogin: {
        color: '#3f99b5',
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        margin: responsiveHeight(1),
        textAlign: 'center',
    },
})