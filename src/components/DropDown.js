import React from 'react';
import { StyleSheet, Picker } from 'react-native';

export default class DropDown extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            value: props.defaultValue
        }
        this._handleValueChange = this._handleValueChange.bind(this)
    }

    _renderOptions(){
        return this.props.options.map(op => {
            return (
                <Picker.Item key={op.id} label={op.name} value={op.id} />
            )
        })
    }

    _handleValueChange(value, index){
        this.setState({
            value
        })
        this.props.handleValueChange(value, index)
    }

    componentWillReceiveProps(nextProps){
        let { defaultValue } = nextProps
        if (this.props.defaultValue != defaultValue){
            this.setState({
                value: defaultValue
            })
        }
    }

    render() {
        return (
            <Picker
                mode="dropdown"
                style={styles.picker}
                selectedValue={this.state.value}
                onValueChange={this._handleValueChange}>
                {this._renderOptions()}
            </Picker>
        )
    }
}

const styles = StyleSheet.create({
    picker: {
        width: 100,
        direction: 'rtl',
    },
    textStyle: {},
    dropdownStyle: {
    }
})
