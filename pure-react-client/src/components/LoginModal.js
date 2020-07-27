import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { toggleLoginSignup, toggleLogin, toggleSignup, setLoginState, toggleSettingsModal, authorizeSocket } from '../actions/actions.js';

import Container from './Container.js';
import Modal from './Modal.js';
import HeaderButton from './HeaderButton.js';


function LoginModal(props) {
  const [loginInfo, setLoginInfo] = React.useState({email: '', password: ''});

  function sendLoginInfo() {
    console.log("LOGIN INFO BEING SENT: " + JSON.stringify(loginInfo));
// headers: {
//     'Authorization': 'Bearer' + authToken
//   }
      axios.post('http://localhost:3000/authenticate/login', {
        email: loginInfo.email,
        password: loginInfo.password
      }).then(response => {
        console.log('LOGIN RESPONSE', response.data);
        if (response.data.email) {
          alert(response.data.email + ' signed into RemotePro');
          localStorage.setItem('jwtToken', response.data.authToken);          
          props.dispatch(setLoginState(response.data.email, response.data.authToken));
          props.dispatch(toggleSettingsModal());
          props.dispatch(authorizeSocket())

         } else {
          alert(loginInfo.email + ' failed to login');
        }
      }).catch(err => console.error(err));

  }




  return (
    <Container className={props.className}>
      <Modal onClickedOutside={() => props.dispatch(toggleLogin())}
      isModalityEnabled={true}
      default={props.loginModalIsActive}
      className={'container1 base3 flexColumn'}>
        <Container>
          <input onChange={event => {
                    let value = event.target.value;
                    setLoginInfo(prevState => {
                      return {...prevState, email: value}
                    })}}
            value={loginInfo.email}
            className={'fullHeight'}
            placeholder="Email"
          />
        </Container>
        <Container>
          <input onChange={event => {
                    let value = event.target.value;
                    setLoginInfo(prevState => { 
                      return {...prevState, password: value}
                    })}}
            value={loginInfo.password}
            className={'fullHeight'}
            placeholder="Password"
          />
        </Container>
        <Container>
          <HeaderButton onPress={sendLoginInfo}
            title={"Login"} >
          </HeaderButton>
        </Container>
      </Modal>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    loginModalIsActive: state.modalReducer.loginModalIsActive,
  };
}

export default connect(mapStateToProps)(LoginModal);





