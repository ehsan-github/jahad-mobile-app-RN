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

import { FiltersTabBar } from '../components/Ejraiee/FiltersTabBar';
import Table, { TableHeader } from '../components/Ejraiee'

import Loading from '../components/Loading'

import { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');

const sumByParams = vals => R.reduce(
    (current, val) => R.evolve({
        network: R.add(val.network),
        drain: R.add(val.drain),
        equip: R.add(val.equip)
    }, current),
  R.head(vals),
  R.tail(vals)
)

const subtractByParams = (total, done) =>
    R.evolve({
        network: R.subtract(total.network),
        drain: R.subtract(total.drain),
        equip: R.subtract(total.equip)
    }, done)

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'پیشرفت اجرایی',
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
            sathData: [],
            operationData: [],
            contract: null,
            contractOptions: [],
            loading: true
        }
        this.contractFilterChanged = this.contractFilterChanged.bind(this)
        this.updateOperationData = this.updateOperationData.bind(this)
    }

    updateData() {
        this.setState({ loading: true })
        let { contract, contractOptions } = this.state
        let query = (contract == -1)
                  ? `select * from items where contract in (${contractOptions.join(',')});`
                  : `select * from items where contract = ${contract};`

        db.transaction(
            tx => {
                tx.executeSql(
                    query,
                    [],
                    (_, { rows: { _array } }) => {
                        let sathData = R.pipe(
                            R.filter(R.propEq('type', 'سطح کل')),
                            sumByParams,
                        )(_array)
                        this.updateOperationData(sathData)
                    }
                )
            }
        )
    }

    updateOperationData(sathData){
        let { contract, contractOptions } = this.state
        let query = (contract == -1)
                  ? `select * from ejra where contract in (${contractOptions.join(',')});`
                  : `select * from ejra where contract = ${contract};`

        db.transaction(
            tx => {
                tx.executeSql(
                    query,
                    [],
                    (_, { rows: { _array } }) => {
                        let data = R.pipe(
                            R.groupBy(R.prop('period')),
                            R.map(sumByParams),
                            R.values,
                        )(_array)

                        let last = data[0]
                        let semiLast = data[1]
                        let done = sumByParams(data)
                        let remaining = subtractByParams(sathData, done)

                        let operationData = [
                            { type: 'دوره آخر', ...last },
                            { type: 'ماقبل آخر', ...semiLast },
                            { type: 'انجام شده تاکنون', ...done },
                            { ...remaining, type: 'باقی مانده' }
                        ]
                        this.setState({
                            sathData,
                            operationData,
                            loading: false
                        })
                    }
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

    componentDidUpdate(prevProps, prevState) {
        if (
            (prevState.contract !== this.state.contract) ||
            (prevState.contractOptions !== this.state.contractOptions)
        ) {
            this.updateData()
        }
    }

    render() {
        let { loading, sathData, operationData } = this.state

        return (
            <View style={styles.container}>

                <TableHeader />

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    {loading ?
                     (<ActivityIndicator style={styles.activityIndicator} size="large" color="#03A9F4" />) :
                     (<Table items={[sathData, ...operationData]} />)
                    }

                    <View style={styles.blankSpace}></View>
                </ScrollView>

                <FiltersTabBar
                    contractChanged={this.contractFilterChanged}
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
