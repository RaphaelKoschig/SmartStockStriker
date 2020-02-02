import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../components/Input';
import { UserManager } from '../models/UserManager';

export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nameIsValid: null,
            emailIsValid: null,
            passwordIsValid: null,
            name: "",
            email: "",
            password: "",
        }
    }

    render() {
        const { emailIsValid } = this.state;
        const { nameIsValid } = this.state;
        const { passwordIsValid } = this.state;
        const { name } = this.state;
        const { email } = this.state;
        const { password } = this.state;

        const user = new UserManager();

        const _onRegisterPressed = () => {

            if (!nameIsValid) {
                alert('Nom invalide !')
            }
            else if (!emailIsValid) {
                alert('Email invalide !')
            }
            else if (!passwordIsValid[0] || !passwordIsValid[1] || !passwordIsValid[2]) {
                alert('Password invalide !')
            }
            else {
                    user.addUser(name, email, password, (success) => {
                        if (success != undefined) {
                            alert('Vos informations ont été enregistrées')
                            this.props.navigation.navigate('Home');
                        }
                    })
            }
        }

        return (
            <View style={styles.container} >
                <Text style={styles.title}>Inscription</Text>
                <Input
                    style={[styles.input, {
                        borderColor: nameIsValid ? '#17c702' : 'black',
                        borderWidth: nameIsValid ? 2 : 1
                    }]}
                    placeholder="Nom"
                    placeholderTextColor="grey"
                    pattern='^[a-zA-Z]{3,}$'
                    onValidation={nameIsValid => this.setState({ nameIsValid })}
                    onChangeText={(text) => this.setState({ name: text })}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
                <Input
                    style={[styles.input, {
                        borderColor: emailIsValid ? '#17c702' : 'black',
                        borderWidth: emailIsValid ? 2 : 1
                    }]}
                    placeholder="Email"
                    placeholderTextColor="grey"
                    keyboardType='email-address'
                    pattern='^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$'
                    onValidation={emailIsValid => this.setState({ emailIsValid })}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <Input
                    style={[styles.input, {
                        borderColor: passwordIsValid && passwordIsValid[0] && passwordIsValid[1] && passwordIsValid[2] ? '#17c702' : 'black',
                        borderWidth: passwordIsValid && passwordIsValid[0] && passwordIsValid[1] && passwordIsValid[2] ? 2 : 1
                    }]}
                    placeholder="Password"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    pattern={['[a-zA-Z]{1,14}', '[0-9]{1,14}', '^[a-zA-Z0-9]{4,15}$']}
                    onValidation={passwordIsValid => this.setState({ passwordIsValid })}
                    onChangeText={(text) => this.setState({ password: text })}
                />
                <Text>4 à 15 caractères</Text>
                <Text>Au moins un chiffre</Text>
                <Button
                    buttonStyle={styles.button_plain}
                    title="INSCRIPTION"
                    onPress={_onRegisterPressed}
                />
                <Text style={styles.text_dejainscrit}>Déjà inscrit ?</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                >

                    <Text style={styles.text_inscription}>Connectez-vous</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        color: '#3f99b5',
    },
    input: {
        height: responsiveHeight(5),
        width: responsiveWidth(70),
        paddingLeft: 15,
        marginTop: 20,
    },
    button_plain: {
        marginTop: 50,
        alignItems: 'center',
        backgroundColor: '#3f99b5',
        padding: 10,
        width: responsiveWidth(50),
    },
    button_white: {
        marginTop: 20,
        borderColor: '#3f99b5',
        width: responsiveWidth(40),
    },
    text_inscription: {
        color: '#3f99b5',
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
    },
    text_dejainscrit: {
        color: '#000000',
        fontSize: responsiveFontSize(1.5),
        marginTop: 20,
    }
});