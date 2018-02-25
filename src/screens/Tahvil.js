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
import { WebBrowser } from 'expo';
import { Col, Row, Grid } from "react-native-easy-grid";

import { MonoText } from '../components/StyledText';
import { FiltersTabBar } from '../components/FiltersTabBar';
import Loading from '../components/Loading'
import Table from '../components/Table'

import { createDb, insertData } from '../db/db'
import { data, filters } from '../mock/data'

import { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'تحویل',
        headerStyle: {
            backgroundColor: '#03A9F4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props){
        super(props)
        this.state = {
            data: [],
            contract: null,
            period: null
        }
        this.getDataAndSetIt = this.getDataAndSetIt.bind(this)
        this.contractFilterChanged= this.contractFilterChanged.bind(this)
    }

    updateData() {
        let { contract, period } = this.state
        db.transaction(
            tx => {
                tx.executeSql(
                    `select * from items where contract = ?`,
                    [contract],
                    (_, { rows: { _array } }) => this.setState({ data: _array })
                )
            }
        )
    }

    getDataAndSetIt(){
        db.transaction(
            tx => {
                tx.executeSql(
                    `select * from items`,
                    [],
                    (_, { rows: { _array } }) => this.setState({ data: _array })
                )
            }
        )
    }

    contractFilterChanged(value){
        this.setState({
            contract: value
        })
    }

    componentWillMount(){
        createDb()
        insertData(data)
    }

    componentDidMount(){
        this.getDataAndSetIt()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.contract !== this.state.contract) {
            this.updateData()
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.welcomeContainer}>
                    </View>

                    <Table items={this.state.data} />

                </ScrollView>

                <FiltersTabBar contractChanged={this.contractFilterChanged}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
