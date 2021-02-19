import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

export default class Intro extends Component {
  constructor() {
    super();
    this.state = {
      first: 'no longer.',
    };
  }

  done() {
    AsyncStorage.setItem('first', this.state.first).catch((err) =>
      console.log(err),
    );
    this.props.navigation.replace('Login');
  }

  render() {
    return (
      <Onboarding
        onSkip={() => this.done()}
        onDone={() => this.done()}
        nextLabel="Lanjut"
        skipLabel="Lewati"
        pages={[
          {
            backgroundColor: '#f07800',
            image: (
              <LottieView
                autoPlay
                loop
                source={require('../assets/30897-social-media-marketingshoping-cart-in-mobile-app.json')}
                style={{width: 200}}
              />
            ),
            title: 'Mudah!',
            subtitle: 'Tampilan yang disederhanakan lebih lanjut.',
          },
          {
            backgroundColor: 'yellow',
            image: (
              <LottieView
                autoPlay
                loop
                source={require('../assets/43358-social.json')}
                style={{width: 200}}
              />
            ),
            title: 'Terpercaya!',
            subtitle: 'Manajemen laporan Anda lebih rapih dan teratur.',
          },
          {
            backgroundColor: 'grey',
            image: (
              <LottieView
                autoPlay
                loop
                source={require('../assets/30901-social-media-marketing-announcement.json')}
                style={{width: 200}}
              />
            ),
            title: 'Aman!',
            subtitle: 'Privasi dengan pemeliharaan sistem yang mendalam.',
          },
        ]}
      />
    );
  }
}
