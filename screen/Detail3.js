import {StyleSheet, Text, View, TouchableOpacity, Image,Modal,TextInput} from 'react-native';
import React,  {useState}  from 'react';

const Detail3 = () => {
  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!isVisible);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', paddingBottom: 10}}>
        <TouchableOpacity>
          <Image
            style={{top: 5, left: 5}}
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
          <Text style={[styles.status, {marginLeft: 20, marginTop: 10}]}>
            Sự cố về cơ sở vật chất
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textAll, {marginLeft: 20, marginTop: 20}]}>
              Người tiếp nhận: Nguyễn Trung Hải
            </Text>
            <Image
              style={{left: 30, bottom: 10}}
              source={require('../assets/img/AvatarRP.png')}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text style={[styles.textAll, {marginLeft: 20}]}>28-10-2023</Text>
            <Text style={[styles.textAll, {marginLeft: 20}]}>09:45 am</Text>
            <Text style={[styles.textAll, {marginLeft: 20}]}>
              {' '}
              SĐT: 0797151033
            </Text>
          </View>
        </View>
        <View style={[styles.view1]}>
          <Text style={[styles.status]}>Trạng thái yêu cầu</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 50, height: 50, top: 20, left: 40}}
            source={require('../assets/img/icon-done.png')}
          />
          <View style={{marginTop: 25, marginLeft: 60}}>
            <Text style={[styles.textStatus]}>Yêu cầu</Text>
            <Text style={[styles.textAll]}>09:30 am</Text>
          </View>
        </View>
        <View
          style={{
            width: 2,
            height: 60,
            backgroundColor: '#D9D9D9',
            marginLeft: 65,
            marginTop:5
          }}></View>

        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 50, height: 50, left: 40}}
            source={require('../assets/img/icon-done.png')}
          />
          <View style={{marginLeft: 60}}>
            <Text style={[styles.textStatus]}>Đã tiếp nhận</Text>
            <Text style={[styles.textAll]}>_ _/_ _ am</Text>
          </View>
        </View>
        <View
          style={{
            width: 2,
            height: 60,
            backgroundColor: '#D9D9D9',
            marginLeft: 65,
          }}></View>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 50, height: 50, left: 40}}
            source={require('../assets/img/icon-done.png')}
          />
          <View style={{ marginLeft: 60}}>
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
            marginTop:50,
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
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <TouchableOpacity>
                <Image
                  style={{width: 15, height: 15, right: 40}}
                  source={require('../assets/img/icon-star.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={{width: 15, height: 15, right: 20, }}
                  source={require('../assets/img/icon-star.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={{width: 15, height: 15}}
                  source={require('../assets/img/icon-star.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={{width: 15, height: 15, left: 20}}
                  source={require('../assets/img/icon-unstar.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={{width: 15, height: 15, left: 40}}
                  source={require('../assets/img/icon-unstar.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewArea}>
            <TextInput
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
              onPress={() => toggleVisibility()}>
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
    marginTop: 570,
    elevation: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  alertTitle: {
    margin:10,
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
});
