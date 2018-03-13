import React from 'react';
import { StyleSheet, Picker, View, TouchableHighlight, Text, Image } from 'react-native';

import R from 'ramda';
import ModalDropdown from 'react-native-modal-dropdown'

export default class DropDown extends React.Component {

    constructor(props){
        super(props)
        this._handleValueChange = this._handleValueChange.bind(this)
        this._renderRow = this._renderRow.bind(this)
    }

    _handleValueChange(index, value){
        index = Number(index)
        this.props.handleValueChange(index)
    }

    componentWillReceiveProps(nextProps){
        let { defaultValue } = nextProps
        if (this.props.defaultValue != defaultValue){
            this.refs[nextProps.myref].select(defaultValue);
        }
    }

    _renderRow(rowData, rowID, highlighted) {
        let icon = highlighted ? require('../assets/images/tick.png') : require('../assets/images/transparent.png');
        let evenRow = rowID % 2;
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={[styles.dropdown_2_row, {backgroundColor: evenRow ? 'lemonchiffon' : 'white'}]}>
                    <Image style={styles.dropdown_2_image}
                           mode='stretch'
                           source={icon}
                    />
                    <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'mediumaquamarine'}]}>
                        {rowData}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        let options = R.map(R.prop('name'), this.props.options)
        let { defaultValue, name } = this.props
        let dorpDownListStyle = this.props.middle ? {marginLeft: '-33%', marginRight: '33%'} : {}
        /* console.warn(options[defaultValue])*/
        return (
        <View style={styles.dropdown}>
            <View style={styles.textView}>
                <Text style={styles.textTitle}>
                    {name}
                </Text>
            </View>
            <ModalDropdown
                ref={this.props.myref}
                onSelect={this._handleValueChange}
                style={styles.dropdown_2}
                defaultIndex={defaultValue}
                defaultValue={options[defaultValue] || 'انتخاب کنید'}
                options={options}
                renderRow={this._renderRow}
                textStyle={styles.dropdown_2_text}
                dropdownStyle={[styles.dropdown_2_dropdown, dorpDownListStyle]}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    dropdown_2: {
        alignSelf: 'flex-end',
        width: '99%',
        marginTop: 32,
        borderWidth: 0,
        borderRadius: 3,
        backgroundColor: 'cornflowerblue',
    },
    dropdown_2_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_2_dropdown: {
        width: '100%',
        height: 250,
        borderColor: 'cornflowerblue',
        borderWidth: 2,
        borderRadius: 3,
    },
    dropdown_2_row: {
        flexDirection: 'row',
        direction: 'rtl',
        height: 40,
        alignItems: 'stretch',
    },
    dropdown_2_image: {
        marginLeft: 4,
        width: 30,
        height: 30,
    },
    dropdown_2_row_text: {
        marginHorizontal: 4,
        fontSize: 16,
        color: 'navy',
        textAlignVertical: 'center',
        textAlign: 'right',
        direction: 'rtl'
    },
    dropdown: {},
    textTitle: {
        fontSize: 16,
        textAlignVertical: 'center',
        top: 10,
        textAlign: 'center'
    }
})
