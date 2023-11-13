import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from "@react-navigation/native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { AppContext } from '../../ultil/AppContext';
import AxiosIntance from '../../ultil/AxiosIntance';
import moment from 'moment';
import { RefreshControl } from 'react-native';

const Home = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const { number, inforuser } = useContext(AppContext);
    const { setnumber } = useContext(AppContext);

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await getReportList();
        setRefreshing(false);
    }

    const getReportList = async () => {
        const response = await AxiosIntance().get("/report/get-all");
        console.log("Man hinh home cua User", response.report);
        if (response.result) {
            const formattedData = response.report.map(item => ({
                ...item,
                addedDate: moment(item.date).format('YYYY-MM-DD')
            }));
            setData(formattedData);

        } else {
            ToastAndroid.show("Lấy data thất bại")
        }
    }
    useEffect(() => {

        getReportList();

    }, [number]);
    
    const renderItem = ({ item, index }) => {
        const formattedDate = moment(item?.date).format('DD-MM-YYYY');
        let statusColor = '#4287f5';

        if (item.status_report) {
            switch (item.status_report._id) {
                case '653b8409900c3796a66d6640':
                    statusColor = '#4287f5';
                    break;
                case '653b843c900c3796a66d6641':
                    statusColor = 'orange';
                    break;
                case '653b8473900c3796a66d6642':
                    statusColor = 'green';
                    break;
                default:
                    statusColor = '#4287f5';
            }
        }
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Detail3',{id:item?._id})} style={[styles.item, { alignSelf: 'center', marginVertical: 10, height: 100, width: '80%', backgroundColor: "white", borderWidth: 1, borderColor: "#99bcf1", elevation: 5 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '80%' }} >
                        <Text style={{ fontWeight: '600', fontSize: 20, color: '#0E3B65' }}>{item.incident?.name_incident}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '400', fontSize: 16 }}>Trạng thái: </Text>
                            <Text style={{ fontWeight: '600', fontSize: 16, color: statusColor }}>{item.status_report?.name_status}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '400', fontSize: 16 }}>Yêu cầu lúc: </Text>
                            <Text style={{ fontWeight: '400', fontStyle: 'italic', fontSize: 16 }}>{formattedDate}</Text>
                        </View>
                    </View>
                    <Image source={require("../../assets/img/AvatarRP.png")} />
                </View>

            </TouchableOpacity >
        )
    };


    const sortedData = [...data].sort((a, b) => {
        2
        return moment(b.addedDate, 'YYYY-MM-DD').diff(moment(a.addedDate, 'YYYY-MM-DD'));
    });

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', top: 20, left: 10 }}>
                <Image style={{ top: 5 }} source={require("../../assets/img/avatar.png")} />
                <View style={styles.nameView}>
                    <Text style={styles.name}>Xin chào,</Text>
                    <Text style={[styles.name, { fontWeight: "700" }]}>Nguyễn Văn Trỗi</Text>
                </View>
            </View>

            <View style={styles.backgroundRadius}>
                <Text style={styles.title}>Dịch vụ trực tuyến</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-evenly", }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddReport')} >
                        <LinearGradient colors={['#D9D9D9', '#6499e9', '#fff']} start={{ x: 0, y: 2 }} end={{ x: 1, y: -.5 }} style={styles.backgroundOption}>
                            <View style={[styles.backgroundIcon, { backgroundColor: "#a6dff1", padding: 10 }]}>
                                <Image style={styles.icon} source={require("../../assets/img/Vector.png")} />
                            </View>
                            <Text style={styles.text}>Báo cáo sự cố </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <LinearGradient colors={['#D9D9D9', '#268740', '#fff']} start={{ x: 0, y: 2 }} end={{ x: 1, y: -.5 }} style={styles.backgroundOption}>
                            <View style={[styles.backgroundIcon, { backgroundColor: "#a5ebb8", padding: 10 }]}>
                                <Image style={styles.icon} source={require("../../assets/img/Vector2.png")} />
                            </View>
                            <Text style={styles.text}>Hỗ trợ CNTT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <LinearGradient colors={['#D9D9D9', '#fd8900', '#fff']} start={{ x: 0, y: 2 }} end={{ x: 1, y: -.5 }} style={styles.backgroundOption}>
                            <View style={[styles.backgroundIcon, { backgroundColor: "#ffe97e", padding: 10 }]}>
                                <Image style={styles.icon} source={require("../../assets/img/Vector3.png")} />
                            </View>
                            <Text style={styles.text}>Phòng và hội trường</Text>
                        </LinearGradient>
                    </TouchableOpacity>


                </View>
                <View style={{ width: '100%', height: 360, marginTop: 70 }}>
                    <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: "700", color: "#000" }}>Thông báo</Text>
                    <FlatList
                        style={styles.flatList}
                        data={sortedData}
                        vertical
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />
                        }

                    />
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#99bcf1'
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

    icon: {
        width: 30,
        height: 30
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
        borderRadius: 15,
        //justifyContent: "center",
    },
    flatList: {
        marginTop: 10
    }
})
