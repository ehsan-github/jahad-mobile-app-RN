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

import { DropDown } from './DropDown';

import R from 'ramda';

const filters = [
    {
        name: 'دوره',
        options: ['1', '2', '3']
    },
    {
        name: 'حوزه',
        options: ['4', '5', '6', '7']
    },
    {
        name: 'پیمان',
        options: ['8', '9', '10', '11', '12', '13']
    }
];

export class FiltersTabBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            minorOptions: [],
            selectedFilters: R.map(R.evolve({ options: R.head }), filters)
        }
        this.mainDropDownChanged = this.mainDropDownChanged.bind(this)
    }

    mainDropDownChanged(value, i){
        this.setState({
            minorOptions: R.prop('options', filters[i])
        })
    }

    minorDropDownChanged(value, i){
    }

    render() {
        let mainOptions = R.map(R.prop('name'), filters);
        console.warn(this.state.selectedFilters)
        return (
            <View style={styles.tabBarInfoContainer}>
                <Grid style={styles.tabBarGrid}>
                    <Col>
                        <View style={styles.tabBarFilter}>
                            <Text style={styles.tabBarInfoText}>
                                فیلتر بر اساس:
                            </Text>
                            <DropDown options={mainOptions} handleValueChange={this.mainDropDownChanged}/> 
                        </View>
                    </Col>
                    <Col>
                <DropDown options={this.state.minorOptions} handleValueChange={this.minorDropDownChanged}/> 
                    </Col>
                </Grid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarInfoContainer: {
        position: 'absolute',
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
    tabBarFilter: {}
});

