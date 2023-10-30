import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from './AppContext';
import Login from '../screen/Login';
import ReportList from '../screen/IT/ReportList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Setting from '../screen/Setting';
import AddReport from '../screen/GV/AddReport';
import HomeIT from '../screen/IT/HomeIT';
import Home from '../screen/GV/Home';
import Process from '../screen/IT/Process';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
          } else if (route.name === 'Report') {
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
      <Tab.Screen name="Report" component={AddReport} options={{ headerShown: false }} />
      <Tab.Screen name="Report List" component={ReportList} options={{ headerShown: false }} />
      <Tab.Screen name="Setting" component={Setting} options={{ headerShown: false }} />

    </Tab.Navigator>
  );

};

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
      <Tab.Screen name="Process" component={Process} options={{ headerShown: false }} />

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