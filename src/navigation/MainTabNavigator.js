import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, DrawerNavigator, StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import Tahvil from '../screens/Tahvil';
import ArzeshYabi from '../screens/ArzeshYabi';
import Ejraiee from '../screens/Ejraiee';

import SettingsScreen from '../screens/SettingsScreen';

const HomeDrawer = StackNavigator({
    Home: {
        screen: HomeScreen,
    },
    'تحویل پروژه ها': {
        screen: Tahvil,
    },
    'ارزشیابی عملکرد': {
        screen: ArzeshYabi,
    },
    'پیشرفت اجرایی': {
        screen: Ejraiee,
    }
}, {
}, {
    /* headerMode: 'none',*/
});

export default StackNavigator (
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
);

