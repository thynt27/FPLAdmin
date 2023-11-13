import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image ,ToastAndroid} from 'react-native'
import {React,useContext,useEffect,useState} from 'react'
import AxiosIntance from '../ultil/AxiosIntance';
import moment from 'moment';
import { AppContext } from '../ultil/AppContext';
import RNRestart from 'react-native-restart';

const DetailReport = (props) => {
    const { navigation } = props;
  const { route } = props;
  const [data, setData] = useState([]);
  const {inforuser,setnumber,number} = useContext(AppContext);
  const { params } = route;
  
    const [imageSource, setImageSource] = useState(null);
    const updateReport=async()=>
    {
      const response=await AxiosIntance().post("/report/edit-new/"+data._id,{reciver:inforuser.name,status_report:"653b843c900c3796a66d6641"});
      if (response.result) {
      
        ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
        navigation.navigate("ReportList");
        setnumber(Math.random());
      }
      else {
        ToastAndroid.show("Cập nhật không thành công", ToastAndroid.SHORT);
      }
    }
    useEffect(()=>{
        const getDeatils=async()=>{
            const response=await AxiosIntance().get("/report/get-by-id?id="+params.id);
            console.log(response);
            if (response.result === true) {
                //lấy dữ liệu thành công
                setData(response.report);
                setImageSource(response.report.image);

              } else {
                ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT);
              }
        };
        getDeatils();

    },[number]);
    const formattedDate = moment(data?.date).format('DD-MM-YYYY');
  return (
    <View style={styles.container}>
     <View>
     <View style={{ flexDirection: 'row' ,marginBottom:10}}>
            <Text style={{ fontWeight: "700", fontSize: 17,color:"#000"}}>ID: </Text>
            <Text style={{ fontWeight: "700", fontSize: 17,color:"#000"}}>{data?._id}</Text>
          </View>
        
        
          <View style={{ flexDirection: 'row' ,marginBottom:10}}>
            <Text style={{ fontWeight: "500", fontSize: 16,color:"#000",fontStyle:'normal'}}>Thời gian: </Text>
            <Text style={{ fontWeight: "500", fontSize: 16,color:"#000"}}>{formattedDate}</Text>
          </View>
          <View style={{ flexDirection: 'row',marginBottom:10 }}>
            <Text style={{ fontWeight: "500", fontSize: 16,color:"#000",fontStyle:'normal'}}>Người gửi: </Text>
            <Text style={{ fontWeight: "500", fontSize: 16,color:"#000"}}>{data.user?.name}</Text>
          </View>
          <View style={{ flexDirection: 'row',marginBottom:10 }}>
            <Text style={{ fontWeight: "500", fontSize: 16,color:"#000",fontStyle:'normal'}}>Loại Sự cố: </Text>
            <Text style={{ fontWeight: "700", fontSize: 16,color:"#000"}}>{data.incident?.name_incident}</Text>
          </View>
          <View>
          <Text style={{ fontWeight: "500", fontSize: 16,color:"#000",fontStyle:'normal'}}>Mô tả: </Text>
          <TextInput 
          editable
          multiline
          numberOfLines={4}
          value={data.description}
         style={styles.textInput}>
            
          </TextInput>
          </View>
          <Text style={{ fontWeight: "500", fontSize:16,color:"#000" ,marginBottom:10}}>Hình ảnh đính kèm:</Text>
          <TouchableOpacity >
        {
          imageSource ?
            (<Image style={{ width: 150, height: 150}} source={{ uri: imageSource }} />)
            :
            (<Image style={{ width: 150, height: 150 }} source={require('../assets/img/imageRP.png')} />)
        }

      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{justifyContent: 'center',alignSelf:"center",borderWidth : 1, borderColor : "#F85838", height : 40, width : 315, borderRadius : 10,margin:20}}>
          <Text style={{textAlign : "center", padding : 5, color : "#F85838",fontSize:16,fontWeight:600}}>Từ chối yêu cầu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={updateReport} style={{justifyContent: 'center',alignSelf:"center",borderWidth : 1, borderColor : "green", height : 40, width : 315, borderRadius : 10,margin:10}}>
          <Text style={{textAlign : "center", padding : 5, color : "green",fontSize:16,fontWeight:600}}>Tiếp nhận yêu cầu</Text>
      </TouchableOpacity>
     </View>
    </View>
  )
}

export default DetailReport

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginStart:10,
        marginEnd:10,
        flexDirection:"column",
        padding:20
    },
    text:{
        fontWeight: "600", fontSize: 17, flexWrap: 'wrap', width: 200,color:"#000",fontStyle:'normal',
    }
    ,textInput:{
       
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    height:120,
    width:300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    color:"#000",
    fontStyle:"italic",
    fontSize:17,
    backgroundColor: '#fff',
    
    }
})