import { createStackNavigator } from '@react-navigation/stack';

import * as React from 'react';
import { Button, View, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginSignupModal from '../screens/LoginSignupModal.js'
import ContactsDrawer from '../screens/ContactsDrawer.js'
import DrawerNavigator from '../navigation/DrawerNavigator.js'
import HomeNavigator from './HomeNavigator'
import MainHeader from './MainHeader'

import { styles } from '../styles/style.js'



// const ROUTE_NAMES = {
//   home: {
//     title: "Home"
//   },
//   settings: {
//     title: "Settings"
//   }
// }



export default function HeaderNavigator({ headerRoute }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  const [loginData, setLoginData] = React.useState({isLoggedIn: true});

  // const screenOptions = { 
  //   header: () => (
  //     <MainHeader navigation={navigation} onDrawerToggle={(toggle) => navigation.navigate('Home', { drawerIsActive: toggle })} /> 
  //   ),
  //   cardStyle: { 
  //     backgroundColor: 'transparent',
  //     opacity: 1.00 
  //   },
  //   cardOverlayEnabled: true,    
  //   cardStyleInterpolator: ({ current: { progress } }) => ({
  //     cardStyle: {
  //       opacity: progress.interpolate({
  //         inputRange: [0, 0.5, 0.9, 1],
  //         outputRange: [0, 0.25, 0.7, 1],
  //       }),
  //     },
  //     overlayStyle: {
  //       opacity: progress.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: [0, 0.0],
  //         extrapolate: 'clamp',
  //       }),
  //     },
  //   }),
  // }

  switch(headerRoute) {
    case 'home':
      return (
        <HomeScreen loginData={loginData} 
          style={[styles.container1]} 
        />
      );
    default:
      return (
        <HomeScreen loginData={loginData} 
          style={[styles.flex1,styles.fullHeight, styles.fullWidth]} 
        />
      );
  } 


  // return (
  //   <Stack.Navigator
  //     mode="modal"
  //     screenOptions={screenOptions}
  //     >

  //     <Stack.Screen
  //       name="Home"
  //       component={HomeScreen}
  //       route={route}
  //       initialParams={{
  //         drawerIsActive: true, 
  //         loginModalIsActive: false, 
  //         isClearingScreen: false}}
  //     />

  //   </Stack.Navigator>
  // );


}






