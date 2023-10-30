import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import AxiosIntance from "../../ultil/AxiosIntance";
import moment from 'moment';
import { AppContext } from '../../ultil/AppContext';
import { useNavigation } from '@react-navigation/native';
const NewIncident = () => {
  const {inforuser,number} = useContext(AppContext);
  const [dataNe, setdataNe] = useState([]);
  const [reload, setreload] = useState(0);
  const navigation=useNavigation();
  // const clickItem=()=>{
  //   navigation.navigate("DetailReport",id: item?_id);
  // }
  

    
  useEffect(() => {
    const getReportList = async () => {
      const response = await AxiosIntance().get("/report/get-by-idstatus?status=" + "653b8409900c3796a66d6640");
      console.log(response.report);
      if (response.result) {
        setdataNe(response.report);
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
      <View style={[styles.item, { left : 5 ,top: 10, height: 90, width: 350, marginRight: 10, backgroundColor: "#fff", borderWidth: 0.75, borderColor: "#000", elevation: 5 }]}>
        <View style = {{top : 15}}>
          <Text style={{fontWeight: "700", fontSize: 17, flexWrap: 'wrap', width: 200,color:"#6499E9"}}>{item.incident?.name_incident}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700", fontSize: 15,color:"#6499E9"}}>Phòng: </Text>
            <Text style={{ fontWeight: "700", fontSize: 15, fontWeight: "700" }}> {item?.room}</Text>
          </View>

          <View style={{ flexDirection: 'row'}}>
            <Text style={{  fontWeight: "700",fontSize: 15,color:"#6499E9" }}>Yêu cầu lúc: </Text>
            <Text style={{ fontWeight: "700",fontSize: 15 }}> {formattedDate}</Text>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700",fontSize: 15 ,color:"#6499E9"}}>Người gửi: </Text>
            <Text style={{ fontWeight: "700",fontSize: 15, fontStyle : "italic" }}> {item.user?.name}</Text>
          </View>
        </View>
   
        <TouchableOpacity onPress={()=>{navigation.navigate("DetailReport",{id :item?._id});setreload(+1)}}  style={{justifyContent : "flex-end", alignSelf : "flex-end", top : -40, right : 10, borderWidth : 1, borderColor : "green", height : 30, width : 80, borderRadius : 5}}>
          <Text style={{textAlign : "center", padding : 5, color : "green"}}>Tiếp nhận</Text>
      </TouchableOpacity>
      

      </View>

      
    )
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={dataNe}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View >
  )
}

export default NewIncident

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
