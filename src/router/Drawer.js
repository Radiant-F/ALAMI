import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screen/user/Dashboard';
import Content from '../components/Drawer';

const Slide = createDrawerNavigator();
const Drawer = () => {
  return (
    <Slide.Navigator drawerContent={(props) => <Content {...props} />}>
      <Slide.Screen name="Splash" component={Dashboard} />
    </Slide.Navigator>
  );
};

export default Drawer;
