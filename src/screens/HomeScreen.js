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

import { Card, ListItem, Button, Avatar, Badge } from 'react-native-elements'
import { Col, Row, Grid } from "react-native-easy-grid";
import { MonoText } from '../components/StyledText';

import { createAreaDb, insertAreaData, createContractDb, insertContractData, createPeriodDb, insertPeriodData } from '../db/db'

import { menues, areas, contracts, periods } from '../mock/data'

export default class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        this._handleNavigation = this._handleNavigation.bind(this);
    }

    static navigationOptions = {
      title: 'خانه',
      headerStyle: {
          backgroundColor: '#03A9F4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
    };

    componentWillMount(){
        createAreaDb()
        insertAreaData(areas)
        createContractDb()
        insertContractData(contracts)
        createPeriodDb()
        insertPeriodData(periods)
    }

    _renderCard = (obj, i) => {
        return (
            <Card key={i} title={obj.name}>
                <View style={styles.card}>
                    <Avatar
                        large
                        source={{ uri: obj.avatar }}
                        activeOpacity={0.7}
                    />
                    <Text style={styles.cardText}>
                        {obj.name}
                    </Text>
                    <Badge
                        value={3}
                        textStyle={styles.cardBadge}
                    />
                </View>
                <Button
                    icon={{ name: 'check' }}
                    backgroundColor='#03A9F4'
                    buttonStyle={styles.cardButton}
                    onPress={() => this._handleNavigation(obj)}
                    title='مشاهده کنید' />
            </Card>
            );
        }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {menues.map((obj, index) => {
                        return this._renderCard(obj, index)
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
        justifyContent: 'space-between'
    },
    cardText: {
        marginLeft: 12,
    },
    cardButton: {
        borderRadius: 5,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
    },
    cardBadge: {
        color: 'orange',
    },
    name: {}
});
