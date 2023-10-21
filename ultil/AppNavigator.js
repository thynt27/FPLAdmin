import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from './AppContext';
import Login from '../screen/Login';
import Home from '../screen/Home';
import Report from '../screen/Report';
import ReportList from '../screen/ReportList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Setting from '../screen/Setting';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Users = () => {
    return(
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login}/> 
    </Stack.Navigator>
    );


};
const Main = () => {
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Home') {
              return <AntDesign name='home' size={size} color={color}   />;
            } else if (route.name === 'Report') {
              return <AntDesign name="setting" size={size} color={color} />;
            } else if (route.name === 'Report List') {
              return <AntDesign name="setting" size={size} color={color} />;
            } else if (route.name === 'Setting') {
              return <AntDesign name="setting" size={size} color={color} />;
            }

          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Report" component={Report} options={{ headerShown: false }} />
        <Tab.Screen name="Report List" component={ReportList} options={{ headerShown: false }} />
        <Tab.Screen name="Setting" component={Setting} options={{ headerShown: false }} />

      </Tab.Navigator>
    );

};
const AppNavigator = () => {
    const {isLogin}=useContext(AppContext);
  return (
    <>
    {
      isLogin==false?<Users/>:<Main/>

    }
    </>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})