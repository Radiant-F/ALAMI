import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

export default class Drawer extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      // token: this.getToken()
    };
  }

  getToken() {
    AsyncStorage.getItem('token')
      .then((value) => {
        this.setState({token: value});
        this.getUser();
      })
      .catch((err) => console.log(err));
  }

  getUser() {
    console.log('memuat user..');
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
          console.log('user dimuat');
        } else {
          console.log('user gagal dimuat');
        }
      })
      .catch((err) => this.fatal(err));
  }

  fatal(err) {
    console.log(err);
    Alert.alert(
      'Terjadi Kesalahan',
      'Koneksi tidak stabil. Harap periksa koneksi Anda.',
      [{text: 'Ulangi', onPress: () => this.getToken()}, {text: 'Ok'}],
      {cancelable: false},
    );
  }

  logout() {
    Alert.alert('Keluar?', 'Sesi Anda akan berakhir', [
      {
        text: 'Keluar',
        onPress: () => {
          AsyncStorage.removeItem('token');
          this.props.navigation.replace('Login');
        },
      },
      {text: 'Batal'},
    ]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground source={require('../assets/bg.jpg')} style={styles.bg}>
          <View style={styles.viewImgPP}>
            <Image
              source={require('../assets/derp.jpg')}
              style={styles.imgPP}
            />
          </View>
        </ImageBackground>
        <View style={{margin: 20}}></View>
        <Text style={{padding: 10}}>Eka Gustiwana</Text>
        <TouchableNativeFeedback>
          <View style={styles.viewButton}>
            <Image
              source={require('../assets/settings-cogwheel-button.png')}
              style={styles.imgIcon}
            />
            <Text>Pengaturan</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => this.logout()}>
          <View style={styles.viewButton}>
            <Image
              source={require('../assets/change-power-options.png')}
              style={styles.imgIcon}
            />
            <Text>Keluar</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgPP: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderColor: 'white',
    borderWidth: 5,
  },
  viewImgPP: {
    flex: 1,
    margin: 10,
    bottom: -100,
  },
  bg: {
    height: 150,
  },
  imgIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  viewButton: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
