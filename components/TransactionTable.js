import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import { getQuote } from '../models/QuoteManager';
import { getUser } from '../models/UserManager2';
import { getUserTransactionsGroup } from '../models/TransactionManager2';

export default class DashboardScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            usermail: this.props.usermail,
            userpassword: this.props.userpassword,
            refresh: this.props.refresh,
            tableHead: ['Symbol', 'Entreprise', 'Actions', 'Valeur Unitaire', 'Total'],
            tableData: [],
            tableFooter: [],
            tableTotal: [],
            isLoading: true,
        }
    }

    mountTable(usermail, userpassword) {
        getUser(usermail, userpassword, (user) => {
            getUserTransactionsGroup(user.user_id, (userTransactionsGroup) => {
                var tableData = [];
                var counter = 0;
                var limit = userTransactionsGroup.length;
                var totalPriceOfTotalShares = 0;
                this.setState({ tableFooter: ['Portefeuille', user.user_cash + '$'] });
                if (limit > counter) {
                    userTransactionsGroup.forEach(transaction => {
                        getQuote(transaction.trans_symbol, (quote) => {
                            var roundQuotePrice = (quote.latestPrice).toFixed(2)
                            var TotalPrice = transaction.totalshares * quote.latestPrice;
                            var roundTotalprice = TotalPrice.toFixed(2)
                            totalPriceOfTotalShares = totalPriceOfTotalShares + TotalPrice;
                            var userTransaction = [quote.symbol, quote.companyName, transaction.totalshares, roundQuotePrice + '$', roundTotalprice + '$']
                            try {
                                tableData.push(userTransaction)
                                //console.log(tableData)
                                tableData.sort()
                                this.setState({ tableData: tableData })
                                counter += 1;
                                //console.log(counter)
                            } catch (error) {
                                console.log(error)
                            }
                            if (counter == limit) {
                                var roundGlobalTotal = (Number(user.user_cash) + totalPriceOfTotalShares).toFixed(2);
                                this.setState({ tableTotal: ['Actions + Portefeuille', roundGlobalTotal + '$'] });
                                this.setState({ isLoading: false });
                            }
                        }
                        )
                    }
                    )
                }
                else {
                    this.setState({ isLoading: false })
                }
            })
        })
    }

    componentDidMount() {
        const { usermail } = this.state;
        const { userpassword } = this.state;
        this.mountTable(usermail, userpassword);
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ isLoading: true });
        const { usermail } = this.props;
        const { userpassword } = this.props;
        if (props.usermail == usermail) {
            this.mountTable(usermail, userpassword);
        }
    }

    render() {

        const state = this.state;
        const { refresh } = this.state;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <ScrollView>
                <Text>{refresh}</Text>
                <Table style={styles.table} borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={state.tableData} textStyle={styles.text} />
                    <Row data={state.tableFooter} flexArr={[4, 1]} textStyle={styles.text} />
                    <Row data={state.tableTotal} flexArr={[4, 1]} textStyle={[styles.text, { fontWeight: 'bold' }]} />
                </Table>
            </ScrollView>
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
});