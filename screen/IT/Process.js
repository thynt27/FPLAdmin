import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ICON } from '../../constant/Theme'
import TopTabNavigation from '../../Navigators.js/TopTabNavigation'
import { useNavigation } from '@react-navigation/native';


const Process = () => {
  const  navigation = useNavigation();
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeIT')}>
          <Image source={ICON.Back} ></Image>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 83}}>
          <Text style={styles.text22}>Xử lý sự cố</Text>
        </View>
      </View>
      <TopTabNavigation/>
    </View>
  )
}

export default Process

const styles = StyleSheet.create({
  topNav: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    
  },
  text22: {
    fontSize: 22,
    color: 'black',
    fontWeight: '500',
    left : 10
  },
})