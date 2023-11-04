import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from "@react-navigation/native";
import BottomTabNavigation from '../Navigators.js/BottomTabNavigation';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { AppContext } from '../ultil/AppContext';
import AxiosIntance from '../ultil/AxiosIntance';
import moment from 'moment';

const HomeIT = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const {number,inforuser}=useContext(AppContext);
  const {setnumber}=useContext(AppContext);
  
  const getReportList = async () => {
    const response = await AxiosIntance().get("/report/get-all");
    console.log(response.report);
    if (response.result) {
      setData(response.report);
    } else {
      ToastAndroid.show("Lấy data thất bại")
    }
  }
  useEffect(() => {
    
    getReportList();
  
  },[number])
    // const data = [
    //     {
    //         index: "1",
    //         incedentCategory: "Sự cố về cơ sở vật chất",
    //         incedentStatus: "Yêu cầu",
    //         incedentTime: "9:20 AM",

    //     },
    //     {
    //         index: "2",
    //         incedentCategory: "Sự cố về thiết bị mạng",
    //         incedentStatus: "Yêu cầu",
    //         incedentTime: "4:30 PM",
    //     },
    //     {
    //         index: "3",
    //         incedentCategory: "Vệ sinh phòng học",
    //         incedentStatus: "Yêu cầu",
    //         incedentTime: "8:00 AM",
    //     }
    // ]
    const renderItem = ({ item, index }) => {
        const formattedDate = moment(item?.date).format('DD-MM-YYYY');
        return (
            <TouchableOpacity style={[styles.item, { left: 10, top : 10, height: 150, width: 300, marginRight : 10, backgroundColor: "#eef5ff" , borderWidth : 1, borderColor : "#99bcf1", elevation : 5 }]}>
                <View style={[styles.backgroundIcon, { backgroundColor: "#fff", alignSelf: "flex-end", width: 70, height: 70 }]}>
                    <Image source={require("../assets/img/AvatarRP.png")} />
                </View>
                <Text style={{ fontWeight: "700", fontSize: 20, flexWrap: 'wrap', top: -50, width: 150 }}>{item.incident?.name_incident}</Text>
                <View style={{ flexDirection: 'row', top: -30 }}>
                    <Text style={{ fontSize: 17 }}>Trạng thái: </Text>
                    <Text style={{ left: 110 , fontSize : 15, color : "#6499e9"  ,fontWeight : "500",width:100}}>{item.status_report?.name_status}</Text>
                </View>
                <View style={{ flexDirection: 'row', top: -20 }}>
                    <Text style={{ fontSize: 17 }}>Yêu cầu lúc: </Text>
                    <Text style={{fontSize : 15  , left: 100 }}>{formattedDate}</Text>
                </View>

            </TouchableOpacity>
        )
    };
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', top: 20, left: 10 }}>
                <Image style={{top : 5,width:50,height:50,borderRadius:20}} source={require("../assets/img/avata2.jpg")} />
                <View style={styles.nameView}>
                    <Text style={styles.name}>Xin chào,</Text>
                    <Text style={[styles.name, { fontWeight: "700" }]}>Nguyễn Hữu Hòa</Text>
                </View>
            </View>

            <View style={styles.backgroundRadius}>
                <Text style={styles.title}>Dịch vụ trực tuyến</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-evenly", }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Report')} >
                        <LinearGradient colors={['#D9D9D9', '#4265a8', '#fff']} start={{ x: 0 ,y: 2 }} end={{ x: 1, y: -.5 }} style={styles.backgroundOption}>
                            <View style={[styles.backgroundIcon, { backgroundColor: "#a6dff1" , padding : 10 }]}>
                                <Image style={styles.icon} source={require("../assets/img/Vector.png")} />
                            </View>
                            <Text style={styles.text}>Báo cáo sự cố </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <LinearGradient colors={['#D9D9D9', '#268740', '#fff']} start={{ x: 0 ,y: 2 }} end={{ x: 1, y: -.5 }} style={styles.backgroundOption}>
                            <View style={[styles.backgroundIcon, { backgroundColor: "#a5ebb8"  , padding : 10 }]}>
                                <Image style={styles.icon} source={require("../assets/img/Vector2.png")} />
                            </View>
                            <Text style={styles.text}>Hỗ trợ CNTT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <LinearGradient colors={['#D9D9D9', '#fd8900', '#fff']} start={{ x: 0 ,y: 2 }} end={{ x: 1, y: -.5 }} style={styles.backgroundOption}>
                            <View style={[styles.backgroundIcon, { backgroundColor: "#ffe97e"  , padding : 10 }]}>
                                <Image style={styles.icon} source={require("../assets/img/Vector3.png")} />
                            </View>
                            <Text style={styles.text}>Phòng và hội trường</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

                <Text style={{ top: 100, left: 20, fontSize: 20, fontWeight: "700", color: "#000" }}>Thông báo</Text>

                <FlatList
                    style={styles.flatList}
                    data={data}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />




            </View>
        <BottomTabNavigation/>
        </View>
    )
}

export default HomeIT

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E3B65'
},
nameView: {
    left: 10,
    top: 10,

},
name: {
    color: "#fff",
    fontSize: 20,
},
backgroundRadius: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "100%",
    top: 50,
    alignSelf: 'center'
},
title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: 'center',
    top: 20,
    color: "#000"
},
backgroundOption: {
    borderRadius: 20,
    width: 110,
    height: 135,
    top: 50,
    paddingHorizontal: 5
},

icon :{
    width : 30,
    height : 30
},

backgroundIcon: {
    top: 10,
    width: 45,
    height: 45,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
},
text: { top: 20, textAlign: "center", color: "white", fontWeight: "600", fontSize: 20 },
item: {
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 20,
    justifyContent: "center",
},
flatList : {
    top : 100,
    marginRight : 10,
    left : 10
}
})