import * as React from 'react';
import { Button, View } from 'react-native';
import { styles } from '../styles/style.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContactsDrawer from '../screens/ContactsDrawer.js'
import { createStackNavigator } from '@react-navigation/stack';
// import BottomTabNavigator from './BottomTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginSignupModal from '../screens/LoginSignupModal.js'


const Stack = createStackNavigator();


export default function HomeNavigator ({ navigation }) {



const screenOptions = 
      { cardStyle: { 
          backgroundColor: 'transparent',
          opacity: 1.00 
        },
        cardOverlayEnabled: true,
        headerStyle: {
          backgroundColor: '#cd5c5c',
        },
        headerShown: false,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.0],
              extrapolate: 'clamp',
            }),
          },
        }),
      }


  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="LoginSignupModal"
        component={LoginSignupModal}
        style={[[styles.halfHeight, styles.flexColumn, styles.halfWidth, styles.centerCenter]]}
      />
     </Stack.Navigator> 
  );
}