// Library imports
import * as React from 'react';
import { TouchableOpacity, View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

// My styles
import { styles } from '../styles/style.js';

// My actions
import { toggleLoginSignup, toggleLogin } from '../constants/actions.js';

// My Components
import Container from './Container.js';
import LoginSignupModal from './LoginSignupModal.js';
import SignupModal from './SignupModal.js';
import LoginModal from './LoginModal.js';
import SettingModal from './SettingModal.js';
import FolderItem from './FolderItem.js';
import MessageModal from './MessageModal.js';
import AddContactModal from './AddContactModal.js';

// My Constants
import { fileInfo } from '../constants/test_constants/test-file-info.js'


function FullScreenView(props) {
  return (
    <View style={[props.style]}>
      <View style={[styles.absolutePosition, styles.fullWidth, styles.fullHeight, styles.noColor]}>
        <View style={[styles.container1]}>
        <FlatList
          data={fileInfo}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <FolderItem key={item.key} item={item} />}
          numColumns={4} 
          horizontal={false}
          style={[styles.container1]} 

        />
        </View>
      </View>
      <Container pointerEvents="box-none"
        style={[styles.container1]} >
        <Container style={[styles.container1]}>
          {props.addContactModalIsActive && <AddContactModal style={[styles.container1]} />}
        </Container>
        <Container style={[styles.container1]}>
        </Container>
        <Container style={[styles.container1]} >
        </Container>
        <Container style={[styles.container1]}>
          {!props.isLoggedIn && props.loginSignupModalIsActive && <LoginSignupModal style={[styles.container1, styles.relativePosition]} />}
          {!props.isLoggedIn && props.loginModalIsActive && <LoginModal style={[styles.container1]} />}
          {!props.isLoggedIn && props.signupModalIsActive && <SignupModal style={[styles.container1]} />}
          {props.isLoggedIn && props.settingModalIsActive && <SettingModal style={[styles.container1]} />}
        </Container>
      </Container>
      <Container  pointerEvents="box-none" 
        style={[styles.container1]}>
        <Container style={[styles.container1]}>
          {props.messageModalIsActive &&
            <MessageModal contact={''} style={[styles.container1]} />}
        </Container>
        <Container style={[styles.container1]}>
        </Container>
        <Container style={[styles.container1]} >
        </Container>
        <Container style={[styles.container1]}>
        </Container>
      </Container>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    loginSignupModalIsActive: state.modalReducer.loginSignupModalIsActive,
    signupModalIsActive: state.modalReducer.signupModalIsActive,
    loginModalIsActive: state.modalReducer.loginModalIsActive,
    messageModalIsActive: state.modalReducer.messageModalIsActive,
    isLoggedIn: state.modalReducer.isLoggedIn,
    settingModalIsActive: state.modalReducer.settingModalIsActive,
    addContactModalIsActive: state.modalReducer.addContactModalIsActive,
  };
}

export default connect(mapStateToProps)(FullScreenView);
