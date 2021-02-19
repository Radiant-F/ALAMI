import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../components/Splash';
import Drawer from './Drawer';
import Login from '../auth/Login';
import Intro from '../components/Intro';
import Register from '../auth/Register';

const Stack = createStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Drawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
