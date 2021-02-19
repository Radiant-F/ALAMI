import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Navigator from './src/router/Navigator.js';
import Intro from './src/components/Intro';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
