import * as React from 'react';
import { connect } from 'react-redux';

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../actions/actions.js';

import Modal from './Modal.js';
import Container from './Container.js'
import HeaderButton from './HeaderButton.js';

function LoginSignupModal(props) {
  return (
  <Container className={props.className}>
       <Modal onClickedOutside={() => props.dispatch(toggleLoginSignup())}
        isModalityEnabled={true}
        default={props.loginSignupModalIsActive}
        className={'container1 base3 flexColumn'}>
        {
        // <Container>
        //   <HeaderButton onPress={() => {
        //         props.dispatch(toggleLoginSignup());
        //         props.dispatch(toggleLogin());
        //       }
        //     }
        //     title={'Settings'} 
        //     className={'container1 allAroundMargin'}>
        //   </HeaderButton>
        // </Container>
      }
        <Container>
          <HeaderButton onPress={() => {
                props.dispatch(toggleLoginSignup());
                props.dispatch(toggleSignup());
              }
            }
            title={'Signup'} 
            className={'container1 allAroundMargin'}>
          </HeaderButton>
        </Container>
        <Container>
          <HeaderButton onPress={() => {
                console.log('PRESSING LOGIN')
                props.dispatch(toggleLoginSignup());
                props.dispatch(toggleLogin());
            }}
            title={'Login'} 
            className={'container1 allAroundMargin'}>
          </HeaderButton>
        </Container>
        </Modal>
    </Container>
  
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



