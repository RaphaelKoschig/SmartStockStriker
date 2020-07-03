import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-simple-toast';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TransactionTable from '../components/TransactionTable';

export default class DashboardScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            usermail: props.navigation.getParam('usermail', null),
        }
    }

    render() {
        const navigation = this.props.navigation;
        const username = navigation.getParam('username', 'Noname');
        const userpassword = navigation.getParam('userpassword', null);
        const { usermail } = this.state;

        const _onLogoutPressed = () => {
            this.props.navigation.navigate('Home');
            Toast.show('Déconnexion !');
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>$MART $TOCK $TRIKER</Text>
                    <Text style={styles.titleDash}>Dashboard de {username}</Text>
                    <Button buttonStyle={styles.button_plain}
                        title="ACHETER/VENDRE"
                        onPress={() => this.props.navigation.navigate('SearchQuote', { usermail: usermail, userpassword: userpassword })}
                    />
                </View>
                <View style={styles.content}>
                    <TransactionTable usermail={usermail} userpassword={userpassword}/>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={_onLogoutPressed}>
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
    },
    content: {
        flex: 8,
        justifyContent: 'flex-start',
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