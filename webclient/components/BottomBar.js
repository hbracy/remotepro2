import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';


function BottomBar() {
  if (loggedIn) {
    return (
      <Text style={[]}>This is a tab bar. You can edit it in:</Text>
    );
  } else {
    return(
      <View style={[[styles.relativePosition,
                    styles.bottomPlacement, 
                    styles.centered, 
                    styles.base2, 
                    styles.left, 
                    styles.right, 
                    styles.verticalPadding], styles.flex1, styles.flexRow, styles.spaceAround, styles.fullWidth]}>
        <View style={[styles.eightyPercentWidth, styles.sideMargins]}>
          <Button style={[]} title="Talk" color="#f194ff" onPress={() => console.log("UHO")} />
        </View>
      </View>
    );
  }
}



function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(Example);
