import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import R from 'ramda';

import { MonoText } from '../components/StyledText';
import { FiltersTabBar } from '../components/ArzeshYabiTable/FiltersTabBar';
import Loading from '../components/Loading'
import Table, { TableHeader } from '../components/ArzeshYabiTable'

import { createArzeshYabiDataDb, insertArzeshYabiData } from '../db/db'
/* import { data } from '../mock/data'*/

import { getSpItems } from '../api'

import { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'ارزشیابی عملکرد',
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
            contractOptions: [],
            type: null,
            loading: true
        }
        this.contractFilterChanged= this.contractFilterChanged.bind(this)
        this.typeFilterChanged= this.typeFilterChanged.bind(this)
    }

    updateData() {
        this.setState({ loading: true })
        let { contract, contractOptions, type } } = this.state
        let typeQuery = (type == -1) ? '' : `and type = ${type}`
        let query = (contract == -1)
                  ? `select * from items where contract in (${contractOptions.join(',')}) ${typeQuery};`
                  : `select * from items where contract = ${contract} ${typeQuery};`

        db.transaction(
            tx => {
                tx.executeSql(
                    query,
                    [],
                    (_, { rows: { _array } }) => setTimeout(()=> this.setState({ data: _array, loading: false }), 200)
                )
            }
        )
    }

    contractFilterChanged({ value, options = this.state.contractOptions }){
        this.setState({
            contract: value,
            contractOptions: options
        })
    }

    periodFilterChanged({ period }){
        this.setState({ period })
    }

    componentWillMount(){
        createArzeshYabiDataDb()

        getSpItems('GetEvaluationMobile')
            .then(data => {
               insertArzeshYabiData(data)
            })
            .catch(err => insertArzeshYabiData([]))
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            (prevState.contract !== this.state.contract) ||
            (prevState.contractOptions !== this.state.contractOptions) ||
            (!R.equals(prevState.period, this.state.period))
        ) {
            this.updateData()
        }
    }

    render() {
        let { loading } = this.state
        return (
            <View style={styles.container}>

                <TableHeader />

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    {loading ?
                     (<ActivityIndicator style={styles.activityIndicator} size="large" color="#03A9F4" />) :
                     (<Table items={this.state.data} />)
                    }

                    <View style={styles.blankSpace}></View>
                </ScrollView>

                <FiltersTabBar
                    contractChanged={this.contractFilterChanged}
                    typeChanged={this.typeFilterChanged}
                />

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
        paddingTop: -10,
        paddingBottom: 60,
    },
    blankSpace: {
        alignItems: 'center',
        marginTop: 75,
        /* marginBottom: 20,*/
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
    activityIndicator: {
        marginTop: 150
    }
});
