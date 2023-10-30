import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import TopTabNavigation from '../../Navigators.js/TopTabNavigation'
import BottomTabNavigation from '../../Navigators.js/BottomTabNavigation'

const ReportList = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <View style={{ flexDirection: 'row', paddingBottom : 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Report")}>
          {/* <Image style={{ top: 5, left: 5 }} source={require('../assets/img/back.png')} /> */}
        </TouchableOpacity>

        <Text style={[styles.title]}>Xử lý sự cố</Text>
      </View>
      <TopTabNavigation />
    </View>
  )
}

export default ReportList

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    top: 10,
    textAlign: 'center',
    left: 110
  },
})