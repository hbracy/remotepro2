import { createStackNavigator } from '@react-navigation/stack';

import * as React from 'react';
import { Button, View, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';


import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginSignupModal from '../screens/LoginSignupModal.js'
import ContactsDrawer from '../screens/ContactsDrawer.js'
import DrawerNavigator from '../navigation/DrawerNavigator.js'
import HomeNavigator from './HomeNavigator'
import MainHeader from './MainHeader'
import LandingPage from '../components/LandingPage.js'

import { styles } from '../styles/style.js'



// const ROUTE_NAMES = {
//   home: {
//     title: "Home"
//   },
//   settings: {
//     title: "Settings"
//   }
// }



function HeaderNavigator({ headerRoute, isLoggedIn }, props) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  if (true) {
    switch(headerRoute) {
      case 'home':
        return (
          <HomeScreen
            style={[styles.container1]} 
          />
        );
      default:
        return (
          <HomeScreen 
            style={[styles.flex1,styles.fullHeight, styles.fullWidth]} 
          />
        );
    }
  } else {

    return (
      <LandingPage />
    );

  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.modalReducer.isLoggedIn
  };
}

export default connect(mapStateToProps)(HeaderNavigator);






