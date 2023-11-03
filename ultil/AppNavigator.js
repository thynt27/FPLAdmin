import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from './AppContext';
import Login from '../screen/Login';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Setting from '../screen/Setting';
import AddReport from '../screen/AddReport';
import HomeIT from '../screen/HomeIT';
import Student from '../screen/Student';
import Home from '../screen/Home';
import DetailReport from '../screen/DetailReport';
import InProgress from '../screen/InProgress';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NewsDetails=()=>{
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ReportList' component={ReportList}></Stack.Screen>
      <Stack.Screen name='DetailReport' component={DetailReport}></Stack.Screen>
      <Stack.Screen name='InProgress' component={InProgress}></Stack.Screen>
    </Stack.Navigator>
  )
}
const Users = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );


};
const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

          if (route.name === 'Home') {
            return <AntDesign name='home' size={size} color={color} />;
          } else if (route.name === 'AddReport') {
            return <AntDesign name="form" size={size} color={color} />;
          } else if (route.name === 'Report List') {
            return <AntDesign name="phone" size={size} color={color} />;
          } else if (route.name === 'Setting') {
            return <AntDesign name="setting" size={size} color={color} />;
          }

        },
        tabBarActiveTintColor: '#4287f5',
        tabBarInactiveTintColor: 'gray',
      })}
    >

      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="AddReport" component={AddReport} options={{ headerShown: false }} />
      <Tab.Screen name="Setting" component={Setting} options={{ headerShown: false }} />

    </Tab.Navigator>
  );

};

const NewsDetail=()=>{
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ReportList' component={Process}></Stack.Screen>
      <Stack.Screen name='DetailReport' component={DetailReport}></Stack.Screen>
    </Stack.Navigator>
  )
}


const IT = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

          if (route.name === 'HomeIT') {
            return <AntDesign name='home' size={size} color={color} />;
          } else if (route.name === 'Process') {
            return <AntDesign name="switcher" size={size} color={color} />;
          }

        },
        tabBarActiveTintColor: '#4287f5',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeIT" component={HomeIT} options={{ headerShown: false }} />
      <Tab.Screen name="Process" component={NewsDetail} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isLogin, userRole } = useContext(AppContext);
  console.log("USERROLEEEEE:", userRole);
  return (
    <>
      {isLogin == false ? (
        <Users />
      ) : userRole === 1 ? (
        <Main />
      ) : (
        <IT />
      )}

    </>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})