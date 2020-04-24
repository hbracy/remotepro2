import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles/style.js'

import { toggleLoginSignup, toggleSidebar, toggleSettingsModal } from '../constants/actions.js';

import HeaderButton from '../components/HeaderButton.js';


function Header(props) {

  return (
    <View style={[styles.container1, styles.flexRow, styles.centerCenter]}>
      <HeaderButton title="Contacts"
        //Turn off everything if isSmallWindow
        onPress={() => props.dispatch(toggleSidebar())}
        style={[styles.container1]} 
      />
      <HeaderButton title="RemotePro" style={[styles.container1]} />  
      <HeaderButton title="Profile" 
        //Turn off everything if isSmallWindow
        onPress={() => {
          console.log('FOLLOWING DISPATCH FROM HEADER');
          if (props.isLoggedIn) {
            props.dispatch(toggleSettingsModal());

          } else {
            props.dispatch(toggleLoginSignup())
          }
        }}
        // onPress={() => props.setLoginSignupActive(!props.loginSignupActive)}
        style={[styles.container1]}/>
    </View>
  );
}

// Add this function:
function mapStateToProps(state) {
  return {
    loginSignupModalIsActive: state.loginSignupModalIsActive,
    sidebarIsActive: state.sidebarIsActive,
    isLoggedIn: state.isLoggedIn,
  };
}

// Then replace this:
// export default Counter;

// With this:
export default connect(mapStateToProps)(Header);
