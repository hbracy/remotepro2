import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Notifications from 'react-notification-system-redux';


import { toggleSettingSuggestion, addMemberToGroup } from '../actions/actions.js';

import Container from './Container.js';
import Modal from './Modal.js';
import HeaderButton from './HeaderButton.js';


function SettingSuggestionModal(props) {
const notificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Hey, it\'s good to see you!',
  message: 'Now you can see how easy it is to use notifications in React!',
  position: 'tc',
  autoDismiss: 2,
  // action: {
  //   label: 'Click me!!',
  //   callback: () => alert('clicked!')
  // }
};
  return (
    <Container className={props.className}>
      <Modal onClickedOutside={() => props.dispatch(toggleSettingSuggestion())}
            isModalityEnabled={true}
            default={props.loginModalIsActive}
            className={'container1 base3 flexColumn'}>
        <Container className={'scroll flexColumn'}>
          {
            props.listData.map(suggestion => 
              <HeaderButton onPress={() => {
                  props.dispatch(addMemberToGroup(suggestion._id, suggestion.email, props.listData.orgId));
                  props.dispatch(Notifications.success(notificationOpts));
                }}
                title={suggestion.email.toString()}
                key={suggestion._id}
                >
              </HeaderButton>
            )
          }
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

export default connect(mapStateToProps)(SettingSuggestionModal);





