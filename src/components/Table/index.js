import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

import Loading from '../Loading';

const TableRow = ({ item }) => (
    <View>
        <Text>Network: {item.network}</Text>
        <Text>Drain: {item.drain}</Text>
        <Text>Equip: {item.equip}</Text>
    </View>
);

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
            <View style={styles.loadingBG}>
                {this._renderItems()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
});
