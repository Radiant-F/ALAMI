import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {header} from './Dashboard';

export default class KirimLaporan extends Component {
  constructor() {
    super();
    this.state = {
      //   token: this.getToken(),
      photo: null,
      pesan: '',
    };
  }

  getToken() {
    AsyncStorage.getItem('token')
      .then((value) => {
        this.setState({token: value});
      })
      .catch((err) => console.log(err));
  }

  createFormData = (photo, body) => {
    const data = new FormData();
    data.append('avatar', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        this.setState({photo: response});
        console.log(JSON.stringify(response.fileName));
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={header.header}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../assets/back-arrow.png')}
              style={header.imgHeader}
            />
          </TouchableWithoutFeedback>
          <Text style={header.textHeader}> Kirim Laporan </Text>
        </View>
        <View style={{padding: 10}}>
          {this.state.photo == null ? (
            <TouchableNativeFeedback onPress={() => this.handleChoosePhoto()}>
              <View
                style={{width: '100%', height: 200, backgroundColor: 'grey'}}>
                <Text>+</Text>
              </View>
            </TouchableNativeFeedback>
          ) : (
            <TouchableNativeFeedback onPress={() => this.handleChoosePhoto()}>
              <Image
                source={{uri: this.state.photo.uri}}
                style={{width: 200, height: 200}}
              />
            </TouchableNativeFeedback>
          )}
        </View>
      </View>
    );
  }
}
