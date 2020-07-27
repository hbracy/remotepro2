import * as React from 'react';
import { connect } from 'react-redux';

import HeaderButton from './HeaderButton.js';
import Container from './Container.js';

import { toggleLoginSignup, toggleSidebar, toggleSettingsModal } from '../actions/actions.js';

function Header(props) {

  return (
    <Container className={''}>
      <HeaderButton title="Contacts"
        //Turn off everything if isSmallWindow
        onPress={() => props.dispatch(toggleSidebar())}
      />
      <HeaderButton title="RemotePro"/>  
      <HeaderButton title="Profile" 
        //Turn off everything if isSmallWindow
        onPress={() => {
          if (props.loginToken) {
            props.dispatch(toggleSettingsModal());
          } else {
            props.dispatch(toggleLoginSignup())
          }
        }}
      />
    </Container>
  );
}

// Add this function:
function mapStateToProps(state) {
  return {
    loginToken: state.socketReducer.loginToken,
  };
}

// Then replace this:
// export default Counter;

// With this:
export default connect(mapStateToProps)(Header);
