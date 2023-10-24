import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Login from './screen/Login';
import Report from './screen/Report';
import ReportList from './screen/ReportList';
import Home from './screen/Home';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Setting from './screen/Setting';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import TopTabNavigation from './Navigators.js/TopTabNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigation from './Navigators.js/BottomTabNavigation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Report" component={Report} options={{ headerShown: false }} />
        <Stack.Screen name="Report List" component={ReportList} options={{ headerShown: false }} />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
      </Stack.Navigator>
      {/* <Tab.Navigator
        
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Home') {
              return <Ionicons name="home" size={size} color={color} />;
            } else if (route.name === 'Report') {
              return <Ionicons name="reload" size={size} color={color} />;
            } else if (route.name === 'Report List') {
              return <Ionicons name="call-outline" size={size} color={color} />;
            } else if (route.name === 'Setting') {
              return <AntDesign name="setting" size={size} color={color} />;
            }

          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          title : '',
          tabBarStyle : {padding : 10}
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Report" component={Report} options={{ headerShown: false }} />
        <Tab.Screen name="Report List" component={ReportList} options={{ headerShown: false }} />
        <Tab.Screen name="Setting" component={Setting} options={{ headerShown: false }} />

      </Tab.Navigator> */}




    </NavigationContainer>
 
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
