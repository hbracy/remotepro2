import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { styles } from '../styles/style.js';

import { getFiles } from '../constants/actions.js';


function FolderItem(item, props) {
  console.log('PROPS EHHHEINJEHHHEHERE', props);
  return (
    <TouchableOpacity onPress={() => props.dispatch(getFiles('remotepro/' + item.item))} style={[styles.container1, styles.centerCenter]}>
      <Text> <Entypo name="folder" size={40} color="#323232"/></Text>
      <Text>{item.item}</Text>
    </TouchableOpacity>
  );
}


function mapStateToProps(state) {
  return {
    // loginSignupModalIsActive: state.modalReducer.loginSignupModalIsActive,
    // signupModalIsActive: state.modalReducer.signupModalIsActive,
    // loginModalIsActive: state.modalReducer.loginModalIsActive,
    // messageModalIsActive: state.modalReducer.messageModalIsActive,
    // isLoggedIn: state.modalReducer.isLoggedIn,
    // settingModalIsActive: state.modalReducer.settingModalIsActive,
    // addContactModalIsActive: state.modalReducer.addContactModalIsActive,
    files: state.socketReducer.files
  };
}



export default connect(mapStateToProps)(FolderItem);
