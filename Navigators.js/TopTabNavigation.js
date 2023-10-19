import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import NewIncident from '../screen/NewIncident';
import InProgress from '../screen/InProgress';
import Success from '../screen/Success';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            initialRouteName="NewIncident" 
        >
            <Tab.Screen name='NewIncident' component={NewIncident} options={{ tabBarLabel: 'Sự cố mới' }} />
            <Tab.Screen name='InProgress' component={InProgress} options={{ tabBarLabel: 'Đang xử lý' }} />
            <Tab.Screen name='Success' component={Success} options={{ tabBarLabel: 'Hoàn thành' }} />
        </Tab.Navigator>
    );
}


export default function TopTabNavigation() {
    return (
       
            <MyTabs/>
      
    )
}