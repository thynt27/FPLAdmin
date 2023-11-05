import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, TextInput, KeyboardAvoidingView,ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import AxiosIntance from '../ultil/AxiosIntance';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Detail3 = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { params } = route;
  
  const [data, setData] = useState([]);
  const [statusID, setstatusID] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [isStatus1, setisStatus1] = useState(false);
  const [isStatus2, setisStatus2] = useState(false);
  const [isStatus3, setisStatus3] = useState(false);
  const [defaultRating, setdefaultRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1,2,3,4,5]);
  const [rating_description, setrating_description] = useState('');
  const CustomRatingStar=()=>{
    return(
      <View style={{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
      }}>
        {
          maxRating.map((item,key)=>{
            return(
              <TouchableOpacity 
              activeOpacity={0.7}
              onPress={()=>{setdefaultRating(item)}}
              key={item}>
                <Image style={styles.img}
                source={item<=defaultRating
                ?require('../assets/img/icon-star.png')
                :require('../assets/img/icon-unstar.png')
                
                }
                >

                </Image>

              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
  
  const toggleVisibility = () => setVisible(!isVisible);
  useEffect(() => {
    const getDetails = async () => {
      const response = await AxiosIntance().get("/report/get-by-id?id=" + params.id);
      console.log(response);
      if (response.result === true) {
        //lấy dữ liệu thành công
        setData(response.report);
        setstatusID(response.report.status_report._id)
      } else {
        ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT);
      }
    };
    getDetails();
    status();
    
    // status();

  }, [statusID]);
  const status = () => {
    if (statusID == '653b8409900c3796a66d6640' ) {
        setisStatus1(true);
        setisStatus2(false)
      setisStatus3(false);
    } else if(statusID == '653b843c900c3796a66d6641'){
      setisStatus1(true)
      setisStatus2(true)
      setisStatus3(false);
    }
    else if(statusID == '653b8473900c3796a66d6642'){
      setisStatus1(true)
      setisStatus2(true)
      setisStatus3(true);
    }
  }
  
  const formattedDate = moment(data?.date).format('DD-MM-YYYY');
  const formattedTime = moment(data?.date).format('HH:mm:ss');
  const updateRating=async()=>{
    const response = await AxiosIntance().post("/report/update-star/" + data._id, { star:defaultRating,rating_description:rating_description });
        if (response.result) {

            ToastAndroid.show("Phản hồi thành công", ToastAndroid.SHORT);
            // setnumber(Math.random());
            toggleVisibility();
        }
        else {
            ToastAndroid.show("Cập nhật không thành công", ToastAndroid.SHORT);
        }
  }
  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <TouchableOpacity>
          <Image
            style={{ top: 5, left: 5 }}
            source={require('../assets/img/back.png')}
          />
        </TouchableOpacity>
        <Text style={[styles.title]}>Yêu cầu hỗ trợ</Text>
      </View>
      <View>
        <View
          style={{
            backgroundColor: '#D2E1F8',
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text style={[styles.status, { marginLeft: 20, marginTop: 10 }]}>
            {data?.incident?.name_incident}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.textAll, { marginLeft: 20, marginTop: 20 }]}>
              Người tiếp nhận:  {data?.receiver}
            </Text>
            <Image
              style={{ left: 100, bottom: 10 }}
              source={require('../assets/img/AvatarRP.png')}
            />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text style={[styles.textAll, { marginLeft: 20 }]}>{formattedDate}</Text>
            <Text style={[styles.textAll, { marginLeft: 20 }]}>{formattedTime}</Text>
            <Text style={[styles.textAll, { marginLeft: 20 }]}>
              {' '}
              SĐT: 0797151033
            </Text>
          </View>
        </View>
        <View style={[styles.view1]}>
          <Text style={[styles.status]}>Trạng thái yêu cầu</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {
            isStatus1 ?
              (<Image style={{ width: 40, height: 40, left: 40 ,marginTop:20}} source={require('../assets/img/icon-done.png')} />)
              :
              (<Image style={{ width: 40, height: 40, left: 40 }} source={require('../assets/img/icon-reload.png')} />)
          }
          <View style={{ marginTop: 25, marginLeft: 60 }}>
            <Text style={[styles.textStatus]}>Yêu cầu</Text>
            <Text style={[styles.textAll]}>09:30 am</Text>
          </View>
        </View>
        <View
          style={{
            width: 2,
            height: 10,
            backgroundColor: '#D9D9D9',
            marginLeft: 65,
            marginTop: 5
          }}></View>

        <View style={{ flexDirection: 'row' }}>
          {
            isStatus2 ?
              (<Image style={{ width: 40, height: 40, left: 40 }} source={require('../assets/img/icon-done.png')} />)
              :
              (<Image style={{ width: 40, height: 40, left: 40 }} source={require('../assets/img/icon-reload.png')} />)
          }
          <View style={{ marginLeft: 60 }}>
            <Text style={[styles.textStatus]}>Đã tiếp nhận</Text>
            <Text style={[styles.textAll]}>_ _/_ _ am</Text>
          </View>
        </View>
        <View
          style={{
            width: 2,
            height: 10,
            backgroundColor: '#D9D9D9',
            marginLeft: 65,
          }}></View>
        <View style={{ flexDirection: 'row' }}>
          {
            isStatus3 ?
              (<Image style={{ width: 40, height: 40, left: 40 ,marginTop:5}} source={require('../assets/img/icon-done.png')} />)
              :
              (<Image style={{ width: 40, height: 40, left: 40 }} source={require('../assets/img/icon-reload.png')} />)
          }
          <View style={{ marginLeft: 60 }}>
            <Text style={[styles.textStatus]}>Đã hoàn thành</Text>
            <Text style={[styles.textAll]}>_ _/_ _ am</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.alertButton}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0e3b65',
              width: 300,
              height: 40,
              marginTop: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#0e3b65',
            }}
            onPress={() => toggleVisibility()}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                padding: 10,
                fontWeight: 'bold',
              }}>
              Phản hồi
            </Text>
          </TouchableOpacity>
        </View>
        <Modal visible={isVisible} animationType="fade" transparent={true}>
          <View style={styles.alert}>
            <Text style={styles.alertTitle}>Đánh giá</Text>
            <View
              >
              <CustomRatingStar></CustomRatingStar>
              {/* <Text>{defaultRating+'/'+maxRating.length}</Text>
              <TouchableOpacity activeOpacity={0.7}
              onPress={()=>alert(defaultRating)}>
                <Text>Get star</Text>
              </TouchableOpacity> */}
            </View>
           
            <View style={styles.viewArea}>
            
            
              <TextInput
              value={rating_description}
              onChangeText={setrating_description}
                placeholder="Viết đánh giá"
                numberOfLines={10}
                
                style={styles.textArea}
              />
             
            </View>
            
            <View style={styles.alertButton}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0e3b65',
                  width: 300,
                  height: 40,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#0e3b65',
                }}
                onPress={updateRating}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Gửi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
};

export default Detail3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    top: 10,
    textAlign: 'center',
    left: 110,
  },
  view1: {
    marginTop: 30,
    marginLeft: 30,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  textStatus: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  textAll: {
    fontWeight: 'bold',
    fontWeight: '400',
    color: '#000',
  },
  alert: {
    height: 320,
    maxWidth: 400,
    margin: 5,
    marginTop: 450,
    elevation: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  alertTitle: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  alertButton: {
    marginLeft: 40,
    maxWidth: 300,
  },
  viewArea: {
    width: 300,
    alignSelf: 'center',
    margin: 12,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    color: 'grey',
  },
  textArea: {
    top: -25,
    height: 60,
  },
  img:{
    width:25,
    height:25,
    resizeMode:'cover',
    padding:2

  }
});
