import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import ImageView from 'react-native-image-view';
import { useNavigation } from '@react-navigation/native'
import BottomTabNavigation from '../Navigators.js/BottomTabNavigation';
import AxiosIntance from "../ultil/AxiosIntance";
import { AppContext } from '../ultil/AppContext';

const Report = () => {
  const {inforuser} = useContext(AppContext);
  const data =
    [{ label: 'Cơ sở vật chất', value: '1' },
    { label: 'Thiết bị mạng', value: '2' },
    { label: 'Vệ sinh phòng học', value: '3' },
    { label: 'Góp ý phòng học ', value: '4' },
    { label: 'Sự cố khác', value: '5' }
    ]

  const navigation = useNavigation();
  const [dataNe, setdataNe] = useState([]);
  const [imageSource, setImageSource] = useState(null);
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("")
    const click =()=>{
      console.log(value);
    }
  useEffect(() => {
    const getIncidentList = async () => {
      const response = await AxiosIntance().get("/incident/get-all");
      console.log(response.incidents);
      if (response.result) {
        setdataNe(response.incidents)
      } else {
        ToastAndroid.show("Lấy data thất bại")
      }
    }
    getIncidentList();
    return () => {
    }
  }, []) 


  const handleImage = () => {
    Alert.alert("Thông báo", "Chọn ảnh", [
      {
        text: "Thư viện",
        onPress: () => pickImageFromLibrary(),
        style: "default"
      },
      {
        text: "Chụp ảnh",
        onPress: () => pickImageFromCamera(),
        style: "default"
      }
    ],
      {
        cancelable: true,
        onDismiss: () => console.log("This alert was dismissed by tapping outside of the alert dialog.")
      }

    );
  }

  const pickImageFromLibrary = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    const result = await launchImageLibrary(options);
    console.log(result.assets[0].uri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    const response = await AxiosIntance("multipart/form-data").post('/report/upload-image', formdata);
    console.log(response.link);
    if (response.result) {
      setImageSource(response.link);
      ToastAndroid.show("Upload ảnh thành công", ToastAndroid.SHORT);
    }
    else {
      ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
    }


  }


  const pickImageFromCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        const options = {
          mediaType: 'photo',
          saveToPhotos: false,
          cameraType: 'back',
          quality: 1,
        }

        const result = await launchCamera(options);
        console.log(result.assets[0].uri);
        const formdata = new FormData();
        formdata.append('image', {
          uri: result.assets[0].uri,
          type: 'icon/icon_jpeg',
          name: 'image.jpg',


        });
        const response = await AxiosIntance("multipart/form-data").post('/report/upload-image', formdata);
        console.log(response.link);
        if (response.result) {
          setImageSource(response.link);
          ToastAndroid.show("Upload ảnh thành công", ToastAndroid.SHORT);
        }
        else {
          ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
        }
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }


  }
  const addReport = async () => {
    const response = await AxiosIntance().post("/report/add-new", { room: room, description: description, image: imageSource, name_incident:value,user: inforuser._id});
    if (response.result) {
      ToastAndroid.show("Đăng tin thành công", ToastAndroid.SHORT);
    }
    else {
      ToastAndroid.show("Đăng tin thất bại! Hãy thử lại?", ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ top: 5, left: 5 }} source={require('../assets/img/back.png')} />
        </TouchableOpacity>

        <Text style={[styles.title]}>Báo cáo sự cố</Text>
      </View>



      <TextInput
        placeholder='Phòng'
        keyboardType="default"
        style={styles.input}
        onChangeText={setRoom}
      />

      <Dropdown
        style={styles.input}
        data={dataNe}
        labelField="name_incident"
        valueField="_id"
        placeholder={!isFocus ? 'Sự cố đang gặp phải ' : 'Sự cố đang gặp phải'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />

      <View style={styles.viewArea}>
        <TextInput
          placeholder='Mô tả sự cố'
          keyboardType="default"
          numberOfLines={10}
          multiline={true}
          underlineColorAndroid="transparent"
          style={styles.textArea}
          onChangeText={setDescription}
        />
      </View>


      <Text style={{ top: 40, left: 50, fontWeight: "700", fontSize: 20 }}>Hình ảnh đính kèm</Text>
      <TouchableOpacity onPress={() => handleImage()} >
        {
          imageSource ?
            (<Image style={{ width: 150, height: 150, left: 50, top: 50 }} source={{ uri: imageSource }} />)
            :
            (<Image style={{ width: 150, height: 150, left: 50, top: 50 }} source={require('../assets/img/imageRP.png')} />)
        }

      </TouchableOpacity>

      <TouchableOpacity style={{ top: 70, left: 50, backgroundColor: '#0e3b65', width: 300, height: 40, borderRadius: 10 }} onPress={click}>
        <Text style={{ textAlign: 'center', color: '#fff', padding: 10 }}>Gửi yêu cầu</Text>
      </TouchableOpacity>


    </View>
  )
}

export default Report

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
    left: 100
  },
  input: {
    height: 40,
    width: 300,
    alignSelf: 'center',
    top: 30,
    margin: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    color: 'grey'
  },
  viewArea: {
    width: 300,
    alignSelf: 'center',
    top: 30,
    margin: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    color: 'grey',
  },
  textArea: {
    top: -60,
    height: 150,

  }


})