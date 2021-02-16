import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

export default class Splash extends Component {
  render() {
    return (
      <View>
        <Button
          title="Navigasi"
          onPress={() =>
            this.props.navigation.navigate('Dashboard', {screen: 'Dashboard'})
          }
        />
        <Text> Splash </Text>
      </View>
    );
  }
}
