import React from 'react'
import { StyleSheet, View, Text, RefreshControl, } from 'react-native'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Button } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { UserManager } from '../models/UserManager';
import { getQuote } from '../models/QuoteManager';
import { NavigationEvents } from 'react-navigation';

export default class DashboardScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tableHead: ['Symbol', 'Entreprise', 'Actions', 'Valeur Unitaire', 'Total'],
            tableData: [],
            tableFooter: [],
            tableTotal: [],
        }
    }

    componentDidMount() {
        const navigation = this.props.navigation;
        const usermail = navigation.getParam('usermail', 'Noname');


        const user = new UserManager();

        user.getUserCash(usermail, (usercash) => {
            //console.log(usercash)
            var roundUsercash = Number(usercash).toFixed(2)
            this.setState({ tableFooter: ['Portefeuille', roundUsercash + '$'] })
            user.getUserId(usermail, (userId) => {
                user.getUserTotalSharesValue(userId, (totalSharesValue) => {
                    var roundGlobalTotal = Number(usercash + totalSharesValue).toFixed(2)
                    this.setState({ tableTotal: ['Actions + Portefeuille', roundGlobalTotal + '$'] })
                })
            })
        })

        user.getUserId(usermail, (userId) => {
            user.getUserTransactionsGroup(userId, (userTransactionsGroup) => {
                var tableData = [];
                userTransactionsGroup.forEach(transaction => {
                    getQuote(transaction.symbol, (quote) => {
                        var roundQuotePrice = Number(quote.latestPrice).toFixed(2)
                        var roundTotalprice = Number(transaction.totalprice).toFixed(2)
                        var userTransaction = [quote.symbol, quote.companyName, transaction.totalshares, roundQuotePrice + '$', roundTotalprice + '$']
                        //console.log(userTransaction)
                        try {
                            tableData.push(userTransaction)
                            console.log(tableData)
                            tableData.sort()
                            this.setState({ tableData: tableData })
                        } catch (error) {
                            console.log(error)
                        }
                    })
                })
            })
        })
    }

    render() {
        const state = this.state;
        const navigation = this.props.navigation;
        const username = navigation.getParam('username', 'Noname');
        const usermail = navigation.getParam('usermail', 'Noname');

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>$MART $TOCK $TRIKER</Text>
                    <Text style={styles.titleDash}>Dashboard de {username}</Text>
                    <Button buttonStyle={styles.button_plain}
                        title="ACHETER/VENDRE"
                        onPress={() => this.props.navigation.navigate('SearchQuote', { usermail: usermail })}
                    />
                </View>
                <View style={styles.content}>
                    <ScrollView>
                        <Table style={styles.table} borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                            <Rows data={state.tableData} textStyle={styles.text} />
                            <Row data={state.tableFooter} flexArr={[4, 1]} textStyle={styles.text} />
                            <Row data={state.tableTotal} flexArr={[4, 1]} textStyle={[styles.text, { fontWeight: 'bold' }]} />
                        </Table>
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.text_unlogin}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    table: {
        marginTop: responsiveHeight(2),
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6, textAlign: 'center', fontSize: responsiveFontSize(1.4) },
    header: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    content: {
        flex: 8,
        justifyContent: 'flex-start',
        //backgroundColor: 'green',
    },
    footer: {
        flex: 1,
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
    titleDash: {
        fontSize: responsiveFontSize(3),
        color: '#000',
    },
    button_plain: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#3f99b5',
        padding: 10,
        width: responsiveWidth(50),
    },
    button_white: {
        marginTop: 20,
        borderColor: '#3f99b5',
        width: responsiveWidth(50),
    },
    text_unlogin: {
        color: '#3f99b5',
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        margin: responsiveHeight(1),
        textAlign: 'center',
    },
});