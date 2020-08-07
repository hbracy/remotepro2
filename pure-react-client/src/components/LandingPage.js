import * as React from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

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
    props.dispatch(connectToSocket());
  }, []);

  React.useEffect(() => {
    console.log('LOGIN TOKEN', props.loginToken);
  }, [props.loginToken]);


  if (props.loginToken) {
    return (
      <Container>
        <HomeScreen />
        <Notifications
          notifications={props.notifications}
          // style={style}
        />

      </Container>
    )
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
    notifications: state.notifications,

  };
}

export default connect(mapStateToProps)(LandingPage);






