import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
/* import { WebBrowser } from 'expo';*/

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        this._handleNavigation = this._handleNavigation.bind(this);
}
    static navigationOptions = {
        header: null,
    };

    render() {
        let names = [
            { name: 'تحویل' },
            { name: 'Second' },
            { name: 'Third' },
            { name: 'Fourth' }
        ]

        _renderCard = (obj, index) => {
            return (
                <View style={styles.card} key={index}>
                <Text onPress={() => this._handleNavigation(obj)} style={styles.cardText}>
                {obj.name}
                    </Text>
            </View>
            )
        }

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {names.map((name, index) => {
                        return _renderCard(name, index)
                     })}
                </ScrollView>
            </View>
        );
    }

    _handleNavigation = ({ name }) => {
        this.props.navigation.navigate(name)
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 12,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    card: {
        flex: .3,
        flexDirection: 'row',
        padding: 12,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    cardText: {
        marginLeft: 12,
        fontSize: 23,
    }
});
