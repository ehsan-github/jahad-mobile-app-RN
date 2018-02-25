import React, { Component } from 'react';
import {
    ActivityIndicator,
    Text,
    StyleSheet,
    View
} from 'react-native';

export default class Loading extends Component {
    render() {
        return (
        <View style={styles.loadingBG}>
            <ActivityIndicator
                animating={true}
                color="white"
                size="large"
                style={{margin: 15}}
                />

            <Text style={styles.loadingText}>
                {this.props.loadingText} 
            </Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingBG: {},
    loadingText: {}
});
