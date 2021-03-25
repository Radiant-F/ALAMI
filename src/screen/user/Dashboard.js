import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      // token: this.getToken(),
      data: [],
      komentar: [],
      isi_komentar: '',
      modal: false,
      report: true,
      saved: false,
    };
  }

  getToken() {
    AsyncStorage.getItem('token')
      .then((value) => this.setState({token: value}))
      .catch((err) => console.log(err));
  }

  getNews() {
    console.log('memuat berita..');
    fetch(``, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        if (responseJSON.status == 'Success') {
          console.log('berita dimuat');
        } else {
          console.log('berita gagal dimuat');
        }
      })
      .catch((err) => this.fatal(err));
  }

  getComments() {
    console.log('memuat komentar..');
    fetch(``, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        if (responseJSON.status == 'Success') {
          console.log('komentar dimuat');
        } else {
          console.log('komentar gagal dimuat');
        }
      })
      .catch((err) => this.fatal(err));
  }

  addComment() {
    if (this.state.isi_komentar != '') {
      console.log('mengirim komentar..');
      const {isi_komentar} = this.state;
      var kirimData = {komentar: isi_komentar};
      fetch(``, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kirimData),
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          if (responseJSON.status == 'Success') {
            console.log('komentar dikirim');
            this.getComments();
          } else {
            console.log('komentar gagal dikirim');
          }
        })
        .catch((err) => this.fatal(err));
    } else {
      ToastAndroid.show('Isi tanggapan', ToastAndroid.SHORT);
    }
  }

  fatal(err) {
    console.log(err);
    Alert.alert(
      'Terjadi Kesalahan',
      'Koneksi tidak stabil. Harap periksa koneksi Anda.',
      [{text: 'Ulangi', onPress: () => this.getNews()}, {text: 'Ok'}],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={header.header}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require('../../assets/menu-button.png')}
              style={header.imgHeader}
            />
          </TouchableWithoutFeedback>
          <Text style={header.textHeader}>Beranda</Text>
        </View>
        <ScrollView>
          <View style={{padding: 10}}>
            <View style={styles.viewContainer}>
              <View style={styles.viewPostHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/derp.jpg')}
                    style={{...styles.imgPP, marginRight: 10}}
                  />
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>
                      Eka Gustiwana
                    </Text>
                    <Text style={{color: 'grey'}}>2021-03-04 14:00 WIB</Text>
                  </View>
                </View>
                <View style={styles.viewCategory}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Kategori
                  </Text>
                </View>
              </View>
              <Text style={{marginVertical: 10}}>
                Jalan berlubang membahayakan
                pengemudiaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ddddddddddddddd
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{height: 150, width: '49%'}}>
                  <Text style={{color: 'grey'}}>Sebelum</Text>
                  <Image
                    source={require('../../assets/noimage.jpg')}
                    style={styles.imgPost}
                  />
                </View>
                <View style={{height: 150, width: '49%'}}>
                  <Text style={{color: 'grey'}}>Sesudah</Text>
                  <Image
                    source={require('../../assets/noimage.jpg')}
                    style={styles.imgPost}
                  />
                </View>
              </View>
              <View style={styles.viewComment}>
                <TouchableNativeFeedback
                  onPress={() => this.setState({modal: true})}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Image
                      source={require('../../assets/chat-bubble.png')}
                      style={styles.imgIcon}
                    />
                    <Text>Komentar</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableOpacity
                  onPress={() => this.setState({saved: !this.state.saved})}>
                  {this.state.saved ? (
                    <Image
                      source={require('../../assets/bookmark-ribbon.png')}
                      style={styles.imgIcon}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/bookmark-outline.png')}
                      style={styles.imgIcon}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.viewCommentField}>
                <TextInput
                  onEndEditing={() => this.setState({report: true})}
                  onFocus={() => this.setState({report: false})}
                  underlineColorAndroid="orange"
                  style={{flex: 1, marginRight: 20}}
                  placeholder="Berikan Tanggapan.."
                  onChangeText={(input) => this.setState({isi_komentar: input})}
                />
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/send-button.png')}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Modal
            visible={this.state.modal}
            onRequestClose={() => this.setState({modal: false})}
            animationType="slide"
            transparent>
            <TouchableWithoutFeedback
              onPress={() => this.setState({modal: false})}>
              <View style={modal.mainView}>
                <View style={modal.viewContainer}>
                  <View style={styles.viewCommentUser}>
                    <Image
                      source={require('../../assets/plainAvatar.png')}
                      style={styles.imgComment}
                    />
                    <View style={{flex: 1}}>
                      <Text style={{fontWeight: 'bold', marginBottom: 2.5}}>
                        {' '}
                        Om Agus
                      </Text>
                      <View style={styles.viewMainComment}>
                        <Text>
                          Lubangnya banyak 0 jlskdjfl sdkjfl sje posdflkjsdf op
                          sdlfjsldkfj
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.viewCommentField}>
                    <TextInput
                      underlineColorAndroid="orange"
                      style={{flex: 1, marginRight: 20}}
                      placeholder="Berikan Tanggapan.."
                      onChangeText={(input) =>
                        this.setState({isi_komentar: input})
                      }
                    />
                    <TouchableOpacity>
                      <Image
                        source={require('../../assets/send-button.png')}
                        style={{width: 30, height: 30}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
        {this.state.report ? (
          <TouchableNativeFeedback>
            <View style={styles.buttonLaporan}>
              <Image
                source={require('../../assets/report-symbol.png')}
                style={styles.imgReport}
              />
              <Text style={styles.textReport}>Kirim Laporan</Text>
              <Image
                source={require('../../assets/report-symbol.png')}
                style={styles.imgReport}
              />
            </View>
          </TouchableNativeFeedback>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

export const modal = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000075',
  },
  viewContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    maxWidth: 720,
  },
});

const styles = StyleSheet.create({
  viewContainer: {
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
    maxWidth: 720,
    alignSelf: 'center',
  },
  imgPP: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  imgPost: {
    width: '100%',
    height: '88%',
  },
  viewPostHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewCategory: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'orange',
    alignSelf: 'flex-start',
  },
  imgIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  viewComment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingTop: 5,
    justifyContent: 'space-between',
  },
  viewCommentField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgComment: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 10,
  },
  viewCommentUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewMainComment: {
    backgroundColor: '#00000033',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  buttonLaporan: {
    backgroundColor: '#e69500',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  imgReport: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
  textReport: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0.5,
      height: 0.5,
    },
  },
});

export const header = StyleSheet.create({
  header: {
    backgroundColor: 'orange',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  imgHeader: {
    width: 25,
    height: 25,
    tintColor: 'white',
    marginRight: 35,
  },
  textHeader: {
    color: 'white',
    fontSize: 17,
    includeFontPadding: false,
  },
});
