import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import ImageView from 'react-native-image-view';
import { useNavigation } from '@react-navigation/native'
import BottomTabNavigation from '../Navigators.js/BottomTabNavigation';

const Report = () => {
  const data =
    [{ label: 'Cơ sở vật chất', value: '1' },
    { label: 'Thiết bị mạng', value: '2' },
    { label: 'Vệ sinh phòng học', value: '3' },
    { label: 'Góp ý phòng học ', value: '4' },
    { label: 'Sự cố khác', value: '5' }
    ]

  const navigation = useNavigation();

  const [imageSource, setImageSource] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);




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


    if (result?.assets) {
      console.log(result.assets);
      setImageSource(result.assets[0].uri);
      return

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
        console.log(result);
        if (result?.assets) {

          setImageSource(result.assets[0].uri);
          return

        }
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
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
      />

      <Dropdown
        style={styles.input}
        data={data}
        labelField="label"
        valueField="value"
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
        />
      </View>


      <Text style={{ top: 40, left: 50, fontWeight: "700", fontSize: 20 }}>Hình ảnh đính kèm</Text>
      <TouchableOpacity onPress={() => handleImage()} >
        <Image style={{ width: 150, height: 150, left: 50, top: 50 }} source={require('../assets/img/imageRP.png')} />
        {/* {imageSource && <Image source={{ uri: imageSource}} style={{ width: 150, height: 150, left: 50, top: 50 }} /> } */}

      </TouchableOpacity>

      <TouchableOpacity style={{ top: 70, left: 50, backgroundColor: '#0e3b65', width: 300, height: 40, borderRadius: 10 }}>
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