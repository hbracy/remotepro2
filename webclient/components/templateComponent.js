import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';


function Example(props) {

  return (
    <View style={[styles.container1]}>
    </View>
  );
}


function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(Example);



