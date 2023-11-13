import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal, ToastAndroid } from 'react-native'
import { React, useContext, useEffect, useState } from 'react'
import moment from 'moment';
import AxiosIntance from '../../ultil/AxiosIntance';
import { ICON } from '../../constant/Theme'
import { AppContext } from '../../ultil/AppContext';

const DetailReport = (props) => {
    const { navigation } = props;
    const { route } = props;
    const [data, setData] = useState([]);
    const { inforuser, setnumber, number } = useContext(AppContext);
    const { params } = route;
    const [imageSource, setImageSource] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [reason, setReason] = useState('');


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleOutsideClick = () => {
        toggleModal();
    };

    const updateReport = async () => {
        const response = await AxiosIntance().post("/report/edit-new/" + data._id, { reciver: inforuser.name, status_report: "653b843c900c3796a66d6641" });
        if (response.result) {

            ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
            navigation.navigate("ReportList");
            setnumber(Math.random());
        }
        else {
            ToastAndroid.show("Cập nhật không thành công", ToastAndroid.SHORT);
        }
    }
    useEffect(() => {
        const getDetails = async () => {
            const response = await AxiosIntance().get("/report/get-by-id?id=" + params.id);
            console.log(response);
            if (response.result === true) {
                //lấy dữ liệu thành công
                setData(response.report);
                setImageSource(response.image);

            } else {
                ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT);
            }
        };
        getDetails();

    }, [number]);
    const formattedDate = moment(data?.date).format('DD-MM-YYYY');
    return (
        <View style={styles.container}>
            <View>

                <View style={styles.topNav}>
                    <TouchableOpacity onPress={() => navigation.navigate('ReportList')}>
                        <Image source={ICON.Back} ></Image>
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginLeft: 83 }}>
                        <Text style={styles.text22}>Xử lý sự cố</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontWeight: "700", fontSize: 17, color: "#000" }}>ID: </Text>
                    <Text style={{ fontWeight: "700", fontSize: 17, color: "#000" }}>{data?._id}</Text>
                </View>


                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontWeight: "500", fontSize: 16, color: "#000", fontStyle: 'normal' }}>Thời gian: </Text>
                    <Text style={{ fontWeight: "500", fontSize: 16, color: "#000" }}>{formattedDate}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontWeight: "500", fontSize: 16, color: "#000", fontStyle: 'normal' }}>Người gửi: </Text>
                    <Text style={{ fontWeight: "500", fontSize: 16, color: "#000" }}>{data.user?.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontWeight: "500", fontSize: 16, color: "#000", fontStyle: 'normal' }}>Loại Sự cố: </Text>
                    <Text style={{ fontWeight: "700", fontSize: 16, color: "#000" }}>{data.incident?.name_incident}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: "500", fontSize: 16, color: "#000", fontStyle: 'normal' }}>Mô tả: </Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        value={data.description}
                        style={styles.textInput}>

                    </TextInput>
                </View>
                <Text style={{ fontWeight: "500", fontSize: 16, color: "#000", marginBottom: 10 }}>Hình ảnh đính kèm:</Text>
                <TouchableOpacity >
                    {
                        imageSource ?
                            (<Image style={{ width: 150, height: 150 }} source={{ uri: imageSource }} />)
                            :
                            (<Image style={{ width: 150, height: 150 }} source={require('../../assets/img/imageRP.png')} />)
                    }

                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    onRequestClose={handleOutsideClick}
                    visible={isModalVisible}>

                    <View style={styles.modalContainer}>
                        <View style={styles.popup}>
                            <Text style={styles.popupText}>Lý do từ chối</Text>
                            <TextInput
                                style={styles.input}
                                value={reason}
                                onChangeText={text => setReason(text)}
                                placeholder="Viết lý do"
                            />
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Gửi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => toggleModal()} style={{ justifyContent: 'center', alignSelf: "center", borderWidth: 1, borderColor: "#F85838", height: 40, width: 315, borderRadius: 10, margin: 20 }}>
                    <Text style={{ textAlign: "center", padding: 5, color: "#F85838", fontSize: 16, fontWeight: 600 }}>Từ chối yêu cầu</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={updateReport} style={{ justifyContent: 'center', alignSelf: "center", borderWidth: 1, borderColor: "green", height: 40, width: 315, borderRadius: 10, margin: 10 }}>
                    <Text style={{ textAlign: "center", padding: 5, color: "green", fontSize: 16, fontWeight: 600 }}>Tiếp nhận yêu cầu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DetailReport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: 10,
        marginEnd: 10,
        flexDirection: "column",
        padding: 20
    },
    text: {
        fontWeight: "600", fontSize: 17, flexWrap: 'wrap', width: 200, color: "#000", fontStyle: 'normal',
    }
    , textInput: {
        left: -10,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        height: 120,
        width: 300,
        alignSelf: 'flex-start',
        margin: 10,
        color: "#000",
        fontStyle: "italic",
        fontSize: 17,
        backgroundColor: '#fff',
        textAlignVertical: 'top'
    },
    popup: {
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    popupText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#000",
        left: -100
    },

    input: {
        width: 300,
        height: 100,
        padding: 10,
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: "#000",
        borderRadius: 10,
        textAlignVertical: 'top',
    },

    button: {
        width: 300,
        height: 40,
        backgroundColor: '#0e3b65',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600"
    },
    modalContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        height: 250,
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

    topNav: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        left: -10,
        bottom: 10
    },
    text22: {
        fontSize: 22,
        color: 'black',
        fontWeight: '500',
        left: -10
    },

})
