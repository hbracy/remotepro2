import * as React from 'react';
import onClickOutside from "react-onclickoutside";
import { Image, Platform, homestylesheet, Text, TouchableOpacity, View, Button } from 'react-native';

import { styles } from '../styles/style.js'


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside = evt => {
    // this.props.navigation.navigate('Home', {isClearingScreen: true})
    // if (notSmallScreen)
    if (this.props.isModalityEnabled) {
      this.setState({isActive: false})

      this.props.onClickedOutside(false);

    }
  };

  render() {
    // console.log('PASSED IN DEFAULT ' + this.props.default)

    if(!this.state.isActive) {
      // console.log("HEY")
      return(<View></View>)
    } else {
      return(
        <View style={[styles.container1], this.props.style}>
          {this.props.children}
        </View>
      )
    }
  }

}

export default onClickOutside(Modal);




