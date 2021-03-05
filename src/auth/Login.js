import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import {
  Text,
  View,
  Alert,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      token: '',
      secure: true,
      loading: false,
      remember: false,
    };
  }

  login1() {
    if (this.state.email && this.state.password != '') {
      this.setState({loading: true});
      console.log('mencoba login..');
      const {email, password} = this.state;
      let kirimData = {email: email, password: password};
      fetch('https://mini-project-e.herokuapp.com/api/login', {
        method: 'POST',
        body: JSON.stringify(kirimData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.token != null) {
            this.props.changeUser({token: responseJSON.token});
            this.state.remember
              ? AsyncStorage.setItem('token', responseJSON.token)
              : console.log('data tidak diingat');
            this.props.navigation.replace('Dashboard');
          } else {
            this.setState({loading: false});
            this.failed();
          }
        })
        .catch((err) => console.log('Terjadi Kesalahan. ', err));
    } else {
      ToastAndroid.show('Harap isi yang benar', ToastAndroid.SHORT);
    }
  }

  login() {
    this.props.navigation.replace('Dashboard', {screen: 'Dashboard'});
  }

  failed() {
    Alert.alert(
      'Data tidak ditemukan',
      'Masukan data dengan benar atau daftar.',
      [
        {
          text: 'Daftar',
          onPress: () => this.props.navigation.navigate('Register'),
        },
        {
          text: 'Ok',
        },
      ],
      {cancelable: false},
    );
  }

  warning() {
    Alert.alert(
      '',
      'Harap isi semua forum.',
      [
        {
          text: 'Ok',
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          blurRadius={1}
          style={styles.bg}
          source={require('../assets/bg.jpg')}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <ScrollView>
                <View style={styles.mainSubView}>
                  <Text style={styles.text}>Login</Text>
                  <View style={{width: '95%'}}>
                    <Text> Email</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../assets/gmail-logo.png')}
                        style={styles.imgIcon}
                      />
                      <TextInput
                        style={{flex: 1}}
                        underlineColorAndroid="orange"
                        placeholder="surelanda@gmail.com"
                        onChangeText={(input) => this.setState({email: input})}
                      />
                    </View>
                    <View style={{margin: 5}}></View>
                    <Text> Kata Sandi</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../assets/locked-padlock-outline.png')}
                        style={styles.imgIcon}
                      />
                      <TextInput
                        style={{flex: 1}}
                        underlineColorAndroid="orange"
                        secureTextEntry={this.state.secure}
                        placeholder="Masukan Kata Sandi"
                        onChangeText={(input) =>
                          this.setState({password: input})
                        }
                      />
                      {this.state.secure ? (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({secure: !this.state.secure})
                          }>
                          <Image
                            source={require('../assets/locked-padlock.png')}
                            style={styles.imgIcon}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({secure: !this.state.secure})
                          }>
                          <Image
                            source={require('../assets/unlocked-padlock.png')}
                            style={styles.imgIcon}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View style={styles.viewSplitter}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <CheckBox
                        onValueChange={() =>
                          this.setState({remember: !this.state.remember})
                        }
                        value={this.state.remember}
                        tintColors={{true: 'orange', false: 'black'}}
                      />
                      <Text>Ingat Saya</Text>
                    </View>
                    <TouchableNativeFeedback
                      onPress={() =>
                        this.props.navigation.navigate('Register')
                      }>
                      <View>
                        <Text style={{fontWeight: 'bold'}}>Daftar</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                  {this.state.loading ? (
                    <View style={styles.button}>
                      <ActivityIndicator color="white" size="small" />
                    </View>
                  ) : (
                    <TouchableNativeFeedback onPress={() => this.login()}>
                      <View style={styles.button}>
                        <Text style={styles.textButton}>Masuk</Text>
                      </View>
                    </TouchableNativeFeedback>
                  )}
                  <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <View style={{marginTop: 10}}>
                      <Text style={{color: 'grey'}}>Lupa Password</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  imgIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  bg: {
    height: '100%',
    flex: 1,
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  subView: {
    backgroundColor: 'orange',
    elevation: 3,
    // borderRadius: 10,
    paddingBottom: 2.5,
    paddingTop: 7.5,
    width: '95%',
  },
  mainSubView: {
    backgroundColor: 'white',
    // borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  text: {
    includeFontPadding: false,
    fontSize: 30,
    // color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'orange',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  button: {
    backgroundColor: 'lime',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    width: 90,
    height: 45,
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0.5,
      height: 0.5,
    },
  },
  viewSplitter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '95%',
  },
});

const MapStateToProps = (state) => {
  return {
    user: state,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    changeUser: (input) => dispatch({type: 'CHANGE USER', payload: input}),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Login);
