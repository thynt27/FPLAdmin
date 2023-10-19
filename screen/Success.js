import { StyleSheet, Text, View, FlatList, TouchableOpacity  } from 'react-native'
import React from 'react'

const Success = () => {
  const data = [
    {
      index: "1",
      incedentCategory: "Cơ sở vật chất",
      room: "T1101",
      reportTime: "9:20 AM",
      userReport: "thuyttt"

    },

    {
      index: "2",
      incedentCategory: "Thiết bị mạng",
      room: "T1005",
      reportTime: "4:30 PM",
      userReport: "hoanh"
    },

    {
      index: "3",
      incedentCategory: "Vệ sinh phòng học",
      room: "F305",
      reportTime: "8:00 AM",
      userReport: "vietdv"
    },

    {
      index: "4",
      incedentCategory: "Vệ sinh phòng học",
      room: "F305",
      reportTime: "8:00 AM",
      userReport: "vietdv"
    },

    {
      index: "5",
      incedentCategory: "Vệ sinh phòng học",
      room: "F305",
      reportTime: "8:00 AM",
      userReport: "vietdv"
    },
    {
      index: "6",
      incedentCategory: "Vệ sinh phòng học",
      room: "F305",
      reportTime: "8:00 AM",
      userReport: "vietdv"
    },

    

   
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.item, { left : 5 ,top: 10, height: 90, width: 350, marginRight: 10, backgroundColor: "#fff", borderWidth: 0.5, borderColor: "#000", elevation: 5 }]}>
        <View >
          <Text style={{ fontWeight: "700", fontSize: 17, flexWrap: 'wrap', width: 200}}>{item.incedentCategory}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700", fontSize: 15}}>Phòng: </Text>
            <Text style={{ fontWeight: "700", fontSize: 15, fontWeight: "700" }}>{item.room}</Text>
          </View>

          <View style={{ flexDirection: 'row'}}>
            <Text style={{  fontWeight: "700",fontSize: 15 }}>Yêu cầu lúc: </Text>
            <Text style={{ fontWeight: "700",fontSize: 15 }}>{item.reportTime}</Text>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700",fontSize: 15 }}>Người gửi: </Text>
            <Text style={{ fontWeight: "700",fontSize: 15, fontStyle : "italic" }}>{item.userReport}</Text>
          </View>
        </View>

      </View>

      
    )
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `key-${item.index}`}
      />
    </View >
  )
}

export default Success

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    left: 10,
    padding: 10,
    height: "100%",
  },
  item: {
    borderWidth: 0.5,
    padding: 8,
    marginVertical: 10,
    justifyContent: "center",
  },
})