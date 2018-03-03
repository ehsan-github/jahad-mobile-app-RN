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

import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

import DropDown from './DropDown';

import R from 'ramda';

const mainOptions = [{name: 'دوره', id: 0}, {name: 'حوزه', id: 1}, {name: 'پیمان', id: 2}]

export class FiltersTabBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            mainOptionsIndex: 0,
            'دوره': { options: [], value: -1 },
            'حوزه': { options: [], value: -1 },
            'پیمان': { options: [], value: -1 }
        }
        this.mainDropDownChanged = this.mainDropDownChanged.bind(this)
        this.minorDropDownChanged= this.minorDropDownChanged.bind(this)
        this.getAreaDataAndSetIt = this.getAreaDataAndSetIt.bind(this)
        this.getContractDataAndSetIt = this.getContractDataAndSetIt.bind(this)
        this.getPeriodDataAndSetIt = this.getPeriodDataAndSetIt.bind(this)
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
                    (_, { rows: { _array } }) => this.setState({ 'حوزه': { options: _array, value: -1 } })
                )
            }
        )
    }

    getContractDataAndSetIt(areaId = null){
        areaId = areaId || this.state['حوزه'].value
        let query = (areaId == -1)
                  ? `select * from contracts`
                  : `select * from contracts where areaId = ${areaId}`
        db.transaction(
            tx => {
                tx.executeSql(
                    query,
                    [],
                    (_, { rows: { _array } }) => {
                        this.setState({ 'پیمان': { options: _array, value: -1 } })
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
                    (_, { rows: { _array } }) => this.setState({ 'دوره': { options: _array, value: '-1'} })
                )
            }
        )
    }

    mainDropDownChanged(value, i){
        this.setState({
            mainOptionsIndex: i
        })
    }

    minorDropDownChanged(value, i){
        let { mainOptionsIndex } = this.state
        let mainOptionName = mainOptions[mainOptionsIndex].name
        let { [mainOptionName]: oldValue } = this.state
        let newValue = R.assoc('value', value, oldValue)
        this.setState({
            [mainOptionName]: newValue
        })
        if (mainOptionsIndex == 0){             //Period changed
            let period = this.state['دوره'].options[i-1] || {}
            this.props.periodChanged({ period })
        }
        if (mainOptionsIndex == 1){             //Area changed
            this.getContractDataAndSetIt(value)
            setTimeout(()=> this.setState({
                mainOptionsIndex: 2
            }), 500)
        }
        if (mainOptionsIndex == 2){             //Contract changed
            this.props.contractChanged({ value })
        }
    }

    render() {
        let minorOptions = R.prepend({ id: -1, name: 'همه' }, this.state[mainOptions[this.state.mainOptionsIndex].name].options)
        let minorvalue = this.state[mainOptions[this.state.mainOptionsIndex].name].value
        return (
            <View style={styles.tabBarInfoContainer}>
                <Grid style={styles.tabBarGrid}>
                    <Col style={styles.col}>
                        <View style={styles.tabBarFilter}>
                            <DropDown style={styles.dorpDown} defaultValue={this.state.mainOptionsIndex} options={mainOptions} handleValueChange={this.mainDropDownChanged}/> 
                        </View>
                    </Col>
                    <Col style={styles.col}>
                        <DropDown style={styles.dropDown} defaultValue={minorvalue} options={minorOptions} handleValueChange={this.minorDropDownChanged}/> 
                    </Col>
                </Grid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarInfoContainer: {
        position: 'absolute',
        height: 150,
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
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    tabBarGrid: {
        direction: 'rtl'
    },
    tabBarFilter: {
    },
    col: {
        margin: -70
    },
    dropDown: {
        height: 40
    },
});

