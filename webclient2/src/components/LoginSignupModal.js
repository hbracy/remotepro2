import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles/style.js'

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../constants/actions.js';

import Modal from '../modals/Modal.js';
import Container from './Container.js'
import HeaderButton from '../components/HeaderButton.js';



function LoginSignupModal(props) {

  return (
  <View style={[props.style]}>
      <View style={[styles.container1]}>
       <Modal onClickedOutside={() => props.dispatch(toggleLoginSignup())}
        isModalityEnabled={true}
        default={props.loginSignupModalIsActive}
        style={[styles.container1, styles.base3]}>
        <Container style={[styles.container1, styles.noColor]}>
          <HeaderButton onPress={() => {
                props.dispatch(toggleLoginSignup());
                props.dispatch(toggleLogin());
              }
            }
            title={"Settings"} 
            style={[styles.container1, styles.allAroundMargin]}>
          </HeaderButton>
        </Container>
        <Container style={[styles.container1, styles.noColor]}>
          <HeaderButton onPress={() => {
                props.dispatch(toggleLoginSignup());
                props.dispatch(toggleSignup());
              }
            }
            title={"Signup"} 
            style={[styles.container1, styles.allAroundMargin]}>
          </HeaderButton>
        </Container>
        <Container style={[styles.container1, styles.noColor]}>
          <HeaderButton onPress={() => {
                props.dispatch(toggleLoginSignup());
                props.dispatch(toggleLogin());
            }}
            title={"Login"} 
            style={[styles.container1, styles.allAroundMargin]}>
          </HeaderButton>
        </Container>
        </Modal>
      </View>
    </View>
  
  );
}



function mapStateToProps(state) {
  return {
    loginSignupModalIsActive: state.modalReducer.loginSignupModalIsActive,
    loginModalIsActive: state.modalReducer.loginModalIsActive,
    signupModalIsActive: state.modalReducer.signupModalIsActive,
  };
}

export default connect(mapStateToProps)(LoginSignupModal);



