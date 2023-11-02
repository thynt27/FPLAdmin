import { StyleSheet, Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import { React, useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AxiosIntance from '../../ultil/AxiosIntance';
import moment from 'moment';
import { AppContext } from '../../ultil/AppContext';
const InProgress = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { number, inforuser, setnumber } = useContext(AppContext);

  const getReportList = async () => {
    const response = await AxiosIntance().get("/report/get-by-idstatus?status=" + "653b843c900c3796a66d6641");
    if (response.result) {
      setData(response.report)
    } else {
      ToastAndroid.show("Lấy data thất bại")
    }
  }

  useEffect(() => {

    getReportList();

  }, [number])


  const renderItem = ({ item, index }) => {
    const formattedDate = moment(item?.date).format('DD-MM-YYYY');
    const updateReport = async () => {

      const response = await AxiosIntance().post("/report/edit-new/" + item._id, { receiver: inforuser.name, status_report: "653b8473900c3796a66d6642" });
      if (response.result) {

        ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
        navigation.navigate("ReportList");
        setnumber(Math.random());
      }
      else {
        ToastAndroid.show("Cập nhật không thành công", ToastAndroid.SHORT);
      }
    }
    return (
      <View style={[styles.item, { left: 5, top: 10, height: 110, width: 350, marginRight: 10, backgroundColor: "#fff", borderWidth: 0.5, borderColor: "#000", elevation: 5  }]}>
        <View style={{ top: 15 }}>
          <Text style={{ fontWeight: "700", fontSize: 17, flexWrap: 'wrap', width: 200, color: "#6499E9" }}>{item.incident?.name_incident}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700", fontSize: 15, color: "#6499E9" }}>Phòng: </Text>
            <Text style={{ fontWeight: "700", fontSize: 15, fontWeight: "700" }}> {item?.room}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700", fontSize: 15, color: "#6499E9" }}>Yêu cầu lúc: </Text>
            <Text style={{ fontWeight: "700", fontSize: 15 }}> {formattedDate}</Text>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700", fontSize: 15, color: "#6499E9" }}>Người gửi: </Text>
            <Text style={{ fontWeight: "700", fontSize: 15, fontStyle: "italic" }}> {item.user?.name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700", fontSize: 15, color: "#6499E9" }}>Người nhận: </Text>
            <Text style={{ fontWeight: "700", fontSize: 15, fontStyle: "italic" }}> {item?.receiver}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={updateReport} style={{ justifyContent: "flex-end", alignSelf: "flex-end", top: -50, right: 10, borderWidth: 1, borderColor: "green", height: 30, width: 100, borderRadius: 5 }}>
          <Text style={{ textAlign: "center", padding: 5, color: "green" }}>Hoàn Thành</Text>
        </TouchableOpacity>
      </View>


    )
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View >
  )
}

export default InProgress

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


