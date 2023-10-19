import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopTabNavigation from './TopTabNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    </View>
  )
}

function Report() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Report</Text>
    </View>
  )
}

function ReportList() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ReportList</Text>
    </View>
  )
}

function Setting() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Setting</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Home') {
              return <AntDesign name="home" size={size} color={color} />;
            } else if (route.name === 'Report') {
              return <AntDesign name="form" size={size} color={color} />;
            } else if (route.name === 'Report List') {
              return <AntDesign name="file1" size={size} color={color} />;
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
      )
        }

      export default function BottomTabNavigation() {
  return (
        <MyTabs />
      )
}
