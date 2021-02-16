import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Navigator from './src/router/Navigator.js';

export default class App extends Component {
  render() {
    return <Navigator />;
  }
}
