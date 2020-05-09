import * as React from 'react';
import { Button, View } from 'react-native';
import { styles } from '../styles/style.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContactsDrawer from '../screens/ContactsDrawer.js'
import { createStackNavigator } from '@react-navigation/stack';
// import BottomTabNavigator from './BottomTabNavigator';
import { CommonActions } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


export default function DrawerNavigator({ navigation }) {

const screenOptions = { 
  // headerShown: false,
      // drawerWidth: 90

} 



console.log('RENDERED');
  return (
    <Drawer.Navigator 
    >

      <Drawer.Screen
      name="ContactsDrawer"
      component={ContactsDrawer}
      style={[styles.halfHeight]}
      />
      <Drawer.Screen
      name="fdsa"
      component={ContactsDrawer}
      style={[styles.halfHeight]}
      />


     </Drawer.Navigator> 
  );
}