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
import { Col, Row, Grid } from "react-native-easy-grid";

import DropDown2 from '../DropDown2.js'

import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

import R from 'ramda';

export class FiltersTabBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            period: { options: [], value: -1 },
            area: { options: [], value: -1 },
            contract: { options: [], value: -1 }
        }
        this.getAreaDataAndSetIt = this.getAreaDataAndSetIt.bind(this)
        this.getContractDataAndSetIt = this.getContractDataAndSetIt.bind(this)
        this.getPeriodDataAndSetIt = this.getPeriodDataAndSetIt.bind(this)

        this.periodDropdownChanged = this.periodDropdownChanged.bind(this)
        this.areaDropdownChanged = this.areaDropdownChanged.bind(this)
        this.contractDropdownChanged = this.contractDropdownChanged.bind(this)
    }

    componentWillMount(){
        this.getAreaDataAndSetIt()
        this.getContractDataAndSetIt()
        this.getPeriodDataAndSetIt()
    }

    getAreaDataAndSetIt(){
        db.transaction(
            tx => {
                tx.executeSql(
                    `select * from areas`,
                    [],
                    (_, { rows: { _array } }) => this.setState({ area: { options: _array, value: -1 } })
                )
            }
        )
    }

    getContractDataAndSetIt(areaId = null){
        areaId = areaId || this.state.area.value
        let query = (areaId == -1)
                  ? `select * from contracts`
                  : `select * from contracts where areaId = ${areaId}`
        db.transaction(
            tx => {
                tx.executeSql(
                    query,
                    [],
                    (_, { rows: { _array } }) => {
                        this.setState({ contract: { options: _array, value: -1 } })
                        this.props.contractChanged({ options: R.map(R.prop('id'),_array), value: -1 })
                    }
                )
            }
        )
    }

    getPeriodDataAndSetIt(){
        db.transaction(
            tx => {
                tx.executeSql(
                    `select * from periods`,
                    [],
                    (_, { rows: { _array } }) => {
                        this.setState({ period: { options: _array, value: '-1'} })
                    }
                )
            }
        )
    }

    periodDropdownChanged(i){
        let { period: oldValue } = this.state
        let value = oldValue.options[i-1]
        let newValue = R.assoc('value', value ? value.id : -1, oldValue)
        this.setState({
            period: newValue
        })

        this.props.periodChanged({ period: value || {} })
    }

    areaDropdownChanged(i){
        let { area: oldValue } = this.state
        let value = oldValue.options[i-1] ? oldValue.options[i-1].id : -1
        let newValue = R.assoc('value', value, oldValue)
        this.setState({
            area: newValue
        })
        this.getContractDataAndSetIt(value)
    }

    contractDropdownChanged(i){
        let { contract: oldValue } = this.state
        let value = oldValue.options[i-1] ? oldValue.options[i-1].id : -1
        let newValue = R.assoc('value', value, oldValue)
        this.setState({
            contract: newValue
        })
        this.props.contractChanged({ value })
    }

    render() {
        let periodOptions = R.prepend({ id: -1, name: 'همه' }, this.state.period.options)
        let periodValue = this.state.period.value
        let periodIndex = R.findIndex(R.propEq('id', periodValue), periodOptions)
        if (periodIndex == -1) periodIndex = 0

        let areaOptions = R.prepend({ id: -1, name: 'همه' }, this.state.area.options)
        let areaValue = this.state.area.value
        let areaIndex = R.findIndex(R.propEq('id', areaValue), areaOptions)

        let contractOptions = R.prepend({ id: -1, name: 'همه' }, this.state.contract.options)
        let contractValue = this.state.contract.value
        let contractIndex = R.findIndex(R.propEq('id', contractValue), contractOptions)

        return (
            <View style={styles.tabBarInfoContainer}>
                <View style={styles.tabBarFilterRight}>
                    <DropDown2 name="دوره" myref="1" style={styles.dorpDown} defaultValue={periodIndex} options={periodOptions} handleValueChange={this.periodDropdownChanged}/> 
                </View>
                <View style={styles.tabBarFilterMiddle}>
                    <DropDown2 middle name="حوزه" myref="2" style={styles.dropDown} defaultValue={areaIndex} options={areaOptions} handleValueChange={this.areaDropdownChanged}/> 
                </View>
                <View style={styles.tabBarFilterLeft}>
                    <DropDown2 name="پیمان" myref="3" style={styles.dropDown} defaultValue={contractIndex} options={contractOptions} handleValueChange={this.contractDropdownChanged}/> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarInfoContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        flex: 1,
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 0,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    tabBarGrid: {
        direction: 'rtl'
    },
    tabBarFilterRight: {
        /* right: '5%',*/
        /* position: 'absolute',*/
        flex: .33,
        flexBasis: .33,
        /* width: 50*/
    },
    tabBarFilterMiddle: {
        /* left: '50%',*/
        /* position: 'absolute',*/
        flex: .34,
        flexBasis: .34,
        /* width: 50*/
    },
    tabBarFilterLeft: {
        /* left: '17%',*/
        /* position: 'absolute',*/
        flex: .33,
        flexBasis: .33,
        /* width: 50*/
    },
    col: {
        margin: -70
    },
    dropDown: {
        height: 30
    },
});

