import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import RadioGroup from 'react-native-radio-buttons-group';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Login = () => {
  const data =
    [{ label: 'FPT Polytechnic Hà Nội', value: '1' },
    { label: 'FPT Polytechnic Hồ Chí Minh', value: '2' },
    { label: 'FPT Polytechnic Đà Nẵng', value: '3' },
    { label: 'FPT Polytechnic Cần Thơ', value: '4' },
    { label: 'FPT Polytechnic Tây Nguyên', value: '5' },
    { label: 'FPT Polytechnic Hải Phòng', value: '6' },
    { label: 'FPT Polytechnic HO', value: '7' },
    ]

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const radioButtons = useMemo(() => ([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Giảng viên',
      value: 'option1'
    },
    {
      id: '2',
      label: 'IT',
      value: 'option2'
    }
  ]), []);

  const [selectedId, setSelectedId] = useState();
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.image} resizeMode='cover' source={require('../assets/img/bg.png')}>
        <View style={styles.titleView}>
          <Text style={styles.title1}>FPL </Text>
          <Text style={styles.title2}>ADMIN</Text>
        </View>

        <Image style={{ resizeMode: 'contain', justifyContent: 'center', height: 100, width: 200, alignSelf: 'center', top: -80 }} source={require('../assets/img/logofpt.png')} />

        <TextInput style={styles.input} placeholder='Email'  >

        </TextInput>

        <View
          style={[styles.border, { flexDirection: "row" }]}
        >

          <TextInput
            placeholder="Password"
            secureTextEntry={isSecureEntry}
            style={{ flex: 1, height : 100 }}

          />
          <Ionicons
            style={{}}
            name={isSecureEntry ? "eye" : "eye-off"}
            size={20}
            color="grey"
            onPress={() => setIsSecureEntry(!isSecureEntry)}
          />
        </View>


        <Dropdown
          style={styles.border}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Lựa chọn cơ sở' : 'Lựa chọn cơ sở'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <TouchableOpacity>
          <Text style={{ color: '#000', fontWeight: 'bold', top: -50, left: 70 }}>Quên mật khẩu </Text>
        </TouchableOpacity>

        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          containerStyle={{ flexDirection: 'row', top: -40, justifyContent: "space-evenly" }}
        />

        <TouchableOpacity style={[styles.login, { flexDirection: 'row', backgroundColor: "#fda600" }]} >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: '#000', top: -30, left: 70 }}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity>
            <Text style={{ color: '#000', fontWeight: 'bold', top: -30, left: 80 }}>Đăng ký</Text>
          </TouchableOpacity>
        </View>



        {/* <TouchableOpacity style={[styles.borderGG, { flexDirection: 'row' }]} >
          <Image source={require('../assets/img/gg.png')} style={{ resizeMode: 'contain' }} />
        </TouchableOpacity> */}

      </ImageBackground>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    justifyContent: 'center',
    flexDirection: 'row',
    top: -70
  },
  title1: {
    color: "#FDA600",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  title2: {
    color: "#0E3B65",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,

  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  border: {
    width: 270,
    height: 40,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    top: -50
  },
  input: {
    width: 270,
    height: 40,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    top: -50
  },
  borderGG: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  login: {
    width: 240,
    height: 40,

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    top: -30
  },


  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

})