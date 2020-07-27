import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { toggleSignup, setLoginState, authorizeSocket } from '../actions/actions.js';

import Container from './Container.js';
import Modal from './Modal.js';
import HeaderButton from './HeaderButton.js';

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
          props.dispatch(setLoginState(response.data.email, response.data.authToken));
          props.dispatch(authorizeSocket())

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
    <Container className={props.className}>
      <Modal onClickedOutside={() => props.dispatch(toggleSignup())}
      isModalityEnabled={true}
      default={props.signupModalIsActive}
      className={'container1 base3 flexColumn'}>
        <Container>
          <input onChange={event => {
                    let value = event.target.value;
                    setSignupInfo(prevState => {
                      return {...prevState, email: value}
                    })}}
            value={signupInfo.email}
            className={'fullHeight'}
            placeholder='Email'
          />
        </Container>
        <Container>
          <input onChange={event => {
                    let value = event.target.value;
                    setSignupInfo(prevState => { 
                      return {...prevState, password1: value}
                    })}}
            value={signupInfo.password1}
            className={'fullHeight'}
            placeholder='Password'
          />
        </Container>
        <Container>
          <input onChange={event => {
                    let value = event.target.value;
                    setSignupInfo(prevState => { 
                      return {...prevState, password2: value}
                    })}}
            value={signupInfo.password2}
            className={'fullHeight'}
            placeholder='Confirm Password'
          />
        </Container>

        <Container>
          <HeaderButton onPress={sendSignupRequest}
            title={"Signup"} >
          </HeaderButton>
        </Container>
      </Modal>
    </Container>
  );
}


function mapStateToProps(state) {
  return {
    signupModalIsActive: state.modalReducer.signupModalIsActive,
  };
}

export default connect(mapStateToProps)(SignupModal);



