import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('token')
        .then((value) => {
          if (value) {
            this.props.navigation.replace('Dashboard', {screen: 'Dashboard'});
          } else {
            AsyncStorage.getItem('first')
              .then((value) => {
                if (value) {
                  this.props.navigation.replace('Login');
                } else {
                  this.props.navigation.replace('Intro');
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }, 2000);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Text> Memuat.. </Text>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
