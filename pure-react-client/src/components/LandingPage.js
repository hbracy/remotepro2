import * as React from 'react';
import { connect } from 'react-redux';

import '../index.css';

import HomeScreen from './HomeScreen';
import NotLoggedInLandingPage from './NotLoggedInLandingPage.js'
import Container from './Container.js'

import { test, connectToSocket} from '../actions/actions.js';
connectToSocket();

function LandingPage(props) {

  // For testing url-react syncing
  // React.useEffect(() => {
  //   props.dispatch(test());
  //   console.log(props.currentWorkItem);
  // }, []);


  React.useEffect(() => {
    console.log('LOGIN TOKEN', props.loginToken);
  }, [props.loginToken]);


  if (props.loginToken) {
    return (
      <HomeScreen />
    );
  } else {
    return (
      <NotLoggedInLandingPage />
    );
  }
}

function mapStateToProps(state) {
  return {
    loginToken: state.socketReducer.loginToken,
    currentWorkItem: state.socketReducer.currentWorkItem,
    loginModalIsActive: state.modalReducer.loginModalIsActive,

  };
}

export default connect(mapStateToProps)(LandingPage);






