import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Button } from 'react-native-elements';
import { DatabaseManager } from '../models/DatabaseManager';



export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const database = new DatabaseManager();
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', }}>
                    <Image
                        source={require('../assets/businessman.png')}
                        style={{ width: 100, height: 200 }}
                    />
                    <Image
                        source={require('../assets/businesswoman.png')}
                        style={{ width: 100, height: 180, marginTop: 10, marginRight: 10}}
                    />
                </View>
                <Text style={styles.title}>$MART $TOCK $TRIKER</Text>
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