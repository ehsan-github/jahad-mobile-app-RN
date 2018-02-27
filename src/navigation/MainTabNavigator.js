import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, DrawerNavigator, StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import Tahvil from '../screens/Tahvil';
import Second from '../screens/Second';
import SettingsScreen from '../screens/SettingsScreen';

const HomeDrawer = StackNavigator({
    Home: {
        screen: HomeScreen,
    },
    تحویل: {
        screen: Tahvil,
    },
    Second: {
        screen: Second,
    }
}, {
    /* headerMode: 'none',*/
});

export default TabNavigator(
    {
        Home: {
            screen: HomeDrawer,
            navigationOptions: {
                header: false,
            }
        },
        Settings: {
            screen: SettingsScreen,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Home':
                        iconName =
                            Platform.OS === 'ios'
                            ? `ios-home${focused ? '' : '-outline'}`
                            : `md-home`
                        break;
                    case 'Settings':
                        iconName =
                            Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={28}
                        style={{ marginBottom: -3 }}
                        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                    />
                );
            },
        }),
        headerMode: 'float',
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);

