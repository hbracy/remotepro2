import * as React from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { toggleSignup, toggleIsLoggedIn, connectToSocket } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';
import Modal from '../modals/Modal.js';
import HeaderButton from '../components/HeaderButton.js';



function SignupModal(props) {
  const [signupInfo, setSignupInfo] = React.useState({email: '', password1: '', password2: ''});

  function sendSignupRequest() {
    if (signupInfo.password1 == signupInfo.password2) {
      // console.log("UEAH")
      axios.post('http://localhost:3000/authenticate/signup', {
        email: signupInfo.email,
        password: signupInfo.password1
      }).then(response => {
        console.log('SIGNUP RESPONSE', response.data);
        if (response.data.email) {
          alert('Welcome to RemotePro, ' + response.data.email);
          localStorage.setItem('jwtToken', response.data.authToken);
          // dispatch a user success; s
          props.dispatch(toggleIsLoggedIn());
          props.dispatch(connectToSocket())

        } else {
          alert(response.data.email + ' is already a username, please use a different one');
        }
      }).catch(err => console.error(err));
    } else {
      // console.log("NOOOOOOO PASSWORDS DONT MATCH");
      alert('Passwords dont match');
    }
  }

  return (
    <View style={[props.style]}>
      <View style={[styles.container1]}>
       <Modal onClickedOutside={() => props.dispatch(toggleSignup())}
              isModalityEnabled={true}
              default={props.signupModalIsActive}
              style={[styles.container1, styles.base3]}>
        <Container style={[styles.container1, styles.allAroundMargin]}>
          <TextInput
            style={[styles.fullHeight]}
            placeholder="Email"
            onChangeText={text => setSignupInfo(prevState => { 
              return {...prevState, email: text}}
            )}
          />
        </Container>
        <Container style={[styles.container1, styles.allAroundMargin]}>
          <TextInput
            style={[styles.fullHeight]}
            placeholder="Password"
            onChangeText={text => setSignupInfo(prevState => { 
              return {...prevState, password1: text}}
            )}
          />
        </Container>
        <Container style={[styles.container1, styles.allAroundMargin]}>
          <TextInput
            style={[styles.fullHeight]}
            placeholder="Confirm Password"
            onChangeText={text => setSignupInfo(prevState => { 
              return {...prevState, password2: text}}
            )}
          />
        </Container>
        <Container style={[styles.container1]}>
          <HeaderButton onPress={sendSignupRequest}
            title={"Signup"} 
            style={[styles.container1, styles.base1]}>
          </HeaderButton>
        </Container>
        </Modal>
      </View>
    </View>
    
  );
}


function mapStateToProps(state) {
  return {
    signupModalIsActive: state.modalReducer.signupModalIsActive,
  };
}

export default connect(mapStateToProps)(SignupModal);



