import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    Platform,
    View
} from 'react-native';
import { Card, Badge } from 'react-native-elements'

import Loading from '../Loading';

export const TableHeader = () => (
    <Card containerStyle={styles.headerContainerStyle} style={styles.tableHeader}>
        <View style={styles.headerCard}>
            <Text style={styles.headerText}>نوع</Text>
            <Text style={styles.headerText}>شبکه</Text>
            <Text style={styles.headerText}>زهکش</Text>
            <Text style={styles.headerText}>تجهیز</Text>
        </View>
    </Card>
)

const TableRow = ({ item }) => (
    <Card containerStyle={styles.containerStyle}>
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.type}</Text>
            <Text style={styles.cardText}>{strip(item.network)}</Text>
            <Text style={styles.cardText}>{strip(item.drain)}</Text>
            <Text style={styles.cardText}>{strip(item.equip)}</Text>
        </View>
    </Card>
);

const strip = number => parseFloat(number).toPrecision(3);

export default class Table extends Component{

    _renderItems(){
        let { items } = this.props;
        if (items.length != 0){
            return items.map((item, i)=> {
                return (<TableRow key={i} item={item} />);
            });
        } else {
            return <Loading />;
        }
    }

    render(){
        return (
            <View style={styles.table}>
                {this._renderItems()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    table: {
        paddingTop: 0,
    },
    card: {
        flex: .25,
        flexDirection: 'row',
        direction: 'rtl',
        padding: 12,
        marginBottom: 0,
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    headerCard: {
        flex: .25,
        flexDirection: 'row',
        direction: 'rtl',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    headerContainerStyle: {
        backgroundColor: '#f4ee03d6',
    },
    containerStyle: {
        backgroundColor: '#f4ee0310',
    },
    headerText: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardText: {
        textAlign: 'center',
    },
    tableHeader: {
        position: 'absolute',
        height: 70,
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
        /* paddingVertical: 20,*/
    },
});
