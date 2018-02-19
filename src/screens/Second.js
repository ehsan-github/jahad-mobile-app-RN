import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    }
]

export default class Second extends React.Component {

    static navigationOptions = {
        /* header: null*/
        title: 'Second',
        headerStyle: {
            backgroundColor: '#03A9F4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    
    render() {
        return (
            <ScrollView style={styles.container}>
            <Card title="CARD WITH DIVIDER1">
            {
                users.map((u, i) => {
                    return (
                        <View key={i} style={styles.user}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: u.avatar }}
                            />
                            <Text style={styles.name}>{u.name}</Text>
                        </View>
                    );
                })
            }
            </Card>
            <Card containerStyle={{padding: 0}} >
                {
                    users.map((u, i) => {
                        return (
                            <ListItem
                                key={i}
                                roundAvatar
                                title={u.name}
                                avatar={{uri:u.avatar}}
                            />
                        );
                    })
                }
            </Card>
            <Card
                title='HELLO WORLD'
                image={require('../assets/images/icon.png')}>
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VIEW NOW' />
            </Card>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    user: {},
    image: {},
    name: {}
});

