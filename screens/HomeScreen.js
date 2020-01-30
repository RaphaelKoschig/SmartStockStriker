import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { Button } from 'react-native-elements';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row',}}>
                    <Image
                        source={require('../assets/businessman.png')}
                        style={{ width: 100, height: 200}}
                    />
                    <Image
                        source={require('../assets/businesswoman.png')}
                        style={{ width: 100, height: 200}}
                    />
                </View>
                <Text style={styles.title}>SMART STOCK BROKER</Text>
                <Button buttonStyle={styles.button_plain}
                    title="CONNEXION"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button buttonStyle={styles.button_white}
                    title="INSCRIPTION"
                    type="outline"
                    titleStyle={styles.text_inscription}
                    onPress={() => this.props.navigation.navigate('Register')}
                />
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
        marginBottom: 30,
    },
    button_plain: {
        marginTop: 20,
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
    text_inscription: {
        color: '#3f99b5',
    }
});