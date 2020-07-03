import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-simple-toast';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Input from '../components/Input';
import { Button } from 'react-native-elements';
import { getQuote } from '../models/QuoteManager';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUser } from '../models/UserManager2';
import { sellShares, buyShares } from '../models/TransactionManager2';

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
        const usermail = navigation.getParam('usermail', null);
        const userpassword = navigation.getParam('userpassword', null);

        const _onSearchPressed = () => {
            if (!symbolIsValid) {
                Toast.show('Veuillez tapez des caractères valides !')
            }
            else {
                getQuote(symbol, (quote) => {
                    this.setState({ quote: quote })
                })
            }
        }

        const _onBuyPressed = () => {
            if (number == '' || number == 0 ) {
                Toast.show('Veuillez indiquer un nombre d\'actions !')
            }
            else if(quote.symbol == '') {
                Toast.show('Veuillez chercher une action en bourse !')
            }
            else {
                getUser(usermail, userpassword, (user) => {
                    buyShares(number, quote.latestPrice, quote.symbol, user.user_id, (success) => {
                        if(success.buy_success){
                            Toast.show('Achat effectué !')
                            this.props.navigation.navigate('Dashboard', { usermail: usermail, userpassword: userpassword });
                        }
                        else{
                            Toast.show('Vous n\'avez pas assez de cash !')
                        }
                    })
                })
            }
        }

        const _onSellPressed = () => {
            if (number == '' || number == 0) {
                Toast.show('Veuillez indiquer un nombre d\'actions !')
            }
            else if(quote.symbol == '') {
                Toast.show('Veuillez chercher une action en bourse !')
            }
            else {
                getUser(usermail, userpassword, (user) => {
                    sellShares(number, quote.latestPrice, quote.symbol, user.user_id, (success) => {
                        if (success.sell_success) {
                            Toast.show('Vente effectuée !')
                            this.props.navigation.navigate('Dashboard', { usermail: usermail, userpassword: userpassword });
                        } 
                        else {
                            Toast.show('Vous n\'avez pas assez d\'actions de cette entreprise !')
                        }
                    })
                })
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>$MART $TOCK $TRIKER</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                        <Text style={styles.text_unlogin}>Dashboard</Text>
                    </TouchableOpacity>
                    <Text style={styles.titleSearch}>Indiquez un symbole boursier</Text>
                </View>
                <View style={styles.content}>
                    <Input
                        style={[styles.input, {
                            borderColor: symbolIsValid ? '#17c702' : 'black',
                            borderWidth: symbolIsValid ? 2 : 1
                        }]}
                        placeholder="AAPL/FB/NFLX"
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
                        <Text style={styles.quote_text}>{quote.companyName}</Text>
                        <Text>Dernière valeur en bourse : </Text>
                        <Text style={styles.quote_text}>{quote.latestPrice} $</Text>
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
    },
    content: {
        flex: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: responsiveFontSize(3.5),
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        color: '#3f99b5',
        marginBottom: 5,
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
        height: responsiveHeight(7),
        width: responsiveWidth(60),
        paddingHorizontal: 30,
        marginTop: 20,
        textAlign: 'center',
        fontSize: responsiveFontSize(3),
    },
    input_howmany: {
        borderColor: 'black',
        borderWidth: 1,
        width: responsiveWidth(35),
        height: responsiveHeight(7),
        paddingHorizontal: responsiveWidth(1.5),
        marginTop: responsiveHeight(5),
        textAlign: 'center',
        fontSize: responsiveFontSize(3),
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
        width: responsiveWidth(70),
    },
    quote_text: {
        fontSize: responsiveFontSize(3),
        color: '#0babdd',
        fontWeight: 'bold',
    },
    text_unlogin: {
        color: '#3f99b5',
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        margin: responsiveHeight(1),
        textAlign: 'center',
    },
})