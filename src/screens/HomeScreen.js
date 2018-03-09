import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Card, Button, Avatar, Badge } from 'react-native-elements'
import { Col, Row, Grid } from "react-native-easy-grid";
import { MonoText } from '../components/StyledText';

import { createAreaDb, insertAreaData, createContractDb, insertContractData, createPeriodDb, insertPeriodData, createTypeDb, insertTypeData } from '../db/db'
import { createDataDb, insertData } from '../db/db'
import { createArzeshYabiDataDb, insertArzeshYabiData } from '../db/db'

import { menues } from '../mock/data'
import { getSpItems } from '../api'

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
        createDataDb()
        getSpItems('GetMobileReport')
            .then(data => {
                insertData(data)
            })
            .catch(err => insertData([]))

        createArzeshYabiDataDb()
        getSpItems('GetEvaluationMobile')
            .then(data => {
               insertArzeshYabiData(data)
            })
            .catch(err => insertArzeshYabiData([]))

        createAreaDb()
        createContractDb()
        createPeriodDb()
        createTypeDb()

        getSpItems('GetAreas')
            .then(areas => insertAreaData(areas))
            .catch(err => insertAreaData([]))

        getSpItems('GetContracts')
            .then(contracts => insertContractData(contracts))
            .catch(err => insertContractData([]))

        getSpItems('GetPeriods')
            .then(periods => insertPeriodData(periods))
            .catch(err => insertPeriodData([]))

        getSpItems('GetEavluationTypes')
            .then(types => insertTypeData(types))
            .catch(err => insertTypeData([]))

    }

    _renderCard = (obj, i) => {
        let avatar
        switch(i){
            case 1:
                avatar = require('../assets/images/arzeshyabi_png.png')
                break;
            case 2:
                avatar = require('../assets/images/mali_png.png')
                break;
            case 3:
                avatar = require('../assets/images/ejra_png.png')
                break;
            default:
                avatar = require('../assets/images/tahvil_png.png')
        }
        return (
            <Card key={i} title={obj.name}>
                <View style={styles.card}>
                    <Avatar
                        large
                        source={avatar}
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
