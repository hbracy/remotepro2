import * as React from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { toggleLoginSignup, toggleLogin, toggleSignup, toggleIsLoggedIn, toggleSettingsModal, connectToSocket } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';
import Modal from '../modals/Modal.js';
import HeaderButton from '../components/HeaderButton.js';


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
          props.dispatch(toggleIsLoggedIn());
          props.dispatch(toggleSettingsModal());
          props.dispatch(connectToSocket())

         } else {
          alert(loginInfo.email + ' failed to login');
        }
      }).catch(err => console.error(err));

  }

  return (
    <View style={[props.style]}>
      <View style={[styles.container1]}>
       <Modal onClickedOutside={() => props.dispatch(toggleLogin())}
              isModalityEnabled={true}
              default={props.loginModalIsActive}
              style={[styles.container1, styles.base3]}>
        <Container style={[styles.container1, styles.allAroundMargin]}>
          <TextInput onChangeText={text => setLoginInfo(prevState => {
                      return {...prevState, email: text}
                    })}
            style={[styles.fullHeight]}
            placeholder="Email"
          />
        </Container>
        <Container style={[styles.container1, styles.allAroundMargin]}>
          <TextInput onChangeText={text => setLoginInfo(prevState => { 
                      return {...prevState, password: text}
                    })}
            style={[styles.fullHeight]}
            placeholder="Password"
          />
        </Container>
        <Container style={[styles.container1]}>
          <HeaderButton onPress={sendLoginInfo}
            title={"Login"} 
            style={[styles.container1]}>
          </HeaderButton>
        </Container>
        </Modal>
      </View>
    </View>
  
  );
}

function mapStateToProps(state) {
  return {
    loginModalIsActive: state.modalReducer.loginModalIsActive,
  };
}

export default connect(mapStateToProps)(LoginModal);





