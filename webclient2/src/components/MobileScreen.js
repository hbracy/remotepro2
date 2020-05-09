import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';
import Sidebar from '../components/Sidebar.js';
import LoginSignupModal from './LoginSignupModal.js';
import SignupModal from './SignupModal.js';
import LoginModal from './LoginModal.js';
import MessageModal from './MessageModal.js';


function MobileScreen(props) {

  // console.log('PROPS', JSON.stringify(props))
  // console.log('IS SIDEBAR ACTIVE?', JSON.stringify(props.sidebarIsActive))

// console.log(props.loginSignupModalIsActive);
  if (props.sidebarIsActive) {
    return (
      <Sidebar style={[styles.container1]} />
    )
    //sidebar
  } else if (props.messageModalIsActive) {
    console.log('HEREE')
    return (
      <MessageModal contact={'messageModalInfo.name'} style={[styles.container1]} /> 
    );
    // messagemodla
  } else if (props.loginSignupModalIsActive) {
    // console.log
    return (
      <LoginSignupModal style={[styles.container1]} /> 
    );
    //LoginModal
  } else if (props.signupModalIsActive) {
    // signupModal
  } else {
    // console.log("CUCK YEAHC")
    return (
      <View style={[styles.container1]} > 
      </View>
    )
  }

}


function mapStateToProps(state) {
  return {
    loginSignupModalIsActive: state.modalReducer.loginSignupModalIsActive,
    signupModalIsActive: state.modalReducer.signupModalIsActive,
    loginModalIsActive: state.modalReducer.loginModalIsActive,
    messageModalIsActive: state.modalReducer.messageModalIsActive,
    sidebarIsActive: state.modalReducer.sidebarIsActive,

  };
}

export default connect(mapStateToProps)(MobileScreen);

