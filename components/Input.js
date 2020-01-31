import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { TextInput } from 'react-native-gesture-handler';

export default class Input extends Component {

    handleValidation(value) {
        const { pattern } = this.props;
        if (!pattern) return true;

        if (typeof pattern === 'string') {
            const condition = new RegExp(pattern, 'g');
            return condition.test(value);
        }

        if (typeof pattern === 'object') {
            const conditions = pattern.map(rule => new RegExp(rule, 'g'));
            return conditions.map(condition => condition.test(value));
        }
    }

    onChange(value) {
        const { onChangeText, onValidation } = this.props;
        const isValid = this.handleValidation(value); 
        
        onValidation && onValidation(isValid);
        onChangeText && onChangeText(value);
    }


    render() {
        const {
            pattern,
            onChangeText,
            children,
            style,
            ...props
        } = this.props; 
        
        return (
            <TextInput
                style={style}
                onChangeText={value => this.onChange(value)}
                {...props}
            >
                {children}
            </TextInput>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: responsiveHeight(5),
        width: responsiveWidth(50),
        borderWidth: 1,
        paddingLeft: 15,
        marginTop: 20,
        borderColor: '#DD00DD',
    },
});