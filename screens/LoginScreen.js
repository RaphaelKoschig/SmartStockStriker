import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Button } from 'react-native-elements';
import Input from '../components/Input';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>$MART $TOCK $TRIKER</Text>
                </View>
                <View style={styles.content}>
                    <Input
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="grey"
                        keyboardType='email-address'
                        pattern='^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$'
                        onChangeText={(text) => this.setState({ checkEmail: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ checkPassword: text })}
                    />
                    <Button buttonStyle={styles.button_plain}
                        title="CONNEXION"
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                    <View style={styles.text_inscrit}>
                        <Text style={{fontWeight:"bold"}}>Pas encore inscrit ?</Text>
                        <Text>Profitez d'un portefeuille virtuel pour tester</Text>
                        <Text> vos compétences d'actions en bourse ! </Text>
                    </View>
                    <Button buttonStyle={styles.button_white}
                        title="S'inscrire"
                        type="outline"
                        titleStyle={styles.text_inscription}
                        onPress={() => this.props.navigation.navigate('Inscription')}
                    />
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
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'green',
    },
    title: {
        fontSize: responsiveFontSize(3.5),
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        color: '#3f99b5',
        marginBottom: 30,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#d6d7da',
        borderBottomColor: '#d6d7da',
        alignItems: 'center',
        padding: 2,
    },
    input: {
        height: responsiveHeight(5),
        width: responsiveWidth(70),
        borderWidth: 1,
        paddingLeft: 15,
        marginTop: 20,
    },
    button_plain: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#3f99b5',
        padding: 10,
        width: responsiveWidth(50),
    },
    button_white: {
        marginTop: 10,
        borderColor: '#3f99b5',
        width: responsiveWidth(30),
    },
    text_inscription: {
        color: '#3f99b5',
        fontSize: responsiveFontSize(1.5),
    },
    text_inscrit: {
        color: '#000000',
        fontSize: responsiveFontSize(1.5),
        marginTop: 60,
        alignItems: 'center',
    }
});