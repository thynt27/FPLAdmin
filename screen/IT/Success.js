import { StyleSheet, Text, View, FlatList, TouchableOpacity ,ToastAndroid } from 'react-native'
import {React,useContext,useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import AxiosIntance from '../../ultil/AxiosIntance';
import moment from 'moment';
import { AppContext } from '../../ultil/AppContext';

const Success = () => {
  
    

   
  // ];
  const navigation=useNavigation();
  const [data, setData] = useState([]);
  const {number}=useContext(AppContext);
  const {setnumber}=useContext(AppContext);
  useEffect(() => {
    const getReportList = async () => {
      const response = await AxiosIntance().get("/report/get-by-idstatus?status=" + "653b8473900c3796a66d6642");
      console.log(response.report);
      if (response.result) {
        setData(response.report)
      } else {
        ToastAndroid.show("Lấy data thất bại")
      }
    }
    getReportList();
    return () => {
     
    }
  },[number])
  const renderItem = ({ item, index }) => {
    const formattedDate = moment(item?.date).format('DD-MM-YYYY');
    return (
      <View style={[styles.item, { left : 5 ,top: 10, height: 110, width: 350, marginRight: 10, backgroundColor: "#fff", borderWidth: 0.5, borderColor: "#000", elevation: 5 }]}>
        <View >
          <Text style={{ fontWeight: "700", fontSize: 17, flexWrap: 'wrap', width: 200,color:"#6499E9"}}>{item.incident?.name_incident}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700", fontSize: 15,color:"#6499E9"}}>Phòng: </Text>
            <Text style={{ fontWeight: "700", fontSize: 15, fontWeight: "700"}}> {item?.room}</Text>
          </View>

          <View style={{ flexDirection: 'row'}}>
            <Text style={{  fontWeight: "700",fontSize: 15,color:"#6499E9" }}>Yêu cầu lúc: </Text>
            <Text style={{ fontWeight: "700",fontSize: 15 }}> {formattedDate}</Text>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700",fontSize: 15 ,color:"#6499E9"}}>Người gửi: </Text>
            <Text style={{ fontWeight: "700",fontSize: 15, fontStyle : "italic" }}> {item.user?.name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700",fontSize: 15,color:"#6499E9" }}>Người nhận: </Text>
            <Text style={{ fontWeight: "700",fontSize: 15, fontStyle : "italic" }}> {item.receiver}</Text>
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
        keyExtractor={item => item._id}
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
