import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, PermissionsAndroid, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import { ICON } from '../../constant/Theme'
import { Dropdown } from 'react-native-element-dropdown';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AxiosIntance from '../../ultil/AxiosIntance';


const AddReport = () => {
    const navigation = useNavigation();
    const [value, setValue] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [image, setImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    //modal camera
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    //modal notice
    const toggleSuccessModal = () => {
        setSuccessModalVisible(!isSuccessModalVisible);
    };

    //api
    useEffect(() => {
        const getIncidentList = async () => {
            const response = await AxiosIntance().get("/incident/get-all");
            console.log(response.incidents);
            setIncidents(response.incidents);
        }
        getIncidentList();
        return () => {
        }
    }, []);

    // Chụp ảnh
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                const result = await launchCamera();
                console.log(result.assets[0].uri);
                setImage(result.assets[0].uri);
                toggleModal();

            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // Chọn ảnh từ thư viện
    const chooseImage = () => {
        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Hủy chọn ảnh');
            } else if (response.error) {
                console.log('Lỗi:', response.error);
            } else {
                console.log(response.assets[0].uri);
                setImage(response.assets[0].uri);
                toggleModal();
            }
        });
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.topNav}>
                <TouchableOpacity>
                    <Image source={ICON.Back} style={{}}></Image>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.text22}>Báo cáo sự cố</Text>
                </View>
            </View>
            <View style={{ paddingLeft: 22 }}>
                <TextInput style={styles.input}
                    placeholder='Phòng'
                >
                </TextInput>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={incidents.map(incident => ({ label: incident.name_incident, value: incident._id }))}
                    value={value}
                    search
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Loại sự cố' : '...'}
                    searchPlaceholder="Search..."
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}>
                </Dropdown>
                <TextInput style={[styles.input,{height: 130, textAlignVertical: 'top'}]}
                    placeholder='Mô tả'
                >
                </TextInput>
                <Text style={[styles.text18,{ marginTop: 20}]}>Hình ảnh đính kèm</Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                    <View style={{ width: 100, height: 100, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        {image ? (
                            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                        ) : (
                            <Image source={ICON.Camera} />
                        )}

                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ width: '90%', height: 45, backgroundColor: '#4287f5', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}
                    onPress={() => toggleSuccessModal()}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>Gửi yêu cầu</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}>
                <TouchableOpacity
                    style={styles.modalBackdrop}
                    onPress={toggleModal}
                />
                <View style={styles.modalContainer}>
                    {/* Add your camera and gallery buttons here */}
                    <TouchableOpacity
                        style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.6, width: '100%' }}
                        onPress={() => requestCameraPermission()}>
                        <Text style={[styles.text20,{ color: '#4287f5' }]}>Chụp ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => chooseImage()}>
                        <Text style={styles.text20}>Chọn ảnh từ thư viện </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isSuccessModalVisible}>
                <View style={styles.modalCenteredContainer}>
                    <View style={styles.modalSuccessBox}>
                        <Image style={{ width: 60, height: 60 }} source={ICON.Done}></Image>
                        <View >
                            <Text style={{ textAlign: 'center', fontSize: 24, marginTop: 5, fontWeight: '500', color: '#0E3B65' }}>Thông báo</Text>
                            <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 5 }}>Đã gửi yêu cầu của bạn</Text>
                        </View>
                        <TouchableOpacity style={{ width: '90%', height: 40, backgroundColor: '#4287f5', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                            onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.text16}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AddReport

const styles = StyleSheet.create({
    text16:{
        fontSize: 16,
        color: 'white', 
        fontWeight: '500'
    },
    text18:{
        fontSize: 22,
        color: 'black',
        fontWeight: '500' 
    },
    text20:{
        marginTop: 15, 
        fontSize: 20, 
        color: '#21833C', 
        fontWeight: '500' 
    },
    text22:{
        fontSize: 22,
        color: 'black',
        fontWeight: '500' 
    },
    topNav:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    input:{
        width: '95%',
        height: 45, borderWidth: 0.5,
        borderRadius: 8,
        borderColor: '#8C8C8C',
        marginTop: 20,
        fontSize: 16, color: 'black',
        paddingHorizontal: 10
    },
    dropdown: {
        width: '95%',
        height: 45,
        marginTop: 20,
        borderColor: '#8C8C8C',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,

    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        height: 130,
        bottom: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalCenteredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalSuccessBox: {
        backgroundColor: 'white',
        width: '80%',
        padding: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
})