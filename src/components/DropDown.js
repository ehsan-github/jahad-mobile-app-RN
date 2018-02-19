import React from 'react';
import { StyleSheet, Picker } from 'react-native';

export class DropDown extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            value: null
        }
        this._handleValueChange = this._handleValueChange.bind(this)
    }

    _renderOptions(){
        return this.props.options.map((op, i) => {
            return (
                <Picker.Item key={i} label={op} value={op} />
            )
        })
    }

    _handleValueChange(value, index){
        this.setState({
            value
        })
        this.props.handleValueChange(value, index)
    }

    render() {
        return (
            <Picker
            selectedValue={this.state.value}
            onValueChange={this._handleValueChange}>
            {this._renderOptions()}
            </Picker>
        )
    }
}

const styles = StyleSheet.create({
    style: {
        width: 100,
        height: 50
    },
    textStyle: {},
    dropdownStyle: {}
})
