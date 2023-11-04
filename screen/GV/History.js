import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../ultil/AppContext';
import AxiosIntance from '../../ultil/AxiosIntance';
import moment from 'moment';

const History = () => {
  const [data, setData] = useState([]);
  const { number, inforuser } = useContext(AppContext);

useEffect(() => {
  const getReportList = async () => {
    // const response = await AxiosIntance().get("/report/get-by-vs2?user" + inforuser._id  &&  "stutus=" + "653b8473900c3796a66d6642");
    const response = await AxiosIntance().get("/report/get-by-iduser?user=" + inforuser._id);
    console.log(response.report);
    if (response.result) {
      setData(response.report);
    } else {
      ToastAndroid.show("Lấy data thất bại")
    }
  }
  getReportList();
  return () => {
    
  }
},[])

const renderItem = ({ item, index }) => {
  const formattedDate = moment(item?.date).format('DD-MM-YYYY');
  const formattedTime= moment(item?.date).format('HH:mm');
  return (
      <TouchableOpacity style={[styles.item, {marginLeft:10,marginBottom:10, height: 150, width:370, backgroundColor: "#eef5ff", borderWidth: 1, borderColor: "#99bcf1", elevation: 5 }]}>
          <View style={[styles.backgroundIcon, { backgroundColor: "#fff", alignSelf: "flex-end", width: 70, height: 70 }]}>
              <Image source={require("../../assets/img/AvatarRP.png")} />
          </View>
          <Text style={{ fontWeight: "700", fontSize: 20, flexWrap: 'wrap', top: -50, width: 200 }}>{item.incident?.name_incident}</Text>
          <View style={{ flexDirection: 'row', top: -30 }}>
              <Text style={{ fontSize: 17 }}>Người tiếp nhận: </Text>
              <Text style={{  fontSize: 17, color: "#6499e9", fontWeight: "700" }}>{item?.receiver}</Text>
          </View>
          <View style={{ flexDirection: 'row', top: -20 }}>
              <Text style={{ fontSize: 17}}>{formattedDate}</Text>
              <Text style={{ fontSize: 17, left: 50 }}>{formattedTime}</Text>
              <Text style={{ fontSize: 17, left: 120 }}>Phòng:{item.room}</Text>
          </View>
      </TouchableOpacity>
  )
};
  return (
    
    <View style={styles.container}>
      <View style={{flexDirection: 'row', top: 20, left: 10}}>
        <Image
          style={{top: 5}}
          source={require('../../assets/img/avatar.png')}
        />
        <View style={styles.nameView}>
          <Text style={styles.name}>Xin chào,</Text>
          <Text style={[styles.name, {fontWeight: '700'}]}>Nguyễn Văn T</Text>
        </View>
      </View>

      <View style={styles.backgroundRadius}>
        <Text style={styles.title}>Lich sử</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        </View>
        <View style={{width: '100%', height: 570, marginTop: 30}}>
          
          <FlatList
            style={styles.flatList}
            data={data}
            vertical
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99bcf1',
  },
  nameView: {
    left: 10,
    top: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
  },
  backgroundRadius: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
    top: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    top: 20,
    color: '#000',
  },
  backgroundOption: {
    borderRadius: 20,
    width: 110,
    height: 135,
    top: 50,
    paddingHorizontal: 5,
  },

  icon: {
    width: 30,
    height: 30,
  },

  backgroundIcon: {
    top: 10,
    width: 45,
    height: 45,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    top: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  item: {
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 15,
    //justifyContent: "center",
  },
  flatList: {
    marginTop: 10,
    marginBottom:10,
  },
});
